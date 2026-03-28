import { View, Text } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { useState } from 'react'
import ProgressBar from '../../components/ProgressBar'
import { saveConsultationData, updateCurrentStep, getConsultationData } from '../../utils/storage'
import './dialogue.scss'

export default function DialogueQ4() {
  const [answer, setAnswer] = useState('')

  useLoad(() => {
    const data = getConsultationData()
    if (data?.socratesAnswers?.q4_bear) {
      setAnswer(data.socratesAnswers.q4_bear)
    }
    updateCurrentStep('q4')
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
        q4_bear: answer
      }
    })

    Taro.navigateTo({
      url: '/pages/dialogue/q5'
    })
  }

  const handlePrev = () => {
    Taro.navigateBack()
  }

  return (
    <View className='dialogue-page'>
      <ProgressBar current={8} total={10} />

      <View className='dialogue-content'>
        <View className='question-section'>
          <View className='question-badge'>苏格拉底第4问</View>
          <Text className='question-title'>你能承受什么？</Text>
          <Text className='question-subtitle'>对于副业失败，你的底线是什么？</Text>
          <Text className='question-desc'>（资金损失、时间浪费、机会成本等）</Text>
        </View>

        <View className='example-card'>
          <Text className='example-title'>参考示例</Text>
          <View className='example-list'>
            <Text className='example-item'>"最多投入5万，如果半年没起色就放弃，我亏得起"</Text>
            <Text className='example-item'>"我输不起钱，但愿意投入时间学习，可以接受1年无收入"</Text>
            <Text className='example-item'>"只要不辞职，投入多少时间和资金都可以接受"</Text>
          </View>
        </View>

        <View className='input-section'>
          <View className='input-header'>
            <Text className='input-label'>你的回答</Text>
            <Text className='input-count'>{answer.length} 字</Text>
          </View>
          <textarea
            className='dialogue-textarea'
            placeholder='描述你能承受的风险...'
            value={answer}
            onInput={(e) => setAnswer(e.detail.value)}
            maxlength={200}
          />
        </View>

        <View className='tip-section'>
          <Text className='tip-icon'>💡</Text>
          <Text className='tip-text'>明确底线能帮你过滤掉不适合的高风险选项</Text>
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
        <Text className='footer-progress'>第 4/6 问</Text>
      </View>
    </View>
  )
}
