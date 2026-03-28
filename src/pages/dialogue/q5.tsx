import { View, Text } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { useState } from 'react'
import ProgressBar from '../../components/ProgressBar'
import { saveConsultationData, updateCurrentStep, getConsultationData } from '../../utils/storage'
import './dialogue.scss'

export default function DialogueQ5() {
  const [answer, setAnswer] = useState('')

  useLoad(() => {
    const data = getConsultationData()
    if (data?.socratesAnswers?.q5_suitable) {
      setAnswer(data.socratesAnswers.q5_suitable)
    }
    updateCurrentStep('q5')
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
        q5_suitable: answer
      }
    })

    Taro.navigateTo({
      url: '/pages/dialogue/q6'
    })
  }

  const handlePrev = () => {
    Taro.navigateBack()
  }

  return (
    <View className='dialogue-page'>
      <ProgressBar current={9} total={10} />

      <View className='dialogue-content'>
        <View className='question-section'>
          <View className='question-badge'>苏格拉底第5问</View>
          <Text className='question-title'>你适合什么？</Text>
          <Text className='question-subtitle'>你觉得什么样的副业最适合你现在的状态？</Text>
          <Text className='question-desc'>（性格、生活方式、价值观匹配）</Text>
        </View>

        <View className='example-card'>
          <Text className='example-title'>参考示例</Text>
          <View className='example-list'>
            <Text className='example-item'>"不需要太多社交，能发挥我的专业能力，在家就能完成"</Text>
            <Text className='example-item'>"我喜欢和人打交道，希望副业能让我认识更多有趣的人"</Text>
            <Text className='example-item'>"最好是创造性工作，能让我保持学习，不喜欢重复性劳动"</Text>
          </View>
        </View>

        <View className='input-section'>
          <View className='input-header'>
            <Text className='input-label'>你的回答</Text>
            <Text className='input-count'>{answer.length} 字</Text>
          </View>
          <textarea
            className='dialogue-textarea'
            placeholder='描述适合你的副业类型...'
            value={answer}
            onInput={(e) => setAnswer(e.detail.value)}
            maxlength={200}
          />
        </View>

        <View className='tip-section'>
          <Text className='tip-icon'>💡</Text>
          <Text className='tip-text'>适合的副业应该是让你感到兴奋而不是压力的</Text>
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
            <Text className='btn-text'>最后一问 →</Text>
          </View>
        </View>
        <Text className='footer-progress'>第 5/6 问</Text>
      </View>
    </View>
  )
}
