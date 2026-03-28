import { View, Text } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { useState } from 'react'
import ProgressBar from '../../components/ProgressBar'
import { saveConsultationData, updateCurrentStep, getConsultationData } from '../../utils/storage'
import './skills.scss'

const HARD_SKILLS_OPTIONS = [
  { label: '编程开发', value: 'programming' },
  { label: 'UI/UX设计', value: 'design' },
  { label: '数据分析', value: 'data-analysis' },
  { label: '写作/文案', value: 'writing' },
  { label: '视频剪辑', value: 'video-editing' },
  { label: '摄影摄像', value: 'photography' },
  { label: '外语翻译', value: 'translation' },
  { label: '演讲培训', value: 'training' },
  { label: '财务/会计', value: 'accounting' },
  { label: '法律/合规', value: 'legal' },
  { label: '市场营销', value: 'marketing' },
  { label: '销售/BD', value: 'sales' },
  { label: '项目管理', value: 'project-mgmt' },
  { label: '运营/增长', value: 'operations' },
  { label: '手工/制作', value: 'handcraft' }
]

const SOFT_SKILLS_OPTIONS = [
  { label: '沟通协调', value: 'communication' },
  { label: '逻辑思维', value: 'logic' },
  { label: '创意思维', value: 'creativity' },
  { label: '学习能力', value: 'learning' },
  { label: '执行力', value: 'execution' },
  { label: '抗压能力', value: 'resilience' },
  { label: '领导能力', value: 'leadership' },
  { label: '审美能力', value: 'aesthetics' },
  { label: '用户思维', value: 'user-centric' },
  { label: '商业敏感度', value: 'business-sense' }
]

const RESOURCE_OPTIONS = [
  { label: '行业人脉', value: 'network' },
  { label: '客户资源', value: 'clients' },
  { label: '渠道资源', value: 'channels' },
  { label: '供应链资源', value: 'supply-chain' },
  { label: '信息/数据', value: 'information' },
  { label: '场地/设备', value: 'equipment' },
  { label: '资金储备', value: 'capital' },
  { label: '专利/版权', value: 'ip' },
  { label: '团队/合伙人', value: 'team' },
  { label: '无特殊资源', value: 'none' }
]

export default function SurveySkills() {
  const [hardSkills, setHardSkills] = useState<string[]>([])
  const [softSkills, setSoftSkills] = useState<string[]>([])
  const [resources, setResources] = useState<string[]>([])

  useLoad(() => {
    const data = getConsultationData()
    if (data?.skillsInfo) {
      setHardSkills(data.skillsInfo.hardSkills || [])
      setSoftSkills(data.skillsInfo.softSkills || [])
      setResources(data.skillsInfo.specialResources || [])
    }
    updateCurrentStep('skills')
  })

  const toggleSelection = (value: string, list: string[], setter: (val: string[]) => void) => {
    if (list.includes(value)) {
      setter(list.filter(v => v !== value))
    } else {
      setter([...list, value])
    }
  }

  const isValid = () => {
    return hardSkills.length > 0 && softSkills.length > 0
  }

  const handleNext = () => {
    if (!isValid()) {
      Taro.showToast({
        title: '请至少选择一项技能和软技能',
        icon: 'none'
      })
      return
    }

    saveConsultationData({
      skillsInfo: {
        hardSkills,
        softSkills,
        specialResources: resources
      }
    })

    Taro.navigateTo({
      url: '/pages/survey/constraints'
    })
  }

  const handlePrev = () => {
    Taro.navigateBack()
  }

  return (
    <View className='survey-page'>
      <ProgressBar current={3} total={10} />

      <View className='survey-content'>
        <View className='survey-header'>
          <Text className='step-badge'>步骤 3/4</Text>
          <Text className='survey-title'>技能资产</Text>
          <Text className='survey-subtitle'>盘点你的能力和资源</Text>
        </View>

        <View className='step-hint'>
          <Text className='hint-icon'>💡</Text>
          <Text className='hint-text'>选择你最擅长的3-5项，可多选</Text>
        </View>

        {/* 硬技能 */}
        <View className='question-card'>
          <View className='question-header'>
            <Text className='question-number'>Q1</Text>
            <View className='question-title-group'>
              <Text className='question-title'>你具备哪些硬技能？</Text>
              <Text className='question-subtitle'>已选 {hardSkills.length} 项</Text>
            </View>
          </View>
          <View className='tag-selector'>
            {HARD_SKILLS_OPTIONS.map((skill) => (
              <View
                key={skill.value}
                className={`tag-item ${hardSkills.includes(skill.value) ? 'selected' : ''}`}
                onClick={() => toggleSelection(skill.value, hardSkills, setHardSkills)}
              >
                <Text>{skill.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 软技能 */}
        <View className='question-card'>
          <View className='question-header'>
            <Text className='question-number'>Q2</Text>
            <View className='question-title-group'>
              <Text className='question-title'>你的软技能有哪些？</Text>
              <Text className='question-subtitle'>已选 {softSkills.length} 项</Text>
            </View>
          </View>
          <View className='tag-selector'>
            {SOFT_SKILLS_OPTIONS.map((skill) => (
              <View
                key={skill.value}
                className={`tag-item ${softSkills.includes(skill.value) ? 'selected' : ''}`}
                onClick={() => toggleSelection(skill.value, softSkills, setSoftSkills)}
              >
                <Text>{skill.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 特殊资源 */}
        <View className='question-card'>
          <View className='question-header'>
            <Text className='question-number'>Q3</Text>
            <View className='question-title-group'>
              <Text className='question-title'>你有哪些特殊资源？</Text>
              <Text className='question-subtitle'>已选 {resources.length} 项（选填）</Text>
            </View>
          </View>
          <View className='tag-selector'>
            {RESOURCE_OPTIONS.map((resource) => (
              <View
                key={resource.value}
                className={`tag-item ${resources.includes(resource.value) ? 'selected' : ''}`}
                onClick={() => toggleSelection(resource.value, resources, setResources)}
              >
                <Text>{resource.label}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* 底部按钮 */}
      <View className='survey-footer'>
        <View className='btn-group'>
          <View className='btn btn-secondary' onClick={handlePrev}>
            <Text className='btn-text'>上一步</Text>
          </View>
          <View
            className={`btn btn-primary ${!isValid() ? 'btn-disabled' : ''}`}
            onClick={handleNext}
          >
            <Text className='btn-text'>下一步</Text>
          </View>
        </View>
      </View>
    </View>
  )
}
