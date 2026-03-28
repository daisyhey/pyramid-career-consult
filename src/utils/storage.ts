import Taro from '@tarojs/taro'

const STORAGE_KEY = 'consultation_data'
const FAVORITES_KEY = 'sidejob_favorites'
const HISTORY_KEY = 'consultation_history'

export interface ConsultationData {
  // 基础信息
  basicInfo?: {
    age: number
    city: string
    education: string
  }
  
  // 职业背景
  careerInfo?: {
    industry: string
    position: string
    workYears: number
    workSchedule: string
    jobStability: 'high' | 'medium' | 'low'
  }
  
  // 技能资产
  skillsInfo?: {
    hardSkills: string[]
    softSkills: string[]
    specialResources: string[]
  }
  
  // 约束条件
  constraintsInfo?: {
    availableTime: string
    availableFund: string
    riskTolerance: 'low' | 'medium' | 'high'
  }
  
  // 苏格拉底6问
  socratesAnswers?: {
    q1_who: string
    q2_have: string
    q3_want: string
    q4_bear: string
    q5_suitable: string
    q6_pay: string
  }
  
  // 当前步骤
  currentStep?: string
  
  // 匹配结果
  matchResults?: any[]
  
  // 创建时间
  createdAt?: number
  
  // 更新时间
  updatedAt?: number
}

/**
 * 获取咨询数据
 */
export function getConsultationData(): ConsultationData | null {
  try {
    const data = Taro.getStorageSync(STORAGE_KEY)
    return data || null
  } catch (error) {
    console.error('获取咨询数据失败', error)
    return null
  }
}

/**
 * 保存咨询数据
 */
export function saveConsultationData(data: Partial<ConsultationData>) {
  try {
    const existingData = getConsultationData() || {}
    const newData = {
      ...existingData,
      ...data,
      updatedAt: Date.now()
    }
    
    if (!existingData.createdAt) {
      newData.createdAt = Date.now()
    }
    
    Taro.setStorageSync(STORAGE_KEY, newData)
    return true
  } catch (error) {
    console.error('保存咨询数据失败', error)
    return false
  }
}

/**
 * 清除咨询数据
 */
export function clearConsultationData() {
  try {
    Taro.removeStorageSync(STORAGE_KEY)
    return true
  } catch (error) {
    console.error('清除咨询数据失败', error)
    return false
  }
}

/**
 * 更新当前步骤
 */
export function updateCurrentStep(step: string) {
  return saveConsultationData({ currentStep: step })
}

/**
 * 获取当前步骤
 */
export function getCurrentStep(): string | null {
  const data = getConsultationData()
  return data?.currentStep || null
}

/**
 * 保存匹配结果
 */
export function saveMatchResults(results: any[]) {
  return saveConsultationData({ matchResults: results })
}

/**
 * 获取匹配结果
 */
export function getMatchResults(): any[] | null {
  const data = getConsultationData()
  return data?.matchResults || null
}

/**
 * 检查是否有未完成的咨询
 */
export function hasUnfinishedConsultation(): boolean {
  const data = getConsultationData()
  if (!data) return false
  
  // 如果已经完成了匹配，不算未完成
  if (data.matchResults && data.matchResults.length > 0) {
    return false
  }
  
  // 如果已经开始填问卷，算未完成
  return !!data.currentStep
}

/**
 * 获取咨询进度百分比
 */
export function getConsultationProgress(): number {
  const data = getConsultationData()
  if (!data) return 0
  
  const steps = ['basic', 'career', 'skills', 'constraints', 'q1', 'q2', 'q3', 'q4', 'q5', 'q6']
  const currentStep = data.currentStep
  
  if (!currentStep) return 0
  
  const currentIndex = steps.indexOf(currentStep)
  if (currentIndex === -1) return 0
  
  return Math.round(((currentIndex + 1) / steps.length) * 100)
}

/**
 * 获取收藏列表
 */
export function getFavorites(): string[] {
  try {
    return Taro.getStorageSync(FAVORITES_KEY) || []
  } catch (error) {
    console.error('获取收藏列表失败', error)
    return []
  }
}

/**
 * 添加收藏
 */
export function addFavorite(sideJobId: string): boolean {
  try {
    const favorites = getFavorites()
    if (!favorites.includes(sideJobId)) {
      favorites.push(sideJobId)
      Taro.setStorageSync(FAVORITES_KEY, favorites)
    }
    return true
  } catch (error) {
    console.error('添加收藏失败', error)
    return false
  }
}

/**
 * 移除收藏
 */
export function removeFavorite(sideJobId: string): boolean {
  try {
    const favorites = getFavorites()
    const newFavorites = favorites.filter(id => id !== sideJobId)
    Taro.setStorageSync(FAVORITES_KEY, newFavorites)
    return true
  } catch (error) {
    console.error('移除收藏失败', error)
    return false
  }
}

/**
 * 检查是否已收藏
 */
export function isFavorite(sideJobId: string): boolean {
  return getFavorites().includes(sideJobId)
}

/**
 * 获取咨询历史
 */
export function getConsultationHistory(): any[] {
  try {
    return Taro.getStorageSync(HISTORY_KEY) || []
  } catch (error) {
    console.error('获取咨询历史失败', error)
    return []
  }
}

/**
 * 添加到咨询历史
 */
export function addToHistory(data: any): boolean {
  try {
    const history = getConsultationHistory()
    history.unshift({
      id: Date.now().toString(),
      timestamp: Date.now(),
      ...data
    })
    // 只保留最近20条
    if (history.length > 20) {
      history.pop()
    }
    Taro.setStorageSync(HISTORY_KEY, history)
    return true
  } catch (error) {
    console.error('添加到历史失败', error)
    return false
  }
}

/**
 * 清除咨询历史
 */
export function clearConsultationHistory(): boolean {
  try {
    Taro.removeStorageSync(HISTORY_KEY)
    return true
  } catch (error) {
    console.error('清除历史失败', error)
    return false
  }
}
