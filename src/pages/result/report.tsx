import { View, Text, ScrollView } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { useState } from 'react'
import { getMatchResults, getConsultationData, addToHistory } from '../../utils/storage'
import { getSideJobById } from '../../constants/sidejobs'
import SideJobCard from '../../components/SideJobCard'
import './report.scss'

export default function ResultReport() {
  const [matchResult, setMatchResult] = useState<any>(null)
  const [userProfile, setUserProfile] = useState<any>(null)

  useLoad(() => {
    const results = getMatchResults()
    const data = getConsultationData()

    if (results && results.length > 0) {
      setMatchResult(results[0])

      // 构建用户画像
      const profile = {
        ...data?.basicInfo,
        ...data?.careerInfo,
        ...data?.skillsInfo,
        ...data?.constraintsInfo
      }
      setUserProfile(profile)

      // 保存到历史记录
      addToHistory({
        topRecommendation: {
          name: results[0].sideJob.name,
          matchScore: results[0].totalScore,
          id: results[0].sideJob.id
        },
        answers: data
      })
    }
  })

  if (!matchResult) {
    return (
      <View className='report-page loading'>
        <Text className='loading-text'>加载中...</Text>
      </View>
    )
  }

  const { sideJob, totalScore, breakdown, reasons } = matchResult

  // 雷达图数据
  const radarData = [
    { label: '技能匹配', value: breakdown.skillMatch || 0, color: '#2E5BFF' },
    { label: '兴趣匹配', value: breakdown.interestMatch || 0, color: '#22c55e' },
    { label: '资源匹配', value: breakdown.resourceMatch || 0, color: '#f59e0b' },
    { label: '时间匹配', value: breakdown.timeMatch || 0, color: '#8b5cf6' }
  ]

  const handleRestart = () => {
    Taro.showModal({
      title: '重新咨询',
      content: '确定要重新开始吗？当前数据将被清除',
      success: (res) => {
        if (res.confirm) {
          Taro.clearStorage()
          Taro.redirectTo({ url: '/pages/survey/index' })
        }
      }
    })
  }

  return (
    <View className='report-page'>
      {/* 头部 */}
      <View className='report-header'>
        <Text className='header-title'>你的专属副业规划报告</Text>
        <Text className='header-subtitle'>基于金字塔咨询模型的完整分析</Text>
      </View>

      <ScrollView className='report-content' scrollY>
        {/* 综合匹配度 */}
        <View className='score-card'>
          <View className='score-circle'>
            <Text className='score-value'>{totalScore}%</Text>
            <Text className='score-label'>综合匹配度</Text>
          </View>
          <View className='score-rank'>
            <Text className='rank-text'>
              {totalScore >= 80 ? '🏆 高度匹配' : totalScore >= 60 ? '✨ 较为匹配' : '💡 可以尝试'}
            </Text>
          </View>
        </View>

        {/* 雷达图（简易版） */}
        <View className='radar-section'>
          <Text className='section-title'>四维能力匹配分析</Text>
          <View className='radar-chart'>
            {radarData.map((item, index) => (
              <View key={index} className='radar-item'>
                <View className='radar-bar-container'>
                  <View
                    className='radar-bar'
                    style={{
                      width: `${item.value}%`,
                      backgroundColor: item.color
                    }}
                  />
                </View>
                <View className='radar-info'>
                  <Text className='radar-label'>{item.label}</Text>
                  <Text className='radar-value' style={{ color: item.color }}>{item.value}%</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* 个人优势 */}
        {userProfile && (
          <View className='advantage-section'>
            <Text className='section-title'>你的优势资产</Text>
            <View className='advantage-list'>
              {userProfile.hardSkills && userProfile.hardSkills.length > 0 && (
                <View className='advantage-item'>
                  <Text className='advantage-icon'>🛠️</Text>
                  <View className='advantage-content'>
                    <Text className='advantage-title'>硬技能</Text>
                    <Text className='advantage-text'>{userProfile.hardSkills.join('、')}</Text>
                  </View>
                </View>
              )}
              {userProfile.softSkills && userProfile.softSkills.length > 0 && (
                <View className='advantage-item'>
                  <Text className='advantage-icon'>💡</Text>
                  <View className='advantage-content'>
                    <Text className='advantage-title'>软技能</Text>
                    <Text className='advantage-text'>{userProfile.softSkills.join('、')}</Text>
                  </View>
                </View>
              )}
              {userProfile.specialResources && userProfile.specialResources.length > 0 && (
                <View className='advantage-item'>
                  <Text className='advantage-icon'>🎒</Text>
                  <View className='advantage-content'>
                    <Text className='advantage-title'>特殊资源</Text>
                    <Text className='advantage-text'>{userProfile.specialResources.join('、')}</Text>
                  </View>
                </View>
              )}
            </View>
          </View>
        )}

        {/* TOP推荐 */}
        <View className='recommendation-section'>
          <Text className='section-title'>最推荐副业</Text>
          <SideJobCard
            sideJob={sideJob}
            matchScore={totalScore}
            rank={1}
          />
          {reasons && (
            <View className='reasons-card'>
              <Text className='reasons-title'>推荐理由</Text>
              {reasons.map((reason: string, index: number) => (
                <View key={index} className='reason-item'>
                  <Text className='reason-dot'>✓</Text>
                  <Text className='reason-text'>{reason}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* 启动路线图 */}
        <View className='roadmap-section'>
          <Text className='section-title'>启动路线图</Text>
          <View className='roadmap-timeline'>
            {sideJob.roadmap.map((phase: any, index: number) => (
              <View key={index} className='timeline-item'>
                <View className='timeline-marker'>
                  <Text className='timeline-number'>{index + 1}</Text>
                </View>
                <View className='timeline-content'>
                  <View className='phase-header'>
                    <Text className='phase-name'>{phase.phase}</Text>
                    <Text className='phase-duration'>{phase.duration}</Text>
                  </View>
                  <View className='task-list'>
                    {phase.tasks.map((task: string, taskIndex: number) => (
                      <Text key={taskIndex} className='task-item'>• {task}</Text>
                    ))}
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* CTA */}
        <View className='report-cta'>
          <View className='btn btn-primary' onClick={() => Taro.navigateTo({ url: `/pages/result/detail?id=${sideJob.id}` })}>
            <Text className='btn-text'>查看完整详情</Text>
          </View>
          <View className='btn btn-secondary' onClick={handleRestart}>
            <Text className='btn-text'>重新咨询</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
