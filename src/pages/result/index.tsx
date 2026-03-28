import { View, Text, Image } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { useState } from 'react'
import SideJobCard from '../../components/SideJobCard'
import { getMatchResults } from '../../utils/storage'
import './index.scss'

export default function ResultIndex() {
  const [results, setResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useLoad(() => {
    // 获取匹配结果
    const matchResults = getMatchResults()
    if (matchResults && matchResults.length > 0) {
      setResults(matchResults)
    }
    setIsLoading(false)
  })

  const handleViewDetail = (sideJob: any) => {
    Taro.navigateTo({
      url: `/pages/result/detail?id=${sideJob.id}`
    })
  }

  const handleViewReport = () => {
    Taro.navigateTo({
      url: '/pages/result/report'
    })
  }

  const handleRestart = () => {
    Taro.showModal({
      title: '重新咨询',
      content: '确定要重新开始吗？当前数据将被清除',
      success: (res) => {
        if (res.confirm) {
          Taro.clearStorage()
          Taro.redirectTo({
            url: '/pages/survey/index'
          })
        }
      }
    })
  }

  if (isLoading) {
    return (
      <View className='result-page loading'>
        <Text className='loading-text'>正在分析...</Text>
      </View>
    )
  }

  if (results.length === 0) {
    return (
      <View className='result-page empty'>
        <Text className='empty-icon'>📭</Text>
        <Text className='empty-title'>暂无匹配结果</Text>
        <Text className='empty-desc'>请先完成咨询流程</Text>
        <View className='btn btn-primary' onClick={handleRestart}>
          <Text className='btn-text'>开始咨询</Text>
        </View>
      </View>
    )
  }

  return (
    <View className='result-page'>
      {/* 头部 */}
      <View className='result-header'>
        <Text className='header-title'>你的专属副业推荐</Text>
        <Text className='header-subtitle'>基于金字塔模型，为你匹配最适合的副业方向</Text>
      </View>

      {/* 匹配概览 */}
      <View className='match-overview'>
        <View className='overview-item'>
          <Text className='overview-number'>{results[0]?.totalScore}%</Text>
          <Text className='overview-label'>最高匹配度</Text>
        </View>
        <View className='overview-divider' />
        <View className='overview-item'>
          <Text className='overview-number'>TOP 3</Text>
          <Text className='overview-label'>精选推荐</Text>
        </View>
        <View className='overview-divider' />
        <View className='overview-item'>
          <Text className='overview-number'>50+</Text>
          <Text className='overview-label'>综合评估</Text>
        </View>
      </View>

      {/* TOP1 高亮 */}
      {results[0] && (
        <View className='top1-section'>
          <View className='top1-badge'>🏆 最推荐</View>
          <SideJobCard
            sideJob={results[0].sideJob}
            matchScore={results[0].totalScore}
            rank={1}
            onClick={() => handleViewDetail(results[0].sideJob)}
          />
          {results[0].reasons && (
            <View className='reasons-card'>
              <Text className='reasons-title'>推荐理由</Text>
              {results[0].reasons.map((reason: string, index: number) => (
                <View key={index} className='reason-item'>
                  <Text className='reason-dot'>•</Text>
                  <Text className='reason-text'>{reason}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      )}

      {/* TOP2-3 */}
      <View className='other-results'>
        <Text className='section-title'>其他推荐</Text>
        {results.slice(1, 3).map((result, index) => (
          <SideJobCard
            key={result.sideJob.id}
            sideJob={result.sideJob}
            matchScore={result.totalScore}
            rank={index + 2}
            onClick={() => handleViewDetail(result.sideJob)}
          />
        ))}
      </View>

      {/* CTA区域 */}
      <View className='result-cta'>
        <View className='btn btn-primary' onClick={handleViewReport}>
          <Text className='btn-text'>查看完整报告</Text>
        </View>
        <Text className='cta-hint'>包含能力雷达图、启动路线图等详细分析</Text>
        
        <View className='secondary-actions'>
          <Text className='action-link' onClick={handleRestart}>重新咨询</Text>
          <Text className='action-divider'>|</Text>
          <Text className='action-link' onClick={() => Taro.switchTab({ url: '/pages/encyclopedia/index' })}>浏览百科</Text>
        </View>
      </View>
    </View>
  )
}
