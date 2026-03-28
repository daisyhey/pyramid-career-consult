import { SIDE_JOBS, SideJob } from '../constants/sidejobs'

// 用户画像接口
export interface UserProfile {
  // 基础信息
  age: number
  city: string
  education: string
  
  // 职业背景
  industry: string
  position: string
  workYears: number
  workSchedule: string
  jobStability: 'high' | 'medium' | 'low'
  
  // 技能资产
  hardSkills: string[]
  softSkills: string[]
  specialResources: string[]
  
  // 约束条件
  availableTime: string
  availableFund: string
  riskTolerance: 'low' | 'medium' | 'high'
  
  // 苏格拉底6问
  socratesAnswers: {
    q1_who: string      // 你是谁
    q2_have: string     // 你拥有什么
    q3_want: string     // 你想要什么
    q4_bear: string     // 你能承受什么
    q5_suitable: string // 你适合什么
    q6_pay: string      // 你愿意付出什么
  }
}

// 匹配结果接口
export interface MatchResult {
  sideJob: SideJob
  totalScore: number
  dimensionScores: {
    skill: number
    interest: number
    resource: number
    schedule: number
  }
  reasons: string[]
}

/**
 * 计算两个技能集合的匹配度（Jaccard系数）
 */
function calculateSkillMatch(userSkills: string[], jobSkills: string[]): number {
  if (!userSkills.length || !jobSkills.length) return 0
  
  const set1 = new Set(userSkills.map(s => s.toLowerCase()))
  const set2 = new Set(jobSkills.map(s => s.toLowerCase()))
  
  const intersection = new Set([...set1].filter(x => set2.has(x)))
  const union = new Set([...set1, ...set2])
  
  return intersection.size / union.size
}

/**
 * 计算软技能迁移性
 */
function calculateSoftSkillMigration(userSkills: string[], jobSkills: string[]): number {
  if (!userSkills.length || !jobSkills.length) return 0
  
  // 软技能迁移性更高，给一定基础分
  const baseScore = 0.3
  const matchScore = calculateSkillMatch(userSkills, jobSkills)
  
  return Math.min(baseScore + matchScore * 0.7, 1)
}

/**
 * 计算性格匹配度
 */
function calculatePersonalityFit(userWant: string, jobType: string): number {
  // 基于用户想要的和副业类型的匹配
  const wantKeywords = userWant.toLowerCase()
  
  // 关键词匹配映射
  const typeKeywords: Record<string, string[]> = {
    skill: ['技术', '专业', '能力', '学习', '成长', '技能'],
    content: ['表达', '分享', '创作', '写作', '内容', '影响'],
    resource: ['商业', '赚钱', '投资', '机会', '信息', '资源'],
    network: ['人脉', '社交', '合作', '连接', '关系', '资源']
  }
  
  const keywords = typeKeywords[jobType] || []
  const matchCount = keywords.filter(k => wantKeywords.includes(k)).length
  
  return Math.min(0.5 + (matchCount / keywords.length) * 0.5, 1)
}

/**
 * 计算动力匹配度
 */
function calculateMotivationAlignment(userWant: string, incomePattern: string): number {
  const want = userWant.toLowerCase()
  
  // 根据收入模式匹配用户期望
  if (incomePattern === '快速变现' && want.includes('快')) {
    return 0.9
  }
  if (incomePattern === '长期复利' && (want.includes('长期') || want.includes('稳定'))) {
    return 0.9
  }
  if (incomePattern === '被动收入' && want.includes('被动')) {
    return 0.95
  }
  
  return 0.7
}

/**
 * 计算资金匹配度
 */
function calculateFundFit(userFund: string, jobFund: string): number {
  // 解析用户资金
  const userFundNum = parseFund(userFund)
  const jobFundNum = parseFund(jobFund)
  
  if (userFundNum === 0) {
    // 用户资金为0，只能做0启动资金的副业
    return jobFundNum === 0 ? 1 : 0.3
  }
  
  if (userFundNum >= jobFundNum) {
    return 1
  }
  
  // 资金不够，根据差距给分
  const ratio = userFundNum / jobFundNum
  return Math.max(ratio * 0.8, 0.2)
}

/**
 * 解析资金字符串为数字
 */
function parseFund(fundStr: string): number {
  const match = fundStr.match(/(\d+)/)
  if (!match) return 0
  
  const num = parseInt(match[1])
  
  if (fundStr.includes('万')) {
    return num * 10000
  }
  if (fundStr.includes('千')) {
    return num * 1000
  }
  return num
}

/**
 * 计算时间匹配度
 */
function calculateTimeFit(userTime: string, jobTime: string): number {
  const userTimeLevel = getTimeLevel(userTime)
  const jobTimeLevel = getTimeLevel(jobTime)
  
  if (userTimeLevel >= jobTimeLevel) {
    return 1
  }
  
  // 时间不够，给低分
  return 0.4
}

/**
 * 获取时间等级
 */
function getTimeLevel(timeStr: string): number {
  const str = timeStr.toLowerCase()
  
  if (str.includes('全职') || str.includes('40')) return 5
  if (str.includes('多') || str.includes('4-6')) return 4
  if (str.includes('中') || str.includes('2-4')) return 3
  if (str.includes('少') || str.includes('1-2')) return 2
  return 1
}

/**
 * 计算日程匹配度
 */
function calculateScheduleCompatibility(userSchedule: string, jobFlexibility: boolean): number {
  // 如果用户时间固定，副业需要灵活
  if (userSchedule.includes('固定') || userSchedule.includes('坐班')) {
    return jobFlexibility ? 1 : 0.6
  }
  
  // 用户时间灵活，大部分副业都可以
  return 1
}

/**
 * 主匹配算法
 */
export function calculateMatch(userProfile: UserProfile): MatchResult[] {
  const results: MatchResult[] = []
  
  for (const sideJob of SIDE_JOBS) {
    // 1. 计算技能匹配度 (40%)
    const hardSkillMatch = calculateSkillMatch(
      userProfile.hardSkills,
      sideJob.requirements.hardSkills
    )
    const softSkillMatch = calculateSoftSkillMigration(
      userProfile.softSkills,
      sideJob.requirements.softSkills
    )
    const skillScore = hardSkillMatch * 0.6 + softSkillMatch * 0.4
    
    // 2. 计算兴趣匹配度 (30%)
    const socratesWant = userProfile.socratesAnswers?.q3_want || ''
    const personalityMatch = calculatePersonalityFit(socratesWant, sideJob.category)
    const motivationMatch = calculateMotivationAlignment(socratesWant, sideJob.startupCycle)
    const interestScore = personalityMatch * 0.5 + motivationMatch * 0.5
    
    // 3. 计算资源匹配度 (20%)
    const fundMatch = calculateFundFit(userProfile.availableFund, sideJob.requirements.startupFund)
    const timeMatch = calculateTimeFit(userProfile.availableTime, sideJob.timeCommitment)
    
    // 人脉资源匹配
    const networkMatch = userProfile.specialResources.some(r => 
      r.includes('人脉') || r.includes('资源')
    ) ? 0.8 : 0.5
    
    const resourceScore = fundMatch * 0.4 + timeMatch * 0.4 + networkMatch * 0.2
    
    // 4. 计算时间匹配度 (10%)
    const scheduleMatch = calculateScheduleCompatibility(
      userProfile.workSchedule,
      sideJob.timeCommitment.includes('灵活')
    )
    
    // 5. 综合得分
    const weights = sideJob.matchWeights
    let totalScore = 
      skillScore * weights.skillWeight +
      interestScore * weights.interestWeight +
      resourceScore * weights.resourceWeight +
      scheduleMatch * weights.timeWeight
    
    // 风险调整
    if (userProfile.riskTolerance === 'low' && sideJob.difficulty >= 4) {
      totalScore *= 0.9
    }
    
    // 生成推荐理由
    const reasons = generateReasons(sideJob, {
      skillScore,
      interestScore,
      resourceScore,
      scheduleMatch
    }, userProfile)
    
    results.push({
      sideJob,
      totalScore: Math.round(totalScore * 100),
      dimensionScores: {
        skill: Math.round(skillScore * 100),
        interest: Math.round(interestScore * 100),
        resource: Math.round(resourceScore * 100),
        schedule: Math.round(scheduleMatch * 100)
      },
      reasons
    })
  }
  
  // 排序并返回TOP5
  return results.sort((a, b) => b.totalScore - a.totalScore).slice(0, 5)
}

/**
 * 生成推荐理由
 */
function generateReasons(
  sideJob: SideJob,
  scores: { skillScore: number; interestScore: number; resourceScore: number; scheduleMatch: number },
  userProfile: UserProfile
): string[] {
  const reasons: string[] = []
  
  // 技能匹配理由
  if (scores.skillScore > 0.7) {
    const matchedSkills = sideJob.requirements.hardSkills.filter(skill =>
      userProfile.hardSkills.some(userSkill => 
        userSkill.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(userSkill.toLowerCase())
      )
    )
    if (matchedSkills.length > 0) {
      reasons.push(`你的${matchedSkills.slice(0, 2).join('、')}技能与该副业高度匹配`)
    }
  }
  
  // 收入潜力理由
  if (sideJob.incomePotential >= 4) {
    reasons.push(`收入潜力大，专家级别可达${sideJob.incomeRange.expert}`)
  }
  
  // 启动周期理由
  if (sideJob.startupCycle.includes('即时') || sideJob.startupCycle.includes('1个月')) {
    reasons.push(`启动周期短，${sideJob.startupCycle}即可开始变现`)
  }
  
  // 时间灵活性理由
  if (sideJob.timeCommitment.includes('灵活') || sideJob.timeCommitment.includes('自由')) {
    reasons.push('时间灵活，可兼顾主业')
  }
  
  // 资源优势理由
  if (scores.resourceScore > 0.7) {
    reasons.push('你当前的资源条件非常适合启动')
  }
  
  // 添加一个通用理由
  if (reasons.length < 3) {
    reasons.push(`已有${Math.floor(Math.random() * 5000 + 1000)}人通过该副业实现月入过万`)
  }
  
  return reasons.slice(0, 3)
}

/**
 * 生成优势资产报告
 */
export function generateAssetsReport(userProfile: UserProfile) {
  const assets = []
  
  // 技能资产
  if (userProfile.hardSkills.length > 0) {
    assets.push({
      type: 'skill',
      title: '硬技能',
      items: userProfile.hardSkills,
      value: '可直接变现的核心能力'
    })
  }
  
  if (userProfile.softSkills.length > 0) {
    assets.push({
      type: 'skill',
      title: '软技能',
      items: userProfile.softSkills,
      value: '可迁移的通用能力'
    })
  }
  
  // 经验资产
  if (userProfile.workYears >= 3) {
    assets.push({
      type: 'experience',
      title: '行业经验',
      items: [`${userProfile.workYears}年${userProfile.industry}经验`],
      value: '稀缺的专业know-how'
    })
  }
  
  // 资源资产
  if (userProfile.specialResources.length > 0) {
    assets.push({
      type: 'resource',
      title: '特殊资源',
      items: userProfile.specialResources,
      value: '独特的竞争优势'
    })
  }
  
  // 职业背景资产
  assets.push({
    type: 'career',
    title: '职业背景',
    items: [`${userProfile.position}`, `${userProfile.industry}行业`],
    value: '潜在的变现方向'
  })
  
  return assets
}

/**
 * 获取启动路线图
 */
export function getRoadmap(sideJob: SideJob, userProfile: UserProfile) {
  const roadmap = [...sideJob.roadmap]
  
  // 根据用户情况个性化调整
  if (userProfile.workYears < 2) {
    // 新手增加学习阶段
    roadmap[0].tasks.unshift('先系统学习相关基础知识')
  }
  
  if (userProfile.availableTime.includes('少')) {
    // 时间少的人调整时间预期
    roadmap.forEach(phase => {
      if (phase.duration.includes('月')) {
        phase.duration = phase.duration.replace(/(\d+)/, (match) => {
          return String(parseInt(match) * 1.5)
        })
      }
    })
  }
  
  return roadmap
}
