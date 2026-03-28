import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { SideJob } from '../../constants/sidejobs'
import './index.scss'

interface SideJobCardProps {
  sideJob: SideJob
  matchScore?: number
  rank?: number
  onClick?: () => void
}

export default function SideJobCard({ sideJob, matchScore, rank, onClick }: SideJobCardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      Taro.navigateTo({
        url: `/pages/encyclopedia/detail?id=${sideJob.id}`
      })
    }
  }
  
  const getDifficultyText = (difficulty: number) => {
    const map = ['', '简单', '较易', '中等', '较难', '困难']
    return map[difficulty] || '中等'
  }
  
  const getIncomeText = (income: number) => {
    const map = ['', '低', '较低', '中等', '较高', '高']
    return map[income] || '中等'
  }
  
  const getScoreClass = (score: number) => {
    if (score >= 80) return 'score-high'
    if (score >= 60) return 'score-medium'
    return 'score-low'
  }
  
  return (
    <View className='sidejob-card' onClick={handleClick}>
      {rank && (
        <View className={`rank-badge rank-${rank}`}>
          <Text className='rank-text'>TOP{rank}</Text>
        </View>
      )}
      
      <View className='card-header'>
        <View className='title-section'>
          <Text className='job-name'>{sideJob.name}</Text>
          <View className='tags-row'>
            <Text className='tag category-tag'>{sideJob.categoryName}</Text>
            <Text className='tag difficulty-tag'>难度: {getDifficultyText(sideJob.difficulty)}</Text>
          </View>
        </View>
        
        {matchScore !== undefined && (
          <View className={`match-score ${getScoreClass(matchScore)}`}>
            <Text className='score-value'>{matchScore}%</Text>
            <Text className='score-label'>匹配度</Text>
          </View>
        )}
      </View>
      
      <Text className='job-desc'>{sideJob.description}</Text>
      
      <View className='info-row'>
        <View className='info-item'>
          <Text className='info-label'>启动周期</Text>
          <Text className='info-value'>{sideJob.startupCycle}</Text>
        </View>
        <View className='info-item'>
          <Text className='info-label'>收入潜力</Text>
          <Text className='info-value income-high'>{getIncomeText(sideJob.incomePotential)}</Text>
        </View>
        <View className='info-item'>
          <Text className='info-label'>时间投入</Text>
          <Text className='info-value'>{sideJob.timeCommitment}</Text>
        </View>
      </View>
      
      <View className='requirements-row'>
        {sideJob.requirements.hardSkills.slice(0, 3).map((skill, index) => (
          <Text key={index} className='skill-tag'>{skill}</Text>
        ))}
      </View>
      
      <View className='card-footer'>
        <Text className='income-range'>
          收入: {sideJob.incomeRange.beginner} → {sideJob.incomeRange.expert}
        </Text>
        <Text className='arrow-icon'>→</Text>
      </View>
    </View>
  )
}
