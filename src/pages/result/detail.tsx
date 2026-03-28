import { View, Text, ScrollView } from '@tarojs/components'
import Taro, { useLoad, useRouter } from '@tarojs/taro'
import { useState } from 'react'
import { getSideJobById } from '../../constants/sidejobs'
import './detail.scss'

export default function ResultDetail() {
  const router = useRouter()
  const [sideJob, setSideJob] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('overview')

  useLoad(() => {
    const { id } = router.params
    if (id) {
      const job = getSideJobById(id)
      if (job) {
        setSideJob(job)
      }
    }
  })

  if (!sideJob) {
    return (
      <View className='detail-page loading'>
        <Text className='loading-text'>加载中...</Text>
      </View>
    )
  }

  const getDifficultyStars = (difficulty: number) => {
    return '⭐'.repeat(difficulty)
  }

  const getIncomeStars = (income: number) => {
    return '💰'.repeat(income)
  }

  return (
    <View className='detail-page'>
      {/* 头部信息 */}
      <View className='detail-header'>
        <Text className='category-tag'>{sideJob.categoryName}</Text>
        <Text className='job-name'>{sideJob.name}</Text>
        <Text className='job-desc'>{sideJob.description}</Text>

        <View className='quick-stats'>
          <View className='stat-item'>
            <Text className='stat-label'>难度</Text>
            <Text className='stat-value'>{getDifficultyStars(sideJob.difficulty)}</Text>
          </View>
          <View className='stat-item'>
            <Text className='stat-label'>收入</Text>
            <Text className='stat-value'>{getIncomeStars(sideJob.incomePotential)}</Text>
          </View>
          <View className='stat-item'>
            <Text className='stat-label'>周期</Text>
            <Text className='stat-value highlight'>{sideJob.startupCycle}</Text>
          </View>
        </View>
      </View>

      {/* 标签页 */}
      <View className='tab-bar'>
        <View
          className={`tab-item ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <Text className='tab-text'>概览</Text>
        </View>
        <View
          className={`tab-item ${activeTab === 'requirements' ? 'active' : ''}`}
          onClick={() => setActiveTab('requirements')}
        >
          <Text className='tab-text'>要求</Text>
        </View>
        <View
          className={`tab-item ${activeTab === 'roadmap' ? 'active' : ''}`}
          onClick={() => setActiveTab('roadmap')}
        >
          <Text className='tab-text'>路线图</Text>
        </View>
        <View
          className={`tab-item ${activeTab === 'cases' ? 'active' : ''}`}
          onClick={() => setActiveTab('cases')}
        >
          <Text className='tab-text'>案例</Text>
        </View>
      </View>

      {/* 内容区 */}
      <ScrollView className='detail-content' scrollY>
        {/* 概览页 */}
        {activeTab === 'overview' && (
          <View className='tab-content'>
            {/* 收入范围 */}
            <View className='content-card'>
              <Text className='card-title'>💰 收入范围</Text>
              <View className='income-list'>
                <View className='income-item'>
                  <Text className='income-label'>入门阶段</Text>
                  <Text className='income-value'>{sideJob.incomeRange.beginner}</Text>
                </View>
                <View className='income-item'>
                  <Text className='income-label'>进阶阶段</Text>
                  <Text className='income-value'>{sideJob.incomeRange.intermediate}</Text>
                </View>
                <View className='income-item highlight'>
                  <Text className='income-label'>专家阶段</Text>
                  <Text className='income-value'>{sideJob.incomeRange.expert}</Text>
                </View>
              </View>
            </View>

            {/* 适合人群 */}
            <View className='content-card'>
              <Text className='card-title'>👥 适合人群</Text>
              <View className='tag-list'>
                {sideJob.suitableFor.map((item: string, index: number) => (
                  <Text key={index} className='tag'>{item}</Text>
                ))}
              </View>
            </View>

            {/* 优缺点 */}
            <View className='content-card pros-cons'>
              <View className='pros-section'>
                <Text className='section-title'>✅ 优势</Text>
                {sideJob.advantages.map((item: string, index: number) => (
                  <Text key={index} className='list-item'>• {item}</Text>
                ))}
              </View>
              <View className='cons-section'>
                <Text className='section-title'>⚠️ 风险</Text>
                {sideJob.risks.map((item: string, index: number) => (
                  <Text key={index} className='list-item'>• {item}</Text>
                ))}
              </View>
            </View>
          </View>
        )}

        {/* 要求页 */}
        {activeTab === 'requirements' && (
          <View className='tab-content'>
            <View className='content-card'>
              <Text className='card-title'>🛠️ 硬技能要求</Text>
              <View className='requirement-list'>
                {sideJob.requirements.hardSkills.map((skill: string, index: number) => (
                  <View key={index} className='requirement-item'>
                    <Text className='check-icon'>✓</Text>
                    <Text className='requirement-text'>{skill}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View className='content-card'>
              <Text className='card-title'>💡 软技能要求</Text>
              <View className='requirement-list'>
                {sideJob.requirements.softSkills.map((skill: string, index: number) => (
                  <View key={index} className='requirement-item'>
                    <Text className='check-icon'>✓</Text>
                    <Text className='requirement-text'>{skill}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View className='content-card'>
              <Text className='card-title'>📦 其他要求</Text>
              <View className='info-grid'>
                <View className='info-item'>
                  <Text className='info-label'>启动资金</Text>
                  <Text className='info-value'>{sideJob.requirements.startupFund}</Text>
                </View>
                <View className='info-item'>
                  <Text className='info-label'>所需设备</Text>
                  <Text className='info-value'>{sideJob.requirements.equipment.join('、')}</Text>
                </View>
                <View className='info-item'>
                  <Text className='info-label'>时间投入</Text>
                  <Text className='info-value'>{sideJob.timeCommitment}</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* 路线图页 */}
        {activeTab === 'roadmap' && (
          <View className='tab-content'>
            <View className='content-card roadmap-card'>
              <Text className='card-title'>🗺️ 启动路线图</Text>
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
          </View>
        )}

        {/* 案例页 */}
        {activeTab === 'cases' && (
          <View className='tab-content'>
            {sideJob.cases.map((caseItem: any, index: number) => (
              <View key={index} className='content-card case-card'>
                <View className='case-header'>
                  <View className='avatar'>
                    <Text className='avatar-text'>{caseItem.name[0]}</Text>
                  </View>
                  <View className='case-info'>
                    <Text className='case-name'>{caseItem.name}</Text>
                    <Text className='case-background'>{caseItem.background}</Text>
                  </View>
                </View>
                <View className='case-result'>
                  <Text className='result-label'>成果</Text>
                  <Text className='result-text'>{caseItem.result}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  )
}
