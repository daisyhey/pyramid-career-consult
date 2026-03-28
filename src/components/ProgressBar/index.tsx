import { View, Text } from '@tarojs/components'
import './index.scss'

interface ProgressBarProps {
  current: number
  total: number
  showPercentage?: boolean
}

export default function ProgressBar({ current, total, showPercentage = true }: ProgressBarProps) {
  const percentage = Math.round((current / total) * 100)
  
  return (
    <View className='progress-bar-container'>
      <View className='progress-bar-track'>
        <View 
          className='progress-bar-fill'
          style={{ width: `${percentage}%` }}
        />
      </View>
      {showPercentage && (
        <Text className='progress-bar-text'>{percentage}%</Text>
      )}
    </View>
  )
}
