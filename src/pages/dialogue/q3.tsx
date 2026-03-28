import { View, Text } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { useState } from 'react'
import ProgressBar from '../../components/ProgressBar'
import { saveConsultationData, updateCurrentStep, getConsultationData } from '../../utils/storage'
import './dialogue.scss'

export default function DialogueQ3() {
  const [answer, setAnswer] = useState('')

  useLoad(() => {
    const data = getConsultationData()
    if (data?.socratesAnswers?.q3_want) {
      setAnswer(data.socratesAnswers.q3_want)
    }
    updateCurrentStep('q3')
  })

  const handleNext = () => {
    if (!answer.trim()) {
      Taro.showToast({
        title: '请填写你的回答',
        icon: 'none'
      })
      return
    }

    const existingData = getConsultationData()
    saveConsultationData({
      socratesAnswers: {
        ...existingData?.socratesAnswers,
        q3_want: answer
      }
    })

    Taro.navigateTo({
      url: '/pages/dialogue/q4'
    })
  }

  const handlePrev = () => {
    Taro.navigateBack()
  }

  return (
    <View className='dialogue-page'>
      <ProgressBar current={7} total={10} />

      <View className='dialogue-content'>
        <View className='question-section'>
          <View className='question-badge'>苏格拉底第3问</View>
          <Text className='question-title'>你想要什么？</Text>
          <Text className='question-subtitle'>做副业，你最看重什么？</Text>
          <Text className='question-desc'>（收入、成长、自由、兴趣、安全感等）</Text>
        </View>

        <View className='example-card'>
          <Text className='example-title'>参考示例</Text>
          <View className='example-list'>
            <Text className='example-item'>"我希望3年内实现自由职业，月入2-3万，不再受公司约束"</Text>
            <Text className='example-item'>"我想在学习新技能的同时赚点外快，不要太累就行"</Text>
            <Text className='example-item'>"我要快速变现，最好3个月内开始赚钱，目标月入5000+"</Text>
          </View>
        </View>

        <View className='input-section'>
          <View className='input-header'>
            <Text className='input-label'>你的回答</Text>
            <Text className='input-count'>{answer.length} 字</Text>
          </View>
          <textarea
            className='dialogue-textarea'
            placeholder='描述你的目标...'
            value={answer}
            onInput={(e) => setAnswer(e.detail.value)}
            maxlength={200}
          />
        </View>

        <View className='tip-section'>
          <Text className='tip-icon'>💡</Text>
          <Text className='tip-text'>目标越清晰，匹配越精准。建议包含收入目标和时间预期</Text>
        </View>
      </View>

      <View className='dialogue-footer'>
        <View className='btn-group'>
          <View className='btn btn-secondary' onClick={handlePrev}>
            <Text className='btn-text'>← 上一问</Text>
          </View>
          <View
            className={`btn btn-primary ${!answer.trim() ? 'btn-disabled' : ''}`}
            onClick={handleNext}
          >
            <Text className='btn-text'>下一问 →</Text>
          </View>
        </View>
        <Text className='footer-progress'>第 3/6 问</Text>
      </View>
    </View>
  )
}
