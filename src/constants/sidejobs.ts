// 副业百科全书数据
// 50+副业数据 - 四大类型共54个
// 技能驱动型: 15个
// 内容驱动型: 15个  
// 资源信息差型: 10个
// 社交人脉型: 10个

export type SideJobCategory = 'skill' | 'content' | 'resource' | 'network'

export interface SideJob {
  id: string
  name: string
  category: SideJobCategory
  categoryName: string
  description: string
  difficulty: 1 | 2 | 3 | 4 | 5
  incomePotential: 1 | 2 | 3 | 4 | 5
  startupCycle: string
  timeCommitment: string
  requirements: {
    hardSkills: string[]
    softSkills: string[]
    startupFund: string
    equipment: string[]
  }
  suitableFor: string[]
  incomeRange: {
    beginner: string
    intermediate: string
    expert: string
  }
  roadmap: {
    phase: string
    duration: string
    tasks: string[]
  }[]
  risks: string[]
  advantages: string[]
  cases: {
    name: string
    background: string
    result: string
  }[]
  matchWeights: {
    skillWeight: number
    interestWeight: number
    resourceWeight: number
    timeWeight: number
  }
}

export const CATEGORY_MAP: Record<SideJobCategory, { name: string; icon: string; desc: string }> = {
  skill: {
    name: '技能驱动型',
    icon: '💻',
    desc: '依靠专业技能提供服务或产品'
  },
  content: {
    name: '内容驱动型',
    icon: '✍️',
    desc: '通过创作内容建立影响力变现'
  },
  resource: {
    name: '资源信息差型',
    icon: '📦',
    desc: '利用信息差或资源优势获利'
  },
  network: {
    name: '社交人脉型',
    icon: '🤝',
    desc: '通过人脉网络促成交易或服务'
  }
}

// 50+副业数据
export const SIDE_JOBS: SideJob[] = [
  // ========== 技能驱动型 (15种) ==========
  {
    id: 'web-development',
    name: '独立开发/外包接单',
    category: 'skill',
    categoryName: '技能驱动型',
    description: '利用编程技能为客户开发网站、小程序、APP等',
    difficulty: 4,
    incomePotential: 5,
    startupCycle: '1-3个月',
    timeCommitment: '自由安排，项目制',
    requirements: {
      hardSkills: ['编程开发', '前端/后端/全栈', '需求分析', '项目管理'],
      softSkills: ['客户沟通', '时间管理', '质量把控'],
      startupFund: '0-5000元（设备已有时为0）',
      equipment: ['电脑', '开发环境']
    },
    suitableFor: ['程序员', '软件工程师', '计算机专业学生'],
    incomeRange: {
      beginner: '3000-8000元/月',
      intermediate: '10000-25000元/月',
      expert: '30000元+/月'
    },
    roadmap: [
      {
        phase: '技能准备',
        duration: '1个月',
        tasks: ['确定技术栈', '准备作品集', '完善GitHub']
      },
      {
        phase: '接单获客',
        duration: '1-2个月',
        tasks: ['注册接单平台', '积累初期评价', '建立客户关系']
      },
      {
        phase: '稳定变现',
        duration: '3个月+',
        tasks: ['老客户复购', '提高客单价', '组建小团队']
      }
    ],
    risks: [
      '客户需求变更频繁',
      '回款周期长或拖欠',
      '低价竞争严重',
      '项目延期影响口碑'
    ],
    advantages: [
      '技能门槛高，竞争相对小',
      '客单价高',
      '可远程工作',
      '积累案例提升身价'
    ],
    cases: [
      {
        name: '张先生',
        background: '3年前端开发经验',
        result: '副业月入15000元，转型自由职业'
      }
    ],
    matchWeights: {
      skillWeight: 0.5,
      interestWeight: 0.2,
      resourceWeight: 0.1,
      timeWeight: 0.2
    }
  },
  {
    id: 'ui-design',
    name: 'UI/UX设计接单',
    category: 'skill',
    categoryName: '技能驱动型',
    description: '为企业或个人提供界面设计、交互设计服务',
    difficulty: 3,
    incomePotential: 4,
    startupCycle: '1-2个月',
    timeCommitment: '自由安排',
    requirements: {
      hardSkills: ['设计软件(Figma/Sketch)', 'UI设计', '交互设计', '设计规范'],
      softSkills: ['审美能力', '客户沟通', '需求理解'],
      startupFund: '0-2000元',
      equipment: ['电脑', '设计软件']
    },
    suitableFor: ['UI设计师', 'UX设计师', '设计专业学生', '产品经理'],
    incomeRange: {
      beginner: '2000-5000元/月',
      intermediate: '8000-15000元/月',
      expert: '20000元+/月'
    },
    roadmap: [
      {
        phase: '作品准备',
        duration: '2周',
        tasks: ['整理作品集', '创建Dribbble/站酷账号', '准备案例']
      },
      {
        phase: '平台接单',
        duration: '1-2个月',
        tasks: ['注册设计平台', '接小单练手', '积累好评']
      },
      {
        phase: '品牌建立',
        duration: '持续',
        tasks: ['建立个人品牌', '提高报价', '选择性接单']
      }
    ],
    risks: [
      '客户审美难以统一',
      '修改次数多',
      '低价竞争严重'
    ],
    advantages: [
      '创意工作，成就感强',
      '可远程办公',
      '时间灵活',
      '作品可积累'
    ],
    cases: [
      {
        name: '李女士',
        background: '5年UI设计经验',
        result: '副业月入12000元，客户稳定'
      }
    ],
    matchWeights: {
      skillWeight: 0.5,
      interestWeight: 0.25,
      resourceWeight: 0.1,
      timeWeight: 0.15
    }
  },
  {
    id: 'translation',
    name: '翻译/本地化服务',
    category: 'skill',
    categoryName: '技能驱动型',
    description: '提供文档翻译、口译、本地化等专业语言服务',
    difficulty: 3,
    incomePotential: 3,
    startupCycle: '即时',
    timeCommitment: '灵活',
    requirements: {
      hardSkills: ['精通至少一门外语', '翻译技巧', '专业领域知识'],
      softSkills: ['细致认真', '时间管理'],
      startupFund: '0元',
      equipment: ['电脑']
    },
    suitableFor: ['外语专业', '海归', '双语工作者', '语言爱好者'],
    incomeRange: {
      beginner: '1000-3000元/月',
      intermediate: '5000-10000元/月',
      expert: '15000元+/月'
    },
    roadmap: [
      {
        phase: '能力认证',
        duration: '1个月',
        tasks: ['考取翻译证书', '测试翻译水平', '确定专业领域']
      },
      {
        phase: '平台接单',
        duration: '1-2个月',
        tasks: ['注册翻译平台', '接小单练手', '积累字数']
      },
      {
        phase: '专业深耕',
        duration: '持续',
        tasks: ['深耕细分领域', '建立直客', '提高单价']
      }
    ],
    risks: [
      'AI翻译冲击',
      '单价逐年下降',
      '工作量大但收入有限'
    ],
    advantages: [
      '可在家工作',
      '提升语言能力',
      '接触各专业知识',
      '门槛低，随时开始'
    ],
    cases: [
      {
        name: '王女士',
        background: '英语专八，法律背景',
        result: '法律翻译月入8000元'
      }
    ],
    matchWeights: {
      skillWeight: 0.6,
      interestWeight: 0.15,
      resourceWeight: 0.05,
      timeWeight: 0.2
    }
  },
  {
    id: 'data-analysis',
    name: '数据分析服务',
    category: 'skill',
    categoryName: '技能驱动型',
    description: '为企业提供数据采集、分析、可视化等服务',
    difficulty: 4,
    incomePotential: 5,
    startupCycle: '1-2个月',
    timeCommitment: '项目制',
    requirements: {
      hardSkills: ['SQL', 'Python/R', '数据可视化', '统计学', 'Excel'],
      softSkills: ['商业思维', '数据解读', '报告撰写'],
      startupFund: '0元',
      equipment: ['电脑']
    },
    suitableFor: ['数据分析师', '数据工程师', '统计学背景'],
    incomeRange: {
      beginner: '3000-6000元/月',
      intermediate: '10000-20000元/月',
      expert: '30000元+/月'
    },
    roadmap: [
      {
        phase: '技能提升',
        duration: '1个月',
        tasks: ['学习工具', '准备案例', '建立GitHub']
      },
      {
        phase: '获客接单',
        duration: '1-2个月',
        tasks: ['注册接单平台', '社交媒体展示', '小项目练手']
      },
      {
        phase: '专业深耕',
        duration: '持续',
        tasks: ['深耕行业', '建立口碑', '长期客户']
      }
    ],
    risks: [
      '项目周期长',
      '需求理解偏差',
      '数据安全和隐私问题'
    ],
    advantages: [
      '需求大，市场好',
      '技能可迁移',
      '远程工作',
      '成长空间大'
    ],
    cases: [
      {
        name: '陈先生',
        background: '4年数据分析经验',
        result: '副业月入20000元'
      }
    ],
    matchWeights: {
      skillWeight: 0.55,
      interestWeight: 0.2,
      resourceWeight: 0.1,
      timeWeight: 0.15
    }
  },
  {
    id: 'video-editing',
    name: '视频剪辑接单',
    category: 'skill',
    categoryName: '技能驱动型',
    description: '为自媒体、企业、个人提供视频剪辑、调色、特效制作服务',
    difficulty: 3,
    incomePotential: 4,
    startupCycle: '1-2个月',
    timeCommitment: '项目制，灵活',
    requirements: {
      hardSkills: ['剪辑软件(PR/FCP/剪映)', '调色技巧', '字幕制作', '音频处理'],
      softSkills: ['审美能力', '客户沟通', '理解需求'],
      startupFund: '0-5000元（软件、素材）',
      equipment: ['电脑', '剪辑软件']
    },
    suitableFor: ['剪辑师', '自媒体人', '影视专业学生', '视频爱好者'],
    incomeRange: {
      beginner: '2000-5000元/月',
      intermediate: '8000-15000元/月',
      expert: '25000元+/月'
    },
    roadmap: [
      {
        phase: '技能打磨',
        duration: '1个月',
        tasks: ['熟练剪辑软件', '学习调色技巧', '制作作品样片']
      },
      {
        phase: '平台获客',
        duration: '1-2个月',
        tasks: ['注册接单平台', '发布作品', '接小单练手']
      },
      {
        phase: '稳定接单',
        duration: '持续',
        tasks: ['建立客户群', '提高单价', '打造口碑']
      }
    ],
    risks: [
      '客户反复修改',
      '低价竞争激烈',
      '项目时间不固定',
      '设备投入较大'
    ],
    advantages: [
      '视频需求持续增长',
      '技能可迁移性强',
      '远程办公',
      '作品可积累'
    ],
    cases: [
      {
        name: '小刘',
        background: '2年剪辑经验，爱好短视频',
        result: '副业月入10000元，客户稳定'
      }
    ],
    matchWeights: {
      skillWeight: 0.5,
      interestWeight: 0.2,
      resourceWeight: 0.1,
      timeWeight: 0.2
    }
  },
  {
    id: 'copywriting',
    name: '文案写作',
    category: 'skill',
    categoryName: '技能驱动型',
    description: '为品牌、自媒体、电商等提供文案策划、软文撰写、脚本创作服务',
    difficulty: 2,
    incomePotential: 4,
    startupCycle: '即时',
    timeCommitment: '灵活',
    requirements: {
      hardSkills: ['文字功底', '文案技巧', 'SEO知识', '营销思维'],
      softSkills: ['创意思维', '理解需求', '快速学习'],
      startupFund: '0元',
      equipment: ['电脑']
    },
    suitableFor: ['文字工作者', '市场营销', '新媒体运营', '写作爱好者'],
    incomeRange: {
      beginner: '1000-3000元/月',
      intermediate: '5000-12000元/月',
      expert: '20000元+/月'
    },
    roadmap: [
      {
        phase: '作品准备',
        duration: '2周',
        tasks: ['整理过往作品', '创建作品集', '确定擅长领域']
      },
      {
        phase: '平台接单',
        duration: '1个月',
        tasks: ['注册写作平台', '接小单练手', '积累好评']
      },
      {
        phase: '长期合作',
        duration: '持续',
        tasks: ['建立长期客户', '提高单价', '选择性接单']
      }
    ],
    risks: [
      '客户要求多变',
      '低价竞争严重',
      '创意枯竭风险',
      '稿费拖欠问题'
    ],
    advantages: [
      '零成本启动',
      '随时随地工作',
      '提升写作能力',
      '客户可积累'
    ],
    cases: [
      {
        name: '小周',
        background: '文案策划3年经验',
        result: '副业月入8000元，合作品牌方5家'
      }
    ],
    matchWeights: {
      skillWeight: 0.45,
      interestWeight: 0.25,
      resourceWeight: 0.1,
      timeWeight: 0.2
    }
  },
  {
    id: 'accounting',
    name: '代理记账',
    category: 'skill',
    categoryName: '技能驱动型',
    description: '为小微企业、个体工商户提供记账、报税、财务咨询服务',
    difficulty: 3,
    incomePotential: 3,
    startupCycle: '1个月',
    timeCommitment: '每月集中几天',
    requirements: {
      hardSkills: ['会计知识', '税务法规', '财务软件', '报表制作'],
      softSkills: ['细致认真', '责任心', '保密意识'],
      startupFund: '0-2000元（软件、材料）',
      equipment: ['电脑', '财务软件']
    },
    suitableFor: ['会计师', '财务人员', '会计专业学生', '有会计证者'],
    incomeRange: {
      beginner: '1000-3000元/月',
      intermediate: '5000-8000元/月',
      expert: '15000元+/月'
    },
    roadmap: [
      {
        phase: '资质准备',
        duration: '1个月',
        tasks: ['确认会计资质', '熟悉最新税法', '准备合同模板']
      },
      {
        phase: '获客启动',
        duration: '1-2个月',
        tasks: ['朋友圈推广', '朋友介绍', '联系小微企业']
      },
      {
        phase: '稳定服务',
        duration: '持续',
        tasks: ['服务老客户', '口碑转介绍', '控制客户数量']
      }
    ],
    risks: [
      '税务责任风险',
      '客户账目混乱',
      '政策变化影响',
      '收款困难'
    ],
    advantages: [
      '需求稳定',
      '时间相对固定',
      '专业门槛保护',
      '客户粘性高'
    ],
    cases: [
      {
        name: '赵会计',
        background: '10年财务工作经验',
        result: '代理记账15家，月入10000元'
      }
    ],
    matchWeights: {
      skillWeight: 0.6,
      interestWeight: 0.1,
      resourceWeight: 0.1,
      timeWeight: 0.2
    }
  },
  {
    id: 'legal-consulting',
    name: '法律咨询',
    category: 'skill',
    categoryName: '技能驱动型',
    description: '为个人或企业提供法律咨询、合同审核、文书代写等服务',
    difficulty: 4,
    incomePotential: 5,
    startupCycle: '即时',
    timeCommitment: '灵活',
    requirements: {
      hardSkills: ['法律知识', '合同审核', '文书写作', '案例分析'],
      softSkills: ['逻辑思维', '沟通能力', '风险意识'],
      startupFund: '0元',
      equipment: ['电脑']
    },
    suitableFor: ['执业律师', '法务人员', '法学专业', '法律爱好者'],
    incomeRange: {
      beginner: '3000-6000元/月',
      intermediate: '10000-20000元/月',
      expert: '50000元+/月'
    },
    roadmap: [
      {
        phase: '资质确认',
        duration: '即时',
        tasks: ['确认执业资质', '了解服务边界', '准备咨询模板']
      },
      {
        phase: '平台获客',
        duration: '1个月',
        tasks: ['入驻法律咨询平台', '建立专业形象', '回答免费问题']
      },
      {
        phase: '口碑积累',
        duration: '持续',
        tasks: ['积累好评', '提高咨询单价', '建立长期客户']
      }
    ],
    risks: [
      '法律责任风险',
      '客户期望过高',
      '咨询边界把控',
      '执业资格要求'
    ],
    advantages: [
      '专业壁垒高',
      '客单价高',
      '社会需求大',
      '时间灵活'
    ],
    cases: [
      {
        name: '李律师',
        background: '执业律师，5年民商事经验',
        result: '法律咨询副业月入25000元'
      }
    ],
    matchWeights: {
      skillWeight: 0.6,
      interestWeight: 0.15,
      resourceWeight: 0.1,
      timeWeight: 0.15
    }
  },
  {
    id: 'photography',
    name: '摄影接单',
    category: 'skill',
    categoryName: '技能驱动型',
    description: '提供人像摄影、活动拍摄、产品摄影、婚礼跟拍等服务',
    difficulty: 3,
    incomePotential: 4,
    startupCycle: '1-2个月',
    timeCommitment: '周末或业余时间',
    requirements: {
      hardSkills: ['摄影技术', '后期修图', '构图技巧', '用光技巧'],
      softSkills: ['审美能力', '沟通能力', '引导能力'],
      startupFund: '5000-20000元（设备）',
      equipment: ['相机', '镜头', '电脑', '修图软件']
    },
    suitableFor: ['摄影师', '摄影爱好者', '设计师', '艺术从业者'],
    incomeRange: {
      beginner: '2000-5000元/月',
      intermediate: '8000-15000元/月',
      expert: '30000元+/月'
    },
    roadmap: [
      {
        phase: '作品积累',
        duration: '1个月',
        tasks: ['拍摄作品集', '后期修图', '建立风格']
      },
      {
        phase: '获客推广',
        duration: '1-2个月',
        tasks: ['朋友圈推广', '入驻摄影平台', '低价引流']
      },
      {
        phase: '品牌建设',
        duration: '持续',
        tasks: ['建立个人风格', '提高单价', '选择性接单']
      }
    ],
    risks: [
      '设备投入大',
      '天气影响拍摄',
      '客户审美差异',
      '体力消耗大'
    ],
    advantages: [
      '创作性强',
      '作品可展示',
      '客单价高',
      '时间灵活'
    ],
    cases: [
      {
        name: '张摄影师',
        background: '摄影爱好者转职业',
        result: '周末拍摄，月入12000元'
      }
    ],
    matchWeights: {
      skillWeight: 0.45,
      interestWeight: 0.3,
      resourceWeight: 0.15,
      timeWeight: 0.1
    }
  },
  {
    id: 'online-teaching',
    name: '在线教学',
    category: 'skill',
    categoryName: '技能驱动型',
    description: '通过在线教育平台教授语言、乐器、编程、考试等课程',
    difficulty: 3,
    incomePotential: 4,
    startupCycle: '1-2个月',
    timeCommitment: '固定课时',
    requirements: {
      hardSkills: ['专业知识', '教学能力', '课程设计', '平台操作'],
      softSkills: ['表达能力', '耐心', '互动能力'],
      startupFund: '0-1000元（设备）',
      equipment: ['电脑', '麦克风', '摄像头']
    },
    suitableFor: ['教师', '专业人士', '有特长者', '耐心细心的人'],
    incomeRange: {
      beginner: '2000-4000元/月',
      intermediate: '8000-15000元/月',
      expert: '25000元+/月'
    },
    roadmap: [
      {
        phase: '资质准备',
        duration: '2周',
        tasks: ['准备教师资格证或专业证明', '录制试讲课', '确定授课科目']
      },
      {
        phase: '平台入驻',
        duration: '1个月',
        tasks: ['申请入驻教育平台', '完善个人资料', '开放试听课']
      },
      {
        phase: '稳定授课',
        duration: '持续',
        tasks: ['积累学生', '提高课时费', '开发课程产品']
      }
    ],
    risks: [
      '平台抽成高',
      '学生流失',
      '时间固定不灵活',
      '身体消耗大'
    ],
    advantages: [
      '知识变现',
      '成就感强',
      '时间相对固定',
      '可录制课程复用'
    ],
    cases: [
      {
        name: '王老师',
        background: '英语教师，10年教学经验',
        result: '在线授课月入15000元'
      }
    ],
    matchWeights: {
      skillWeight: 0.5,
      interestWeight: 0.2,
      resourceWeight: 0.1,
      timeWeight: 0.2
    }
  },
  {
    id: 'programming-tutor',
    name: '编程辅导',
    category: 'skill',
    categoryName: '技能驱动型',
    description: '为编程学习者提供一对一辅导、答疑、项目指导服务',
    difficulty: 3,
    incomePotential: 4,
    startupCycle: '即时',
    timeCommitment: '灵活预约',
    requirements: {
      hardSkills: ['编程技能', '教学经验', 'Debug能力', '项目经验'],
      softSkills: ['耐心', '表达能力', '逻辑思维'],
      startupFund: '0元',
      equipment: ['电脑']
    },
    suitableFor: ['程序员', '计算机专业学生', '技术专家', '喜欢教学的人'],
    incomeRange: {
      beginner: '3000-6000元/月',
      intermediate: '10000-18000元/月',
      expert: '30000元+/月'
    },
    roadmap: [
      {
        phase: '准备阶段',
        duration: '2周',
        tasks: ['确定辅导方向', '准备教学大纲', '录制示例课']
      },
      {
        phase: '平台获客',
        duration: '1个月',
        tasks: ['入驻辅导平台', '低价试听', '积累好评']
      },
      {
        phase: '稳定辅导',
        duration: '持续',
        tasks: ['建立学生群', '提高单价', '开发课程']
      }
    ],
    risks: [
      '学生基础差异大',
      '教学效果难保证',
      '时间投入大',
      '需要持续更新知识'
    ],
    advantages: [
      '知识变现',
      '巩固自身技能',
      '时间灵活',
      '可远程进行'
    ],
    cases: [
      {
        name: '陈程序员',
        background: '5年后端开发经验',
        result: '周末辅导，月入10000元'
      }
    ],
    matchWeights: {
      skillWeight: 0.55,
      interestWeight: 0.2,
      resourceWeight: 0.05,
      timeWeight: 0.2
    }
  },
  {
    id: 'ppt-design',
    name: 'PPT设计',
    category: 'skill',
    categoryName: '技能驱动型',
    description: '为企业、个人提供PPT定制设计、美化、模板制作服务',
    difficulty: 2,
    incomePotential: 3,
    startupCycle: '即时',
    timeCommitment: '项目制',
    requirements: {
      hardSkills: ['PPT软件', '设计基础', '排版技巧', '配色知识'],
      softSkills: ['审美', '理解需求', '沟通能力'],
      startupFund: '0元',
      equipment: ['电脑', 'Office/WPS']
    },
    suitableFor: ['职场人士', '设计师', '大学生', 'PPT爱好者'],
    incomeRange: {
      beginner: '1000-3000元/月',
      intermediate: '5000-10000元/月',
      expert: '20000元+/月'
    },
    roadmap: [
      {
        phase: '作品准备',
        duration: '2周',
        tasks: ['制作作品样例', '整理模板', '确定风格定位']
      },
      {
        phase: '平台接单',
        duration: '1个月',
        tasks: ['入驻设计平台', '接小单练手', '积累评价']
      },
      {
        phase: '品牌建立',
        duration: '持续',
        tasks: ['建立口碑', '提高单价', '发展长期客户']
      }
    ],
    risks: [
      '低价竞争严重',
      '客户反复修改',
      '设计主观性强',
      '工作量大'
    ],
    advantages: [
      '门槛低易上手',
      '市场需求大',
      '可在家工作',
      '技能可迁移'
    ],
    cases: [
      {
        name: '小林',
        background: '行政专员，擅长PPT',
        result: '副业月入6000元'
      }
    ],
    matchWeights: {
      skillWeight: 0.4,
      interestWeight: 0.25,
      resourceWeight: 0.1,
      timeWeight: 0.25
    }
  },
  {
    id: 'excel-consulting',
    name: 'Excel咨询',
    category: 'skill',
    categoryName: '技能驱动型',
    description: '为企业提供Excel数据处理、报表设计、自动化、培训服务',
    difficulty: 2,
    incomePotential: 3,
    startupCycle: '即时',
    timeCommitment: '灵活',
    requirements: {
      hardSkills: ['Excel高级功能', '数据处理', '函数公式', 'VBA编程'],
      softSkills: ['逻辑思维', '问题解决', '耐心'],
      startupFund: '0元',
      equipment: ['电脑']
    },
    suitableFor: ['数据分析师', '财务人员', 'Excel高手', '办公效率达人'],
    incomeRange: {
      beginner: '1000-3000元/月',
      intermediate: '5000-8000元/月',
      expert: '15000元+/月'
    },
    roadmap: [
      {
        phase: '能力确认',
        duration: '即时',
        tasks: ['评估Excel水平', '准备案例', '确定服务范围']
      },
      {
        phase: '获客推广',
        duration: '1个月',
        tasks: ['平台注册', '朋友圈推广', '低价服务引流']
      },
      {
        phase: '稳定服务',
        duration: '持续',
        tasks: ['建立客户群', '开发模板产品', '提供培训']
      }
    ],
    risks: [
      '需求不稳定',
      '单价偏低',
      '客户学习能力差异',
      'AI工具冲击'
    ],
    advantages: [
      '零成本启动',
      '市场需求大',
      '可远程服务',
      '技能实用'
    ],
    cases: [
      {
        name: '小方',
        background: '财务分析师，Excel专家',
        result: 'Excel咨询月入5000元'
      }
    ],
    matchWeights: {
      skillWeight: 0.55,
      interestWeight: 0.15,
      resourceWeight: 0.1,
      timeWeight: 0.2
    }
  },
  {
    id: 'voice-acting',
    name: '配音/有声书',
    category: 'skill',
    categoryName: '技能驱动型',
    description: '为有声书、广告、动画、短视频等提供配音服务',
    difficulty: 2,
    incomePotential: 3,
    startupCycle: '1个月',
    timeCommitment: '灵活',
    requirements: {
      hardSkills: ['声音控制', '播音技巧', '录音技术', '后期处理'],
      softSkills: ['表达能力', '情感表达', '耐心'],
      startupFund: '1000-5000元（设备）',
      equipment: ['麦克风', '声卡', '录音环境']
    },
    suitableFor: ['声音条件好', '播音专业', '戏剧专业', '喜欢朗读的人'],
    incomeRange: {
      beginner: '1000-3000元/月',
      intermediate: '5000-10000元/月',
      expert: '20000元+/月'
    },
    roadmap: [
      {
        phase: '设备准备',
        duration: '1个月',
        tasks: ['购买录音设备', '搭建录音环境', '练习配音技巧']
      },
      {
        phase: '平台入驻',
        duration: '1个月',
        tasks: ['注册配音平台', '上传样音', '接小单练手']
      },
      {
        phase: '稳定接单',
        duration: '持续',
        tasks: ['积累作品', '提高单价', '发展长期客户']
      }
    ],
    risks: [
      '设备投入',
      '声带保护',
      '竞争激烈',
      '收入不稳定'
    ],
    advantages: [
      '在家工作',
      '发挥声音优势',
      '时间灵活',
      '作品可积累'
    ],
    cases: [
      {
        name: '小雨',
        background: '播音主持专业毕业',
        result: '有声书配音月入8000元'
      }
    ],
    matchWeights: {
      skillWeight: 0.4,
      interestWeight: 0.3,
      resourceWeight: 0.15,
      timeWeight: 0.15
    }
  },
  {
    id: '3d-modeling',
    name: '3D建模',
    category: 'skill',
    categoryName: '技能驱动型',
    description: '提供3D建模、渲染、游戏资产、产品设计等服务',
    difficulty: 4,
    incomePotential: 4,
    startupCycle: '2-3个月',
    timeCommitment: '项目制',
    requirements: {
      hardSkills: ['3D软件(Blender/Maya/3ds Max)', '建模技术', '材质渲染', 'UV展开'],
      softSkills: ['空间想象力', '审美', '耐心'],
      startupFund: '0-5000元（软件）',
      equipment: ['高性能电脑', '3D软件']
    },
    suitableFor: ['3D设计师', '游戏从业者', '工业设计', '建模爱好者'],
    incomeRange: {
      beginner: '2000-5000元/月',
      intermediate: '8000-15000元/月',
      expert: '25000元+/月'
    },
    roadmap: [
      {
        phase: '技能提升',
        duration: '2个月',
        tasks: ['精通软件', '准备作品集', '确定擅长领域']
      },
      {
        phase: '平台获客',
        duration: '1-2个月',
        tasks: ['入驻接单平台', '参与外包', '建立口碑']
      },
      {
        phase: '专业深耕',
        duration: '持续',
        tasks: ['深耕细分领域', '提高单价', '长期客户']
      }
    ],
    risks: [
      '学习曲线陡峭',
      '硬件要求高',
      '竞争激烈',
      '项目周期长'
    ],
    advantages: [
      '创意性强',
      '技能稀缺',
      '客单价高',
      '作品可展示'
    ],
    cases: [
      {
        name: '小李',
        background: '游戏3D美术，3年经验',
        result: '副业接单月入15000元'
      }
    ],
    matchWeights: {
      skillWeight: 0.55,
      interestWeight: 0.25,
      resourceWeight: 0.1,
      timeWeight: 0.1
    }
  },
  
  // ========== 内容驱动型 (15种) ==========
  {
    id: 'xiaohongshu-blogger',
    name: '小红书博主',
    category: 'content',
    categoryName: '内容驱动型',
    description: '在小红书平台创作内容，通过广告、带货、知识付费变现',
    difficulty: 2,
    incomePotential: 5,
    startupCycle: '3-6个月',
    timeCommitment: '每天1-3小时',
    requirements: {
      hardSkills: ['内容创作', '图文编辑', '选题策划', '平台运营'],
      softSkills: ['网感', '审美', '表达能力', '持续输出'],
      startupFund: '0-1000元',
      equipment: ['手机', '修图软件']
    },
    suitableFor: ['喜欢分享的人', '某领域爱好者', '有表达欲的人'],
    incomeRange: {
      beginner: '0-1000元/月',
      intermediate: '3000-10000元/月',
      expert: '20000-100000元/月'
    },
    roadmap: [
      {
        phase: '定位启动',
        duration: '1个月',
        tasks: ['确定垂直领域', '分析对标账号', '发布10篇内容测试']
      },
      {
        phase: '涨粉期',
        duration: '2-3个月',
        tasks: ['保持更新频率', '研究爆款逻辑', '互动涨粉']
      },
      {
        phase: '变现期',
        duration: '3个月+',
        tasks: ['接广告合作', '开通带货', '知识付费']
      }
    ],
    risks: [
      '算法变化影响流量',
      '起号周期长',
      '内容创作压力大',
      '变现不稳定'
    ],
    advantages: [
      '门槛低，人人可做',
      '时间自由',
      '复利效应强',
      '建立个人品牌'
    ],
    cases: [
      {
        name: '小美',
        background: '普通上班族，爱好穿搭',
        result: '10万粉，月入30000元'
      }
    ],
    matchWeights: {
      skillWeight: 0.2,
      interestWeight: 0.4,
      resourceWeight: 0.15,
      timeWeight: 0.25
    }
  },
  {
    id: 'wechat-public',
    name: '公众号运营',
    category: 'content',
    categoryName: '内容驱动型',
    description: '运营微信公众号，通过广告、赞赏、知识付费变现',
    difficulty: 3,
    incomePotential: 4,
    startupCycle: '6-12个月',
    timeCommitment: '每周2-3篇',
    requirements: {
      hardSkills: ['写作能力', '选题策划', '排版编辑', '数据分析'],
      softSkills: ['深度思考', '持续输出', '用户思维'],
      startupFund: '0-500元',
      equipment: ['电脑']
    },
    suitableFor: ['喜欢写作的人', '专业人士', '有深度内容能力者'],
    incomeRange: {
      beginner: '0-500元/月',
      intermediate: '2000-8000元/月',
      expert: '15000-50000元/月'
    },
    roadmap: [
      {
        phase: '冷启动',
        duration: '1-3个月',
        tasks: ['确定定位', '注册公众号', '积累10篇原创内容']
      },
      {
        phase: '涨粉期',
        duration: '3-6个月',
        tasks: ['持续输出', '多渠道引流', '开通流量主']
      },
      {
        phase: '变现期',
        duration: '6个月+',
        tasks: ['广告合作', '知识付费', '社群运营']
      }
    ],
    risks: [
      '起号周期长（6个月+）',
      '流量红利消失',
      '写作压力大',
      '变现慢'
    ],
    advantages: [
      '内容资产沉淀',
      '私域流量价值高',
      '变现方式多样',
      '建立专业形象'
    ],
    cases: [
      {
        name: '老王',
        background: '产品经理，写作爱好者',
        result: '5万粉，月入15000元'
      }
    ],
    matchWeights: {
      skillWeight: 0.3,
      interestWeight: 0.35,
      resourceWeight: 0.15,
      timeWeight: 0.2
    }
  },
  {
    id: 'short-video',
    name: '短视频创作者',
    category: 'content',
    categoryName: '内容驱动型',
    description: '在抖音、快手、视频号等平台创作短视频内容变现',
    difficulty: 3,
    incomePotential: 5,
    startupCycle: '3-6个月',
    timeCommitment: '每天2-4小时',
    requirements: {
      hardSkills: ['视频拍摄', '剪辑软件', '脚本策划', '平台运营'],
      softSkills: ['镜头表现力', '网感', '持续创作'],
      startupFund: '0-3000元',
      equipment: ['手机', '补光灯', '麦克风']
    },
    suitableFor: ['外向型人格', '有表演欲', '善于表达', '时间充足'],
    incomeRange: {
      beginner: '0-1000元/月',
      intermediate: '5000-20000元/月',
      expert: '30000-200000元/月'
    },
    roadmap: [
      {
        phase: '定位测试',
        duration: '1个月',
        tasks: ['确定赛道', '分析爆款', '发布20条测试']
      },
      {
        phase: '涨粉期',
        duration: '2-4个月',
        tasks: ['日更或高频更新', '研究算法', '互动涨粉']
      },
      {
        phase: '变现期',
        duration: '持续',
        tasks: ['直播带货', '广告合作', '知识付费']
      }
    ],
    risks: [
      '算法不稳定',
      '创作压力大',
      '同质化竞争激烈',
      '容易 burnout'
    ],
    advantages: [
      '流量大，变现快',
      '门槛低',
      '多种变现方式',
      '打造个人IP'
    ],
    cases: [
      {
        name: '阿杰',
        background: '健身教练',
        result: '100万粉，月入50000元'
      }
    ],
    matchWeights: {
      skillWeight: 0.25,
      interestWeight: 0.4,
      resourceWeight: 0.15,
      timeWeight: 0.2
    }
  },
  {
    id: 'knowledge-payment',
    name: '知识付费/课程',
    category: 'content',
    categoryName: '内容驱动型',
    description: '将自己的专业知识封装成课程、专栏、咨询等产品变现',
    difficulty: 4,
    incomePotential: 5,
    startupCycle: '3-6个月',
    timeCommitment: '前期投入大，后期维护少',
    requirements: {
      hardSkills: ['专业知识', '课程设计', '内容制作', '营销推广'],
      softSkills: ['表达能力', '结构化思维', '用户洞察'],
      startupFund: '0-5000元',
      equipment: ['电脑', '录制设备']
    },
    suitableFor: ['专业人士', '行业专家', '有体系化知识者'],
    incomeRange: {
      beginner: '0-2000元/月',
      intermediate: '5000-20000元/月',
      expert: '30000-100000元/月'
    },
    roadmap: [
      {
        phase: '定位设计',
        duration: '1个月',
        tasks: ['确定课程主题', '设计课程大纲', '验证需求']
      },
      {
        phase: '内容制作',
        duration: '2-3个月',
        tasks: ['制作课程内容', '准备配套资料', '打磨质量']
      },
      {
        phase: '上线推广',
        duration: '1-2个月',
        tasks: ['选择平台', '定价策略', '营销推广']
      },
      {
        phase: '持续运营',
        duration: '长期',
        tasks: ['学员服务', '课程迭代', '复购转化']
      }
    ],
    risks: [
      '前期投入大',
      '市场验证风险',
      '盗版问题',
      '需要持续更新'
    ],
    advantages: [
      '一次创作，多次售卖',
      '复利效应最强',
      '建立专家形象',
      '被动收入'
    ],
    cases: [
      {
        name: '刘老师',
        background: '10年产品经理',
        result: '课程月入30000元'
      }
    ],
    matchWeights: {
      skillWeight: 0.4,
      interestWeight: 0.3,
      resourceWeight: 0.1,
      timeWeight: 0.2
    }
  },
  {
    id: 'douyin-creator',
    name: '抖音创作者',
    category: 'content',
    categoryName: '内容驱动型',
    description: '在抖音平台创作短视频内容，通过广告、带货、直播变现',
    difficulty: 2,
    incomePotential: 5,
    startupCycle: '3-6个月',
    timeCommitment: '每天2-4小时',
    requirements: {
      hardSkills: ['视频拍摄', '剪辑制作', '选题策划', '平台算法'],
      softSkills: ['表现力', '创意能力', '网感', '坚持'],
      startupFund: '0-2000元',
      equipment: ['手机', '补光灯', '稳定器']
    },
    suitableFor: ['喜欢表演的人', '有表现力的人', '年轻人', '敢于尝试者'],
    incomeRange: {
      beginner: '0-1000元/月',
      intermediate: '5000-20000元/月',
      expert: '50000-500000元/月'
    },
    roadmap: [
      {
        phase: '定位起号',
        duration: '1个月',
        tasks: ['确定人设定位', '研究对标账号', '发布测试内容']
      },
      {
        phase: '涨粉期',
        duration: '2-4个月',
        tasks: ['保持日更', '蹭热点话题', '投DOU+测试']
      },
      {
        phase: '变现期',
        duration: '持续',
        tasks: ['开通橱窗', '接广告', '直播带货']
      }
    ],
    risks: [
      '算法变化风险',
      '内容创作压力大',
      '同质化竞争',
      '收入不稳定'
    ],
    advantages: [
      '流量巨大',
      '变现方式多',
      '爆发力强',
      '成名机会'
    ],
    cases: [
      {
        name: '小张',
        background: '普通上班族，喜欢拍视频',
        result: '50万粉，月入30000元'
      }
    ],
    matchWeights: {
      skillWeight: 0.2,
      interestWeight: 0.4,
      resourceWeight: 0.15,
      timeWeight: 0.25
    }
  },
  {
    id: 'bilibili-up',
    name: 'B站UP主',
    category: 'content',
    categoryName: '内容驱动型',
    description: '在B站创作中长视频，通过创作激励、充电、广告、带货变现',
    difficulty: 3,
    incomePotential: 4,
    startupCycle: '3-6个月',
    timeCommitment: '每周2-3个视频',
    requirements: {
      hardSkills: ['视频制作', '文案策划', '剪辑后期', '封面设计'],
      softSkills: ['知识储备', '表达能力', '持续创作', '社区感'],
      startupFund: '0-3000元',
      equipment: ['电脑', '相机/手机', '麦克风']
    },
    suitableFor: ['知识分享者', '年轻人', '爱好者', '有专业领域者'],
    incomeRange: {
      beginner: '0-500元/月',
      intermediate: '3000-10000元/月',
      expert: '20000-100000元/月'
    },
    roadmap: [
      {
        phase: '定位启动',
        duration: '1个月',
        tasks: ['确定创作领域', '分析优质UP主', '制作前5个视频']
      },
      {
        phase: '积累期',
        duration: '3-6个月',
        tasks: ['保持更新', '研究B站文化', '积累粉丝']
      },
      {
        phase: '变现期',
        duration: '持续',
        tasks: ['开通创作激励', '接广告', '开通充电']
      }
    ],
    risks: [
      '制作周期长',
      '播放量不稳定',
      '观众口味难捉摸',
      '竞争激烈'
    ],
    advantages: [
      '社区氛围好',
      '粉丝粘性高',
      '内容有沉淀',
      '变现稳定'
    ],
    cases: [
      {
        name: '知识君',
        background: '历史爱好者',
        result: '20万粉，月入15000元'
      }
    ],
    matchWeights: {
      skillWeight: 0.3,
      interestWeight: 0.4,
      resourceWeight: 0.1,
      timeWeight: 0.2
    }
  },
  {
    id: 'podcast-host',
    name: '播客主播',
    category: 'content',
    categoryName: '内容驱动型',
    description: '制作音频节目，通过付费订阅、广告、打赏变现',
    difficulty: 2,
    incomePotential: 3,
    startupCycle: '2-4个月',
    timeCommitment: '每周1-2期',
    requirements: {
      hardSkills: ['音频录制', '后期剪辑', '节目策划', '内容制作'],
      softSkills: ['表达能力', '倾听能力', '思考深度', '持续输出'],
      startupFund: '500-2000元',
      equipment: ['麦克风', '录音环境']
    },
    suitableFor: ['喜欢说话的人', '思考者', '知识分享者', '音频爱好者'],
    incomeRange: {
      beginner: '0-500元/月',
      intermediate: '2000-8000元/月',
      expert: '15000-50000元/月'
    },
    roadmap: [
      {
        phase: '定位策划',
        duration: '2周',
        tasks: ['确定播客主题', '设计节目形式', '准备前5期内容']
      },
      {
        phase: '启动制作',
        duration: '1-2个月',
        tasks: ['录制节目', '上架平台', '初期推广']
      },
      {
        phase: '积累听众',
        duration: '3-6个月',
        tasks: ['保持更新', '社群运营', '听众互动']
      }
    ],
    risks: [
      '市场相对小众',
      '变现周期长',
      '内容制作耗时',
      '听众增长慢'
    ],
    advantages: [
      '制作相对简单',
      '可以伴随性收听',
      '深度内容受欢迎',
      '社群粘性强'
    ],
    cases: [
      {
        name: '阿福',
        background: '互联网从业者，喜欢分享',
        result: '播客月入5000元，听众2万'
      }
    ],
    matchWeights: {
      skillWeight: 0.2,
      interestWeight: 0.45,
      resourceWeight: 0.1,
      timeWeight: 0.25
    }
  },
  {
    id: 'zhihu-writer',
    name: '知乎答主',
    category: 'content',
    categoryName: '内容驱动型',
    description: '在知乎平台回答问题、写文章，通过好物推荐、付费咨询、致知计划变现',
    difficulty: 2,
    incomePotential: 4,
    startupCycle: '2-4个月',
    timeCommitment: '每天1-2小时',
    requirements: {
      hardSkills: ['写作能力', '专业知识', '选题能力', 'SEO技巧'],
      softSkills: ['逻辑思维', '知识储备', '持续输出', '社区感'],
      startupFund: '0元',
      equipment: ['手机/电脑']
    },
    suitableFor: ['专业人士', '知识型', '文字工作者', '喜欢分享者'],
    incomeRange: {
      beginner: '0-500元/月',
      intermediate: '3000-10000元/月',
      expert: '20000-50000元/月'
    },
    roadmap: [
      {
        phase: '定位启动',
        duration: '1个月',
        tasks: ['确定擅长领域', '完善个人资料', '回答热门问题']
      },
      {
        phase: '涨粉期',
        duration: '2-3个月',
        tasks: ['持续高质量回答', '关注热点话题', '建立专业形象']
      },
      {
        phase: '变现期',
        duration: '持续',
        tasks: ['开通好物推荐', '付费咨询', '致知计划']
      }
    ],
    risks: [
      '算法推荐不稳定',
      '同质化竞争',
      '变现周期长',
      '平台规则变化'
    ],
    advantages: [
      '零成本启动',
      '长尾流量',
      '专业形象建立',
      '多种变现方式'
    ],
    cases: [
      {
        name: '老王',
        background: '产品经理，擅长职场分享',
        result: '知乎月入10000元'
      }
    ],
    matchWeights: {
      skillWeight: 0.35,
      interestWeight: 0.4,
      resourceWeight: 0.05,
      timeWeight: 0.2
    }
  },
  {
    id: 'novel-writing',
    name: '网络小说写作',
    category: 'content',
    categoryName: '内容驱动型',
    description: '在网文平台连载小说，通过订阅、打赏、版权变现',
    difficulty: 3,
    incomePotential: 5,
    startupCycle: '3-6个月',
    timeCommitment: '每天2-4小时',
    requirements: {
      hardSkills: ['写作能力', '故事构思', '连载节奏', '网文套路'],
      softSkills: ['想象力', '坚持', '抗压能力', '读者思维'],
      startupFund: '0元',
      equipment: ['电脑']
    },
    suitableFor: ['文字创作者', '想象力丰富者', '有耐心的人', '阅读爱好者'],
    incomeRange: {
      beginner: '0-1000元/月',
      intermediate: '5000-20000元/月',
      expert: '50000-500000元/月'
    },
    roadmap: [
      {
        phase: '准备阶段',
        duration: '1个月',
        tasks: ['研究热门题材', '构思故事大纲', '写前3万字']
      },
      {
        phase: '签约上架',
        duration: '1个月',
        tasks: ['选择平台', '申请签约', '开始连载']
      },
      {
        phase: '稳定更新',
        duration: '持续',
        tasks: ['日更4000-6000字', '读者互动', '参与平台活动']
      }
    ],
    risks: [
      '成功率低',
      '收入不稳定',
      '创作压力大',
      '版权纠纷'
    ],
    advantages: [
      '零门槛',
      '潜在收入高',
      '时间自由',
      '作品版权价值'
    ],
    cases: [
      {
        name: '墨香',
        background: '上班族，业余写小说',
        result: '月稿费30000元，已出版'
      }
    ],
    matchWeights: {
      skillWeight: 0.4,
      interestWeight: 0.4,
      resourceWeight: 0.05,
      timeWeight: 0.15
    }
  },
  {
    id: 'live-streaming',
    name: '直播带货',
    category: 'content',
    categoryName: '内容驱动型',
    description: '通过直播平台销售商品，赚取佣金或差价',
    difficulty: 2,
    incomePotential: 5,
    startupCycle: '1-2个月',
    timeCommitment: '每天3-6小时',
    requirements: {
      hardSkills: ['直播技巧', '产品介绍', '控场能力', '数据分析'],
      softSkills: ['表达能力', '亲和力', '抗压能力', '应变力'],
      startupFund: '0-5000元',
      equipment: ['手机', '补光灯', '样品']
    },
    suitableFor: ['有表现力的人', '销售能力强', '敢于出镜', '时间充裕者'],
    incomeRange: {
      beginner: '0-2000元/月',
      intermediate: '5000-30000元/月',
      expert: '100000-1000000元/月'
    },
    roadmap: [
      {
        phase: '准备阶段',
        duration: '2周',
        tasks: ['确定带货品类', '了解平台规则', '准备样品']
      },
      {
        phase: '开播测试',
        duration: '1个月',
        tasks: ['每天开播', '测试话术', '积累经验']
      },
      {
        phase: '稳定带货',
        duration: '持续',
        tasks: ['建立粉丝群', '优化选品', '提高转化率']
      }
    ],
    risks: [
      '竞争激烈',
      '退货率高',
      '身体消耗大',
      '收入极不稳定'
    ],
    advantages: [
      '变现快',
      '收入上限高',
      '门槛低',
      '个人能力提升快'
    ],
    cases: [
      {
        name: '小美',
        background: '导购员转行',
        result: '月入50000元，粉丝10万'
      }
    ],
    matchWeights: {
      skillWeight: 0.2,
      interestWeight: 0.35,
      resourceWeight: 0.2,
      timeWeight: 0.25
    }
  },
  {
    id: 'comic-creation',
    name: '漫画/插画创作',
    category: 'content',
    categoryName: '内容驱动型',
    description: '创作漫画、插画作品，通过平台连载、版权、周边变现',
    difficulty: 3,
    incomePotential: 4,
    startupCycle: '3-6个月',
    timeCommitment: '每天3-5小时',
    requirements: {
      hardSkills: ['绘画技巧', '故事创作', '漫画分镜', '数字绘画'],
      softSkills: ['创意', '坚持', '读者思维', '审美'],
      startupFund: '2000-10000元',
      equipment: ['数位板/平板', '绘画软件']
    },
    suitableFor: ['画师', '美术专业', '绘画爱好者', '创意工作者'],
    incomeRange: {
      beginner: '0-1000元/月',
      intermediate: '5000-15000元/月',
      expert: '30000-100000元/月'
    },
    roadmap: [
      {
        phase: '作品准备',
        duration: '1-2个月',
        tasks: ['创作作品集', '确定风格', '准备连载']
      },
      {
        phase: '平台入驻',
        duration: '1个月',
        tasks: ['选择平台', '开始连载', '积累读者']
      },
      {
        phase: '稳定创作',
        duration: '持续',
        tasks: ['保持更新', '读者互动', '开发周边']
      }
    ],
    risks: [
      '创作周期长',
      '收入不稳定',
      '版权保护难',
      '身体劳损'
    ],
    advantages: [
      '创作自由',
      '作品有版权价值',
      '粉丝忠诚度高',
      '可延伸IP'
    ],
    cases: [
      {
        name: '小画',
        background: '美院毕业，自由插画师',
        result: '月入20000元，出版画集'
      }
    ],
    matchWeights: {
      skillWeight: 0.45,
      interestWeight: 0.4,
      resourceWeight: 0.05,
      timeWeight: 0.1
    }
  },
  {
    id: 'music-creation',
    name: '音乐创作',
    category: 'content',
    categoryName: '内容驱动型',
    description: '创作原创音乐，通过版权、演出、平台分成变现',
    difficulty: 4,
    incomePotential: 4,
    startupCycle: '3-6个月',
    timeCommitment: '灵活',
    requirements: {
      hardSkills: ['作曲', '编曲', '乐器演奏', '录音混音'],
      softSkills: ['音乐审美', '创意', '坚持', '表达能力'],
      startupFund: '5000-20000元',
      equipment: ['乐器', '录音设备', '制作软件']
    },
    suitableFor: ['音乐人', '音乐专业', '乐器爱好者', '创作人'],
    incomeRange: {
      beginner: '0-1000元/月',
      intermediate: '3000-10000元/月',
      expert: '20000-100000元/月'
    },
    roadmap: [
      {
        phase: '作品积累',
        duration: '2-3个月',
        tasks: ['创作作品', '录音制作', '建立作品集']
      },
      {
        phase: '平台发布',
        duration: '1个月',
        tasks: ['上传音乐平台', '申请音乐人', '积累听众']
      },
      {
        phase: '商业变现',
        duration: '持续',
        tasks: ['版权授权', '商业合作', '演出活动']
      }
    ],
    risks: [
      '成功概率低',
      '收入不稳定',
      '盗版问题',
      '投入成本高'
    ],
    advantages: [
      '作品版权价值高',
      '被动收入',
      '艺术成就感',
      '可多平台分发'
    ],
    cases: [
      {
        name: '阿乐',
        background: '独立音乐人',
        result: '月入15000元，歌曲被电视剧采用'
      }
    ],
    matchWeights: {
      skillWeight: 0.5,
      interestWeight: 0.35,
      resourceWeight: 0.05,
      timeWeight: 0.1
    }
  },
  {
    id: 'photography-sharing',
    name: '摄影分享',
    category: 'content',
    categoryName: '内容驱动型',
    description: '在社交平台分享摄影作品和教程，通过广告、课程、约拍变现',
    difficulty: 2,
    incomePotential: 3,
    startupCycle: '2-4个月',
    timeCommitment: '业余时间',
    requirements: {
      hardSkills: ['摄影技术', '后期修图', '内容运营', '教学能力'],
      softSkills: ['审美', '表达', '持续输出', '互动'],
      startupFund: '0元',
      equipment: ['相机/手机']
    },
    suitableFor: ['摄影师', '摄影爱好者', '视觉工作者', '善于分享者'],
    incomeRange: {
      beginner: '0-500元/月',
      intermediate: '3000-8000元/月',
      expert: '15000-50000元/月'
    },
    roadmap: [
      {
        phase: '内容定位',
        duration: '1个月',
        tasks: ['确定风格定位', '选择平台', '发布作品']
      },
      {
        phase: '涨粉期',
        duration: '2-3个月',
        tasks: ['保持更新', '分享技巧', '互动交流']
      },
      {
        phase: '变现期',
        duration: '持续',
        tasks: ['接广告', '卖课程', '接约拍']
      }
    ],
    risks: [
      '涨粉慢',
      '内容创作压力大',
      '审美主观性强',
      '收入不稳定'
    ],
    advantages: [
      '零成本启动',
      '提升摄影水平',
      '建立个人品牌',
      '多种变现方式'
    ],
    cases: [
      {
        name: '光影君',
        background: '摄影爱好者',
        result: '小红书5万粉，月入8000元'
      }
    ],
    matchWeights: {
      skillWeight: 0.35,
      interestWeight: 0.4,
      resourceWeight: 0.1,
      timeWeight: 0.15
    }
  },
  {
    id: 'food-blogger',
    name: '美食博主',
    category: 'content',
    categoryName: '内容驱动型',
    description: '分享美食探店、烹饪教程、美食测评等内容变现',
    difficulty: 2,
    incomePotential: 4,
    startupCycle: '2-4个月',
    timeCommitment: '业余时间',
    requirements: {
      hardSkills: ['美食摄影', '视频制作', '文案写作', '平台运营'],
      softSkills: ['美食审美', '表达', '探索精神', '坚持'],
      startupFund: '0-1000元',
      equipment: ['手机', '简单的拍摄设备']
    },
    suitableFor: ['美食爱好者', '喜欢做饭的人', '吃货', '善于分享者'],
    incomeRange: {
      beginner: '0-500元/月',
      intermediate: '3000-10000元/月',
      expert: '20000-50000元/月'
    },
    roadmap: [
      {
        phase: '定位启动',
        duration: '1个月',
        tasks: ['确定细分领域', '拍摄首批内容', '选择平台']
      },
      {
        phase: '涨粉期',
        duration: '2-3个月',
        tasks: ['保持更新', '探店分享', '互动涨粉']
      },
      {
        phase: '变现期',
        duration: '持续',
        tasks: ['接餐厅广告', '带货食材', '付费探店']
      }
    ],
    risks: [
      '探店成本高',
      '同质化严重',
      '收入不稳定',
      '健康问题'
    ],
    advantages: [
      '兴趣变现',
      '享受美食',
      '门槛低',
      '变现方式多'
    ],
    cases: [
      {
        name: '吃货小王',
        background: '热爱美食的上班族',
        result: '10万粉，月入15000元'
      }
    ],
    matchWeights: {
      skillWeight: 0.2,
      interestWeight: 0.45,
      resourceWeight: 0.15,
      timeWeight: 0.2
    }
  },
  {
    id: 'community-operation',
    name: '知识社群运营',
    category: 'content',
    categoryName: '内容驱动型',
    description: '运营付费知识社群，提供干货内容和交流平台',
    difficulty: 3,
    incomePotential: 4,
    startupCycle: '2-4个月',
    timeCommitment: '每天1-2小时',
    requirements: {
      hardSkills: ['社群运营', '内容策划', '用户管理', '活动策划'],
      softSkills: ['组织能力', '沟通能力', '影响力', '责任心'],
      startupFund: '0-1000元',
      equipment: ['手机', '电脑']
    },
    suitableFor: ['有专业知识者', '善于组织者', '有影响力者', '愿意分享者'],
    incomeRange: {
      beginner: '0-1000元/月',
      intermediate: '3000-10000元/月',
      expert: '20000-50000元/月'
    },
    roadmap: [
      {
        phase: '定位筹备',
        duration: '1个月',
        tasks: ['确定社群主题', '设计权益', '准备内容']
      },
      {
        phase: '种子用户',
        duration: '1-2个月',
        tasks: ['免费试运营', '积累口碑', '迭代优化']
      },
      {
        phase: '付费转化',
        duration: '持续',
        tasks: ['开启付费', '持续运营', '扩大规模']
      }
    ],
    risks: [
      '用户留存难',
      '运营工作量大',
      '用户期望管理',
      '变现周期长'
    ],
    advantages: [
      '复购率高',
      '用户粘性强',
      '被动收入',
      '个人品牌提升'
    ],
    cases: [
      {
        name: '小马',
        background: '产品经理，运营社群',
        result: '知识社群月入15000元'
      }
    ],
    matchWeights: {
      skillWeight: 0.3,
      interestWeight: 0.35,
      resourceWeight: 0.15,
      timeWeight: 0.2
    }
  },
  
  // ========== 资源信息差型 (10种) ==========
  {
    id: 'ecommerce-selection',
    name: '电商选品/无货源',
    category: 'resource',
    categoryName: '资源信息差型',
    description: '通过信息差选品，在电商平台销售赚取差价',
    difficulty: 3,
    incomePotential: 4,
    startupCycle: '1-2个月',
    timeCommitment: '每天2-4小时',
    requirements: {
      hardSkills: ['选品分析', '数据分析', '平台运营', '供应链管理'],
      softSkills: ['商业嗅觉', '风险控制', '学习能力'],
      startupFund: '3000-10000元',
      equipment: ['电脑', '手机']
    },
    suitableFor: ['有商业敏感度', '能接受风险', '有时间投入'],
    incomeRange: {
      beginner: '1000-3000元/月',
      intermediate: '5000-15000元/月',
      expert: '20000-50000元/月'
    },
    roadmap: [
      {
        phase: '学习准备',
        duration: '2周',
        tasks: ['学习平台规则', '研究选品方法', '准备启动资金']
      },
      {
        phase: '测试起店',
        duration: '1-2个月',
        tasks: ['小批量测试', '优化选品', '积累评价']
      },
      {
        phase: '规模化',
        duration: '3个月+',
        tasks: ['扩大SKU', '优化供应链', '多平台布局']
      }
    ],
    risks: [
      '库存积压风险',
      '平台规则变化',
      '价格战',
      '退货售后问题'
    ],
    advantages: [
      '启动资金相对较低',
      '可快速验证',
      '上限高',
      '时间自由'
    ],
    cases: [
      {
        name: '小李',
        background: '普通上班族',
        result: '月入8000元，副业稳定'
      }
    ],
    matchWeights: {
      skillWeight: 0.3,
      interestWeight: 0.2,
      resourceWeight: 0.35,
      timeWeight: 0.15
    }
  },
  {
    id: 'coupon-flip',
    name: '优惠券/羊毛信息',
    category: 'resource',
    categoryName: '资源信息差型',
    description: '收集整理优惠信息，通过返利或社群变现',
    difficulty: 2,
    incomePotential: 3,
    startupCycle: '即时',
    timeCommitment: '灵活',
    requirements: {
      hardSkills: ['信息搜集', '社群运营', '数据分析'],
      softSkills: ['信息敏感度', '执行力'],
      startupFund: '0-500元',
      equipment: ['手机']
    },
    suitableFor: ['喜欢购物', '时间碎片', '愿意分享'],
    incomeRange: {
      beginner: '500-2000元/月',
      intermediate: '3000-8000元/月',
      expert: '10000-30000元/月'
    },
    roadmap: [
      {
        phase: '建立渠道',
        duration: '1个月',
        tasks: ['加入返利平台', '建立社群', '积累种子用户']
      },
      {
        phase: '内容输出',
        duration: '持续',
        tasks: ['每日更新优惠信息', '维护社群活跃', '优化选品']
      },
      {
        phase: '变现优化',
        duration: '持续',
        tasks: ['多渠道变现', '精细化运营', '扩大规模']
      }
    ],
    risks: [
      '收入不稳定',
      '竞争激烈',
      '需要持续投入时间',
      '平台政策风险'
    ],
    advantages: [
      '零门槛',
      '即时开始',
      '时间灵活',
      '复利效应'
    ],
    cases: [
      {
        name: '小王',
        background: '宝妈，时间灵活',
        result: '月入5000元'
      }
    ],
    matchWeights: {
      skillWeight: 0.2,
      interestWeight: 0.2,
      resourceWeight: 0.45,
      timeWeight: 0.15
    }
  },
  {
    id: 'dropshipping',
    name: '跨境电商代发',
    category: 'resource',
    categoryName: '资源信息差型',
    description: '无需囤货，通过信息差在跨境平台销售商品，供应商直接发货',
    difficulty: 3,
    incomePotential: 5,
    startupCycle: '1-2个月',
    timeCommitment: '每天2-4小时',
    requirements: {
      hardSkills: ['选品分析', '平台运营', '英文基础', '数据分析'],
      softSkills: ['商业嗅觉', '风险控制', '学习能力'],
      startupFund: '3000-10000元',
      equipment: ['电脑']
    },
    suitableFor: ['有电商兴趣者', '会基础英文者', '有资金者', '愿意学习者'],
    incomeRange: {
      beginner: '0-3000元/月',
      intermediate: '8000-30000元/月',
      expert: '50000-200000元/月'
    },
    roadmap: [
      {
        phase: '学习准备',
        duration: '1个月',
        tasks: ['学习平台规则', '研究选品', '了解物流']
      },
      {
        phase: '开店测试',
        duration: '1个月',
        tasks: ['注册店铺', '上架产品', '小批量测试']
      },
      {
        phase: '规模运营',
        duration: '持续',
        tasks: ['优化选品', '扩大规模', '建立供应链']
      }
    ],
    risks: [
      '平台规则风险',
      '物流问题',
      '竞争激烈',
      '资金占用'
    ],
    advantages: [
      '无需囤货',
      '市场广阔',
      '收入上限高',
      '可规模化'
    ],
    cases: [
      {
        name: '李先生',
        background: '外贸从业者',
        result: '副业月入50000元'
      }
    ],
    matchWeights: {
      skillWeight: 0.3,
      interestWeight: 0.2,
      resourceWeight: 0.35,
      timeWeight: 0.15
    }
  },
  {
    id: 'stock-trading',
    name: '股票投资',
    category: 'resource',
    categoryName: '资源信息差型',
    description: '利用信息和分析能力进行股票投资，获取资本收益',
    difficulty: 4,
    incomePotential: 5,
    startupCycle: '即时',
    timeCommitment: '灵活',
    requirements: {
      hardSkills: ['财务分析', '技术分析', '宏观研究', '风险控制'],
      softSkills: ['理性决策', '抗压能力', '学习能力', '耐心'],
      startupFund: '10000元以上',
      equipment: ['手机/电脑']
    },
    suitableFor: ['有资金者', '懂金融者', '理性投资者', '有风险承受力者'],
    incomeRange: {
      beginner: '亏损-3000元/月',
      intermediate: '3000-10000元/月',
      expert: '20000-100000元/月'
    },
    roadmap: [
      {
        phase: '学习阶段',
        duration: '3-6个月',
        tasks: ['学习投资知识', '模拟交易', '小额实盘']
      },
      {
        phase: '实盘操作',
        duration: '持续',
        tasks: ['制定策略', '严格执行', '复盘总结']
      }
    ],
    risks: [
      '本金亏损风险',
      '市场系统性风险',
      '情绪控制难',
      '信息不对称'
    ],
    advantages: [
      '时间灵活',
      '资金门槛低',
      '流动性好',
      '学习提升认知'
    ],
    cases: [
      {
        name: '张先生',
        background: '程序员，自学投资',
        result: '年收益20%，月入8000元'
      }
    ],
    matchWeights: {
      skillWeight: 0.4,
      interestWeight: 0.1,
      resourceWeight: 0.3,
      timeWeight: 0.2
    }
  },
  {
    id: 'secondhand-trading',
    name: '二手交易',
    category: 'resource',
    categoryName: '资源信息差型',
    description: '在二手平台买卖闲置物品或低买高卖赚取差价',
    difficulty: 2,
    incomePotential: 3,
    startupCycle: '即时',
    timeCommitment: '业余时间',
    requirements: {
      hardSkills: ['选品能力', '定价策略', '平台运营', '谈判技巧'],
      softSkills: ['商业嗅觉', '诚信', '耐心'],
      startupFund: '1000-5000元',
      equipment: ['手机']
    },
    suitableFor: ['有闲置物品者', '喜欢淘货者', '善于发现价值者'],
    incomeRange: {
      beginner: '500-2000元/月',
      intermediate: '3000-8000元/月',
      expert: '15000元+/月'
    },
    roadmap: [
      {
        phase: '清理闲置',
        duration: '即时',
        tasks: ['整理闲置物品', '拍照上架', '完成首批交易']
      },
      {
        phase: '小批量倒卖',
        duration: '持续',
        tasks: ['寻找低价货源', '翻新清洁', '加价出售']
      },
      {
        phase: '专业经营',
        duration: '持续',
        tasks: ['专注细分领域', '建立货源', '规模化']
      }
    ],
    risks: [
      '假货风险',
      '交易纠纷',
      '压货风险',
      '利润薄'
    ],
    advantages: [
      '零门槛',
      '环保副业',
      '锻炼商业能力',
      '资金周转快'
    ],
    cases: [
      {
        name: '小李',
        background: '大学生，喜欢淘货',
        result: '倒卖潮鞋月入5000元'
      }
    ],
    matchWeights: {
      skillWeight: 0.2,
      interestWeight: 0.25,
      resourceWeight: 0.35,
      timeWeight: 0.2
    }
  },
  {
    id: 'information-arbitrage',
    name: '信息差套利',
    category: 'resource',
    categoryName: '资源信息差型',
    description: '利用信息不对称，低买高卖赚取差价',
    difficulty: 2,
    incomePotential: 4,
    startupCycle: '即时',
    timeCommitment: '灵活',
    requirements: {
      hardSkills: ['信息收集', '市场分析', '渠道搭建', '谈判能力'],
      softSkills: ['商业敏感', '执行力', '诚信'],
      startupFund: '1000-10000元',
      equipment: ['手机', '电脑']
    },
    suitableFor: ['信息敏感者', '有渠道资源者', '善于发现机会者'],
    incomeRange: {
      beginner: '1000-3000元/月',
      intermediate: '5000-15000元/月',
      expert: '30000元+/月'
    },
    roadmap: [
      {
        phase: '发现机会',
        duration: '1个月',
        tasks: ['研究价格差异', '寻找供需不匹配', '验证可行性']
      },
      {
        phase: '建立渠道',
        duration: '1-2个月',
        tasks: ['找上游货源', '找下游买家', '建立信任']
      },
      {
        phase: '稳定套利',
        duration: '持续',
        tasks: ['批量操作', '优化流程', '扩大规模']
      }
    ],
    risks: [
      '信息不对称消失',
      '货源不稳定',
      '竞争进入',
      '法律风险'
    ],
    advantages: [
      '零技能门槛',
      '变现快',
      '锻炼商业思维',
      '灵活性强'
    ],
    cases: [
      {
        name: '小王',
        background: '善于发现信息差',
        result: '倒卖稀缺商品月入10000元'
      }
    ],
    matchWeights: {
      skillWeight: 0.15,
      interestWeight: 0.15,
      resourceWeight: 0.5,
      timeWeight: 0.2
    }
  },
  {
    id: 'domain-flip',
    name: '域名投资',
    category: 'resource',
    categoryName: '资源信息差型',
    description: '注册或收购有潜力的域名，待升值后出售',
    difficulty: 3,
    incomePotential: 4,
    startupCycle: '6-12个月+',
    timeCommitment: '业余时间',
    requirements: {
      hardSkills: ['域名知识', '趋势判断', '估值能力', '交易平台'],
      softSkills: ['商业眼光', '耐心', '风险承受'],
      startupFund: '1000-10000元',
      equipment: ['电脑']
    },
    suitableFor: ['互联网从业者', '有商业眼光者', '有耐心者'],
    incomeRange: {
      beginner: '0-1000元/月',
      intermediate: '3000-10000元/月',
      expert: '50000元+/月'
    },
    roadmap: [
      {
        phase: '学习研究',
        duration: '1-2个月',
        tasks: ['学习域名知识', '研究交易市场', '关注行业趋势']
      },
      {
        phase: '小额试水',
        duration: '3个月',
        tasks: ['注册域名', '小额投资', '学习交易']
      },
      {
        phase: '持续投资',
        duration: '长期',
        tasks: ['域名组合投资', '等待升值', '择机出售']
      }
    ],
    risks: [
      '域名砸手里',
      '政策风险',
      '估值困难',
      '资金占用'
    ],
    advantages: [
      '被动持有',
      '潜在收益高',
      '时间自由',
      '低维护成本'
    ],
    cases: [
      {
        name: '陈先生',
        background: '域名投资者',
        result: '域名转手赚50000元'
      }
    ],
    matchWeights: {
      skillWeight: 0.25,
      interestWeight: 0.1,
      resourceWeight: 0.45,
      timeWeight: 0.2
    }
  },
  {
    id: 'event-ticket',
    name: '票务代理',
    category: 'resource',
    categoryName: '资源信息差型',
    description: '利用渠道优势，代理销售热门演唱会、活动门票',
    difficulty: 2,
    incomePotential: 4,
    startupCycle: '1个月',
    timeCommitment: '活动期间',
    requirements: {
      hardSkills: ['渠道资源', '抢票技术', '客户管理'],
      softSkills: ['商业敏感', '诚信', '快速响应'],
      startupFund: '5000-50000元',
      equipment: ['手机', '电脑']
    },
    suitableFor: ['有票务渠道者', '熟悉演出市场者', '执行力强者'],
    incomeRange: {
      beginner: '1000-3000元/月',
      intermediate: '5000-20000元/月',
      expert: '50000元+/月'
    },
    roadmap: [
      {
        phase: '建立渠道',
        duration: '1个月',
        tasks: ['寻找票务渠道', '了解市场', '建立客户群']
      },
      {
        phase: '运营接单',
        duration: '持续',
        tasks: ['关注演出信息', '抢票代抢', '加价出售']
      }
    ],
    risks: [
      '政策风险',
      '假票风险',
      '市场波动',
      '资金占用'
    ],
    advantages: [
      '高利润',
      '市场需求大',
      '灵活性强',
      '资金周转快'
    ],
    cases: [
      {
        name: '小张',
        background: '音乐爱好者，有渠道',
        result: '演唱会票务月入20000元'
      }
    ],
    matchWeights: {
      skillWeight: 0.15,
      interestWeight: 0.15,
      resourceWeight: 0.5,
      timeWeight: 0.2
    }
  },
  {
    id: 'group-buying',
    name: '团购/拼单',
    category: 'resource',
    categoryName: '资源信息差型',
    description: '组织团购获取批发价，赚取差价或佣金',
    difficulty: 2,
    incomePotential: 3,
    startupCycle: '1个月',
    timeCommitment: '业余时间',
    requirements: {
      hardSkills: ['选品能力', '社群运营', '物流管理', '客户服务'],
      softSkills: ['组织能力', '诚信', '责任心'],
      startupFund: '1000-5000元',
      equipment: ['手机']
    },
    suitableFor: ['有社群资源者', '善于组织者', '有货源渠道者'],
    incomeRange: {
      beginner: '500-2000元/月',
      intermediate: '3000-8000元/月',
      expert: '15000元+/月'
    },
    roadmap: [
      {
        phase: '建立社群',
        duration: '1个月',
        tasks: ['确定目标群体', '建立微信群', '积累种子用户']
      },
      {
        phase: '开团测试',
        duration: '1个月',
        tasks: ['寻找货源', '组织首批团购', '积累口碑']
      },
      {
        phase: '稳定运营',
        duration: '持续',
        tasks: ['定期开团', '维护社群', '优化选品']
      }
    ],
    risks: [
      '质量问题纠纷',
      '物流风险',
      '售后压力',
      '竞争激烈'
    ],
    advantages: [
      '低成本启动',
      '社群粘性强',
      '复购率高',
      '锻炼组织能力'
    ],
    cases: [
      {
        name: '小美',
        background: '宝妈，有妈妈群资源',
        result: '团购母婴用品月入6000元'
      }
    ],
    matchWeights: {
      skillWeight: 0.2,
      interestWeight: 0.15,
      resourceWeight: 0.45,
      timeWeight: 0.2
    }
  },
  {
    id: 'data-collection',
    name: '数据采集',
    category: 'resource',
    categoryName: '资源信息差型',
    description: '为企业或个人提供数据采集、整理、标注服务',
    difficulty: 2,
    incomePotential: 3,
    startupCycle: '即时',
    timeCommitment: '灵活',
    requirements: {
      hardSkills: ['数据工具', 'Excel', '网络基础', '脚本能力'],
      softSkills: ['细致', '耐心', '责任心'],
      startupFund: '0元',
      equipment: ['电脑']
    },
    suitableFor: ['有技术基础者', '细致耐心者', '时间充裕者'],
    incomeRange: {
      beginner: '1000-3000元/月',
      intermediate: '5000-10000元/月',
      expert: '20000元+/月'
    },
    roadmap: [
      {
        phase: '技能准备',
        duration: '2周',
        tasks: ['学习数据工具', '练习采集技能', '准备作品']
      },
      {
        phase: '平台接单',
        duration: '1个月',
        tasks: ['注册数据平台', '接小单练手', '积累经验']
      },
      {
        phase: '稳定合作',
        duration: '持续',
        tasks: ['建立客户', '提高效率', '选择性接单']
      }
    ],
    risks: [
      '单价低',
      '工作量大',
      'AI替代风险',
      '枯燥重复'
    ],
    advantages: [
      '零门槛',
      '时间灵活',
      '可在家工作',
      '技能可迁移'
    ],
    cases: [
      {
        name: '小刘',
        background: '大学生，时间灵活',
        result: '数据采集月入4000元'
      }
    ],
    matchWeights: {
      skillWeight: 0.35,
      interestWeight: 0.1,
      resourceWeight: 0.3,
      timeWeight: 0.25
    }
  },
  
  // ========== 社交人脉型 (10种) ==========
  {
    id: 'headhunting',
    name: '猎头/人才推荐',
    category: 'network',
    categoryName: '社交人脉型',
    description: '利用人脉资源，为企业推荐合适人才，赚取推荐费',
    difficulty: 3,
    incomePotential: 5,
    startupCycle: '1-3个月',
    timeCommitment: '灵活，项目制',
    requirements: {
      hardSkills: ['人才评估', '行业认知', '沟通谈判', '招聘流程'],
      softSkills: ['人脉维护', '信任建立', '商业敏感度'],
      startupFund: '0-1000元',
      equipment: ['手机', 'LinkedIn']
    },
    suitableFor: ['HR背景', '行业人脉广', '善于社交'],
    incomeRange: {
      beginner: '2000-5000元/月',
      intermediate: '10000-30000元/月',
      expert: '50000-200000元/月'
    },
    roadmap: [
      {
        phase: '资源盘点',
        duration: '1个月',
        tasks: ['盘点人脉资源', '确定目标行业', '建立人才库']
      },
      {
        phase: '渠道建立',
        duration: '1-2个月',
        tasks: ['对接企业需求', '建立合作模式', '小单试水']
      },
      {
        phase: '持续运营',
        duration: '长期',
        tasks: ['维护人脉', '扩大网络', '提高成单率']
      }
    ],
    risks: [
      '成单周期长',
      '依赖人脉质量',
      '跳单风险',
      '需要持续维护关系'
    ],
    advantages: [
      '人脉变现',
      '成单后收入高',
      '帮助他人',
      '积累行业资源'
    ],
    cases: [
      {
        name: '张先生',
        background: 'HR总监',
        result: '副业月入20000元'
      }
    ],
    matchWeights: {
      skillWeight: 0.25,
      interestWeight: 0.2,
      resourceWeight: 0.4,
      timeWeight: 0.15
    }
  },
  {
    id: 'business-broker',
    name: '商务撮合/中介',
    category: 'network',
    categoryName: '社交人脉型',
    description: '连接供需双方，促成交易，赚取佣金',
    difficulty: 4,
    incomePotential: 5,
    startupCycle: '3-6个月',
    timeCommitment: '灵活',
    requirements: {
      hardSkills: ['行业认知', '商务谈判', '项目管理'],
      softSkills: ['人脉运营', '信任建立', '资源整合'],
      startupFund: '0-5000元',
      equipment: ['手机', '电脑']
    },
    suitableFor: ['商务背景', '人脉广泛', '善于撮合'],
    incomeRange: {
      beginner: '3000-8000元/月',
      intermediate: '15000-40000元/月',
      expert: '50000-200000元/月'
    },
    roadmap: [
      {
        phase: '资源梳理',
        duration: '1-2个月',
        tasks: ['盘点人脉资源', '确定撮合方向', '建立初步联系']
      },
      {
        phase: '模式验证',
        duration: '2-3个月',
        tasks: ['小单试水', '验证模式', '建立信任']
      },
      {
        phase: '规模化',
        duration: '持续',
        tasks: ['扩大网络', '专业化', '品牌建设']
      }
    ],
    risks: [
      '跳单风险高',
      '依赖个人信用',
      '成单不确定',
      '法律合规风险'
    ],
    advantages: [
      '人脉变现',
      '收入天花板高',
      '积累资源',
      '工作灵活'
    ],
    cases: [
      {
        name: '李先生',
        background: '销售总监',
        result: '撮合交易月入30000元'
      }
    ],
    matchWeights: {
      skillWeight: 0.2,
      interestWeight: 0.2,
      resourceWeight: 0.45,
      timeWeight: 0.15
    }
  },
  {
    id: 'insurance-agent',
    name: '保险代理',
    category: 'network',
    categoryName: '社交人脉型',
    description: '代理销售保险产品，赚取佣金',
    difficulty: 2,
    incomePotential: 4,
    startupCycle: '1个月',
    timeCommitment: '灵活',
    requirements: {
      hardSkills: ['保险知识', '产品理解', '需求分析', '合规要求'],
      softSkills: ['沟通能力', '信任建立', '抗压能力', '同理心'],
      startupFund: '0-1000元（考证）',
      equipment: ['手机']
    },
    suitableFor: ['有人脉资源者', '口才好', '善于沟通者', '有耐心者'],
    incomeRange: {
      beginner: '0-3000元/月',
      intermediate: '8000-20000元/月',
      expert: '50000-200000元/月'
    },
    roadmap: [
      {
        phase: '考证培训',
        duration: '1个月',
        tasks: ['考取保险从业证', '学习产品知识', '了解合规要求']
      },
      {
        phase: '缘故市场',
        duration: '2-3个月',
        tasks: ['服务亲友', '积累经验', '建立口碑']
      },
      {
        phase: '转介绍',
        duration: '持续',
        tasks: ['客户转介绍', '专业服务', '持续出单']
      }
    ],
    risks: [
      '社会认可度低',
      '收入不稳定',
      '客户拒绝率高',
      '业绩压力大'
    ],
    advantages: [
      '收入无上限',
      '时间自由',
      '人脉变现',
      '长期复利'
    ],
    cases: [
      {
        name: '王女士',
        background: '前HR，人脉广泛',
        result: '保险代理月入30000元'
      }
    ],
    matchWeights: {
      skillWeight: 0.2,
      interestWeight: 0.2,
      resourceWeight: 0.4,
      timeWeight: 0.2
    }
  },
  {
    id: 'real-estate-agent',
    name: '房产中介',
    category: 'network',
    categoryName: '社交人脉型',
    description: '撮合房产交易，赚取佣金',
    difficulty: 3,
    incomePotential: 5,
    startupCycle: '1-2个月',
    timeCommitment: '灵活但需配合客户',
    requirements: {
      hardSkills: ['房产知识', '市场分析', '法律法规', '谈判技巧'],
      softSkills: ['沟通能力', '服务意识', '抗压能力', '诚信'],
      startupFund: '0元',
      equipment: ['手机', '电动车/车']
    },
    suitableFor: ['本地人', '有房源资源者', '善于沟通者', '时间灵活者'],
    incomeRange: {
      beginner: '0-5000元/月',
      intermediate: '10000-50000元/月',
      expert: '100000-500000元/月'
    },
    roadmap: [
      {
        phase: '入行学习',
        duration: '1个月',
        tasks: ['学习房产知识', '熟悉区域房源', '了解交易流程']
      },
      {
        phase: '积累客户',
        duration: '2-3个月',
        tasks: ['朋友圈推广', '带看房源', '积累意向客户']
      },
      {
        phase: '成交出单',
        duration: '持续',
        tasks: ['撮合交易', '跟进服务', '口碑转介绍']
      }
    ],
    risks: [
      '收入极不稳定',
      '市场波动大',
      '客户跳单',
      '政策风险'
    ],
    advantages: [
      '收入上限高',
      '时间相对自由',
      '锻炼综合能力',
      '积累人脉资源'
    ],
    cases: [
      {
        name: '李先生',
        background: '本地人，熟悉房产',
        result: '房产中介月入80000元'
      }
    ],
    matchWeights: {
      skillWeight: 0.25,
      interestWeight: 0.15,
      resourceWeight: 0.4,
      timeWeight: 0.2
    }
  },
  {
    id: 'wedding-planner',
    name: '婚礼策划',
    category: 'network',
    categoryName: '社交人脉型',
    description: '为新人提供婚礼策划、统筹、执行服务',
    difficulty: 3,
    incomePotential: 4,
    startupCycle: '2-3个月',
    timeCommitment: '周末为主',
    requirements: {
      hardSkills: ['策划能力', '项目管理', '审美设计', '供应商管理'],
      softSkills: ['沟通能力', '细心', '抗压能力', '服务意识'],
      startupFund: '0-2000元',
      equipment: ['手机', '电脑']
    },
    suitableFor: ['细心者', '有审美', '善于沟通', '喜欢婚礼行业者'],
    incomeRange: {
      beginner: '1000-3000元/月',
      intermediate: '5000-15000元/月',
      expert: '30000元+/月'
    },
    roadmap: [
      {
        phase: '学习积累',
        duration: '2个月',
        tasks: ['学习婚礼知识', '参加婚礼观摩', '建立供应商资源']
      },
      {
        phase: '接单试水',
        duration: '2个月',
        tasks: ['低价接单', '积累经验', '建立口碑']
      },
      {
        phase: '稳定经营',
        duration: '持续',
        tasks: ['专业策划', '品质服务', '口碑转介绍']
      }
    ],
    risks: [
      '时间不规律',
      '压力大',
      '客户要求高',
      '供应商依赖'
    ],
    advantages: [
      '见证幸福',
      '创意发挥',
      '收入可观',
      '人脉拓展'
    ],
    cases: [
      {
        name: '小美',
        background: '设计专业，喜欢婚礼',
        result: '婚礼策划月入15000元'
      }
    ],
    matchWeights: {
      skillWeight: 0.3,
      interestWeight: 0.25,
      resourceWeight: 0.3,
      timeWeight: 0.15
    }
  },
  {
    id: 'beauty-consultant',
    name: '美妆顾问',
    category: 'network',
    categoryName: '社交人脉型',
    description: '为品牌或朋友推荐美妆产品，赚取佣金或差价',
    difficulty: 2,
    incomePotential: 4,
    startupCycle: '即时',
    timeCommitment: '灵活',
    requirements: {
      hardSkills: ['美妆知识', '产品了解', '销售技巧', '社媒运营'],
      softSkills: ['审美', '沟通', '影响力', '信任建立'],
      startupFund: '0-3000元',
      equipment: ['手机']
    },
    suitableFor: ['美妆爱好者', '有影响力者', '善于分享者', '女性朋友多者'],
    incomeRange: {
      beginner: '500-2000元/月',
      intermediate: '5000-15000元/月',
      expert: '30000-100000元/月'
    },
    roadmap: [
      {
        phase: '建立信任',
        duration: '1个月',
        tasks: ['分享美妆心得', '推荐好产品', '建立个人形象']
      },
      {
        phase: '寻找货源',
        duration: '1个月',
        tasks: ['联系品牌/代购', '谈佣金合作', '确定产品线']
      },
      {
        phase: '持续变现',
        duration: '持续',
        tasks: ['日常推荐', '社群运营', '活动促销']
      }
    ],
    risks: [
      '产品风险',
      '信任危机',
      '竞争激烈',
      '政策风险'
    ],
    advantages: [
      '兴趣变现',
      '零门槛',
      '时间自由',
      '社交属性强'
    ],
    cases: [
      {
        name: '小美',
        background: '美妆爱好者，朋友多',
        result: '美妆分销月入10000元'
      }
    ],
    matchWeights: {
      skillWeight: 0.2,
      interestWeight: 0.35,
      resourceWeight: 0.3,
      timeWeight: 0.15
    }
  },
  {
    id: 'fitness-coach',
    name: '健身教练',
    category: 'network',
    categoryName: '社交人脉型',
    description: '提供私人健身指导、陪练、线上健身课程',
    difficulty: 3,
    incomePotential: 4,
    startupCycle: '1-2个月',
    timeCommitment: '课余时间',
    requirements: {
      hardSkills: ['健身知识', '训练方法', '营养知识', '急救知识'],
      softSkills: ['激励能力', '沟通', '耐心', '责任心'],
      startupFund: '2000-5000元（考证）',
      equipment: ['运动装备', '可能需场地']
    },
    suitableFor: ['健身爱好者', '有证书者', '身材好者', '善于激励者'],
    incomeRange: {
      beginner: '2000-5000元/月',
      intermediate: '8000-20000元/月',
      expert: '50000元+/月'
    },
    roadmap: [
      {
        phase: '资质准备',
        duration: '1-2个月',
        tasks: ['考取教练证', '提升自身水平', '学习教学']
      },
      {
        phase: '获客启动',
        duration: '2个月',
        tasks: ['健身房兼职', '朋友圈推广', '低价引流']
      },
      {
        phase: '稳定授课',
        duration: '持续',
        tasks: ['建立私教客户', '提高单价', '开发线上课程']
      }
    ],
    risks: [
      '身体损耗',
      '时间受限',
      '收入不稳定',
      '责任风险'
    ],
    advantages: [
      '健康生活方式',
      '收入可观',
      '自我提升',
      '社交拓展'
    ],
    cases: [
      {
        name: '阿杰',
        background: '健身5年，有教练证',
        result: '私教月入25000元'
      }
    ],
    matchWeights: {
      skillWeight: 0.4,
      interestWeight: 0.3,
      resourceWeight: 0.15,
      timeWeight: 0.15
    }
  },
  {
    id: 'tour-guide',
    name: '私人导游',
    category: 'network',
    categoryName: '社交人脉型',
    description: '为游客提供个性化导游服务，讲解当地文化美食',
    difficulty: 2,
    incomePotential: 3,
    startupCycle: '1个月',
    timeCommitment: '周末/假期',
    requirements: {
      hardSkills: ['本地知识', '讲解能力', '路线规划', '语言能力'],
      softSkills: ['热情', '沟通', '应变', '服务意识'],
      startupFund: '0元',
      equipment: ['手机']
    },
    suitableFor: ['本地人', '熟悉城市者', '喜欢社交者', '周末有空者'],
    incomeRange: {
      beginner: '500-2000元/月',
      intermediate: '3000-8000元/月',
      expert: '15000元+/月'
    },
    roadmap: [
      {
        phase: '知识准备',
        duration: '1个月',
        tasks: ['深入了解城市', '设计特色路线', '准备讲解词']
      },
      {
        phase: '平台入驻',
        duration: '1个月',
        tasks: ['入驻导游平台', '发布服务', '接首批订单']
      },
      {
        phase: '口碑积累',
        duration: '持续',
        tasks: ['优质服务', '好评积累', '回头客']
      }
    ],
    risks: [
      '收入不稳定',
      '时间受限',
      '体力消耗',
      '安全责任'
    ],
    advantages: [
      '分享热爱',
      '结识朋友',
      '锻炼身体',
      '灵活时间'
    ],
    cases: [
      {
        name: '小陈',
        background: '本地通，喜欢美食',
        result: '周末导游月入5000元'
      }
    ],
    matchWeights: {
      skillWeight: 0.25,
      interestWeight: 0.35,
      resourceWeight: 0.25,
      timeWeight: 0.15
    }
  },
  {
    id: 'event-host',
    name: '活动主持',
    category: 'network',
    categoryName: '社交人脉型',
    description: '为婚礼、活动、商演等提供主持服务',
    difficulty: 2,
    incomePotential: 3,
    startupCycle: '1-2个月',
    timeCommitment: '周末为主',
    requirements: {
      hardSkills: ['主持技巧', '控场能力', '应变能力', '文案撰写'],
      softSkills: ['台风', '亲和力', '自信', '抗压'],
      startupFund: '0-1000元（服装）',
      equipment: ['正装', '可能需车辆']
    },
    suitableFor: ['口才好', '有台风者', '敢于表现', '周末有空者'],
    incomeRange: {
      beginner: '500-2000元/月',
      intermediate: '3000-10000元/月',
      expert: '20000元+/月'
    },
    roadmap: [
      {
        phase: '技能准备',
        duration: '1个月',
        tasks: ['学习主持技巧', '准备主持词', '录视频练习']
      },
      {
        phase: '低价接单',
        duration: '2个月',
        tasks: ['朋友圈推广', '低价接单', '积累视频']
      },
      {
        phase: '专业发展',
        duration: '持续',
        tasks: ['建立风格', '提高报价', '拓展渠道']
      }
    ],
    risks: [
      '时间受限',
      '收入不稳定',
      '体力消耗',
      '临场压力大'
    ],
    advantages: [
      '锻炼口才',
      '收入可观',
      '社交拓展',
      '成就感强'
    ],
    cases: [
      {
        name: '小林',
        background: '播音主持专业',
        result: '活动主持月入8000元'
      }
    ],
    matchWeights: {
      skillWeight: 0.3,
      interestWeight: 0.3,
      resourceWeight: 0.2,
      timeWeight: 0.2
    }
  },
  {
    id: 'talent-agent',
    name: '艺人经纪',
    category: 'network',
    categoryName: '社交人脉型',
    description: '为艺人对接演出、代言、活动资源，赚取经纪费',
    difficulty: 3,
    incomePotential: 5,
    startupCycle: '3-6个月',
    timeCommitment: '灵活但需随时响应',
    requirements: {
      hardSkills: ['行业资源', '谈判能力', '合同管理', '公关能力'],
      softSkills: ['人脉广泛', '商业敏锐', '抗压', '诚信'],
      startupFund: '0元',
      equipment: ['手机']
    },
    suitableFor: ['娱乐圈人脉广', '善于交际', '有资源者', '愿意投入者'],
    incomeRange: {
      beginner: '0-3000元/月',
      intermediate: '10000-50000元/月',
      expert: '100000-500000元/月'
    },
    roadmap: [
      {
        phase: '资源积累',
        duration: '3个月',
        tasks: ['拓展艺人资源', '建立甲方关系', '了解行业']
      },
      {
        phase: '首单成交',
        duration: '3个月',
        tasks: '匹配需求', '撮合交易', '建立口碑']
      },
      {
        phase: '稳定经营',
        duration: '持续',
        tasks: ['艺人孵化', '商务拓展', '专业化运营']
      }
    ],
    risks: [
      '跳单风险高',
      '依赖人脉',
      '收入极不稳定',
      '行业竞争激烈'
    ],
    advantages: [
      '收入上限高',
      '人脉变现',
      '资源积累',
      '行业地位'
    ],
    cases: [
      {
        name: 'Emma',
        background: '娱乐行业从业者',
        result: '艺人经纪月入50000元'
      }
    ],
    matchWeights: {
      skillWeight: 0.2,
      interestWeight: 0.2,
      resourceWeight: 0.5,
      timeWeight: 0.1
    }
  }
]

// 按类型获取副业
export const getSideJobsByCategory = (category: SideJobCategory) => {
  return SIDE_JOBS.filter(job => job.category === category)
}

// 按ID获取副业
export const getSideJobById = (id: string) => {
  return SIDE_JOBS.find(job => job.id === id)
}

// 获取所有副业ID和名称（用于匹配）
export const getSideJobList = () => {
  return SIDE_JOBS.map(job => ({
    id: job.id,
    name: job.name,
    category: job.category,
    difficulty: job.difficulty,
    incomePotential: job.incomePotential
  }))
}
