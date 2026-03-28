import { View, Text } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { useState } from 'react'
import ProgressBar from '../../components/ProgressBar'
import { saveConsultationData, updateCurrentStep, getConsultationData } from '../../utils/storage'
import './dialogue.scss'

export default function DialogueQ2() {
  const [answer, setAnswer] = useState('')

  useLoad(() => {
    const data = getConsultationData()
    if (data?.socratesAnswers?.q2_have) {
      setAnswer(data.socratesAnswers.q2_have)
    }
    updateCurrentStep('q2')
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
        q2_have: answer
      }
    })

    Taro.navigateTo({
      url: '/pages/dialogue/q3'
    })
  }

  const handlePrev = () => {
    Taro.navigateBack()
  }

  return (
    <View className='dialogue-page'>
      <ProgressBar current={6} total={10} />

      <View className='dialogue-content'>
        <View className='question-section'>
          <View className='question-badge'>苏格拉底第2问</View>
          <Text className='question-title'>你拥有什么？</Text>
          <Text className='question-subtitle'>除了技能，你还有哪些资源？</Text>
          <Text className='question-desc'>（人脉、资金、信息、渠道、经验等）</Text>
        </View>

        <View className='example-card'>
          <Text className='example-title'>参考示例</Text>
          <View className='example-list'>
            <Text className='example-item'>"我有500+产品人脉，做过3个从0到1的项目，积累了大量踩坑经验"</Text>
            <Text className='example-item'>"我手里有10万启动资金，还有家族工厂的资源可以对接"</Text>
            <Text className='example-item'>"我在某行业干了8年，认识很多上下游供应商和客户"</Text>
          </View>
        </View>

        <View className='input-section'>
          <View className='input-header'>
            <Text className='input-label'>你的回答</Text>
            <Text className='input-count'>{answer.length} 字</Text>
          </View>
          <textarea
            className='dialogue-textarea'
            placeholder='盘点你拥有的资源...'
            value={answer}
            onInput={(e) => setAnswer(e.detail.value)}
            maxlength={200}
          />
        </View>

        <View className='tip-section'>
          <Text className='tip-icon'>💡</Text>
          <Text className='tip-text'>资源型副业往往门槛更高，但也更容易建立竞争壁垒</Text>
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
        <Text className='footer-progress'>第 2/6 问</Text>
      </View>
    </View>
  )
}
