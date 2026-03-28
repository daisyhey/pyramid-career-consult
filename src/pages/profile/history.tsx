import { View, Text, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState, useEffect } from 'react'
import { getConsultationHistory, clearConsultationHistory } from '../../utils/storage'
import { getSideJobById } from '../../constants/sidejobs'
import './history.scss'

interface HistoryItem {
  id: string
  timestamp: number
  topRecommendation: {
    name: string
    matchScore: number
    id: string
  }
}

export default function ProfileHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([])

  useEffect(() => {
    loadHistory()
  }, [])

  const loadHistory = () => {
    const data = getConsultationHistory()
    setHistory(data)
  }

  const handleClear = () => {
    if (history.length === 0) {
      Taro.showToast({ title: '暂无历史记录', icon: 'none' })
      return
    }

    Taro.showModal({
      title: '清除历史',
      content: '确定要清除所有咨询历史吗？此操作不可恢复',
      success: (res) => {
        if (res.confirm) {
          clearConsultationHistory()
          setHistory([])
          Taro.showToast({ title: '已清除', icon: 'success' })
        }
      }
    })
  }

  const handleViewDetail = (jobId: string) => {
    const job = getSideJobById(jobId)
    if (job) {
      Taro.navigateTo({
        url: `/pages/encyclopedia/detail?id=${jobId}`
      })
    }
  }

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp)
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
  }

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp)
    return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
  }

  if (history.length === 0) {
    return (
      <View className='history-page empty'>
        <Text className='empty-icon'>📋</Text>
        <Text className='empty-title'>暂无咨询历史</Text>
        <Text className='empty-desc'>完成一次咨询后，这里会显示你的记录</Text>
        <View className='btn btn-primary' onClick={() => Taro.switchTab({ url: '/pages/index/index' })}>
          <Text className='btn-text'>去咨询</Text>
        </View>
      </View>
    )
  }

  return (
    <View className='history-page'>
      {/* 头部 */}
      <View className='history-header'>
        <Text className='header-title'>咨询历史</Text>
        <Text className='header-subtitle'>共 {history.length} 次咨询</Text>
      </View>

      {/* 列表 */}
      <ScrollView className='history-list' scrollY>
        {history.map((item, index) => (
          <View
            key={item.id}
            className='history-card'
            onClick={() => handleViewDetail(item.topRecommendation.id)}
          >
            <View className='card-header'>
              <View className='date-badge'>
                <Text className='date-day'>{formatDate(item.timestamp)}</Text>
                <Text className='date-time'>{formatTime(item.timestamp)}</Text>
              </View>
              <View className='match-badge'>
                <Text className='match-score'>{item.topRecommendation.matchScore}%</Text>
                <Text className='match-label'>匹配度</Text>
              </View>
            </View>

            <View className='card-content'>
              <Text className='recommend-label'>最推荐副业</Text>
              <Text className='job-name'>{item.topRecommendation.name}</Text>
            </View>

            <View className='card-footer'>
              <Text className='view-link'>查看详情 →</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* 底部操作 */}
      <View className='history-footer'>
        <Text className='clear-btn' onClick={handleClear}>清除所有历史</Text>
      </View>
    </View>
  )
}
