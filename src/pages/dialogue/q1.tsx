import { View, Text } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { useState } from 'react'
import ProgressBar from '../../components/ProgressBar'
import { saveConsultationData, updateCurrentStep, getConsultationData } from '../../utils/storage'
import './dialogue.scss'

export default function DialogueQ1() {
  const [answer, setAnswer] = useState('')

  useLoad(() => {
    const data = getConsultationData()
    if (data?.socratesAnswers?.q1_who) {
      setAnswer(data.socratesAnswers.q1_who)
    }
    updateCurrentStep('q1')
  })

  const handleNext = () => {
    if (!answer.trim()) {
      Taro.showToast({
        title: '请填写你的回答',
        icon: 'none'
      })
      return
    }

    saveConsultationData({
      socratesAnswers: {
        q1_who: answer
      }
    })

    Taro.navigateTo({
      url: '/pages/dialogue/q2'
    })
  }

  return (
    <View className='dialogue-page'>
      <ProgressBar current={5} total={10} />

      <View className='dialogue-content'>
        {/* 问题区 */}
        <View className='question-section'>
          <View className='question-badge'>苏格拉底第1问</View>
          <Text className='question-title'>你是谁？</Text>
          <Text className='question-subtitle'>用一句话描述你自己</Text>
          <Text className='question-desc'>（职业、性格、特点、价值观）</Text>
        </View>

        {/* 示例区 */}
        <View className='example-card'>
          <Text className='example-title'>参考示例</Text>
          <View className='example-list'>
            <Text className='example-item'>"我是一个3年经验的产品经理，性格偏内向但执行力强，喜欢解决复杂问题"</Text>
            <Text className='example-item'>"我是两个孩子的妈妈，做过5年财务，现在想找时间灵活的副业"</Text>
            <Text className='example-item'>"我是程序员，技术宅，想尝试内容创作但不知道从何开始"</Text>
          </View>
        </View>

        {/* 输入区 */}
        <View className='input-section'>
          <View className='input-header'>
            <Text className='input-label'>你的回答</Text>
            <Text className='input-count'>{answer.length} 字</Text>
          </View>
          <textarea
            className='dialogue-textarea'
            placeholder='开始写下你的想法...'
            value={answer}
            onInput={(e) => setAnswer(e.detail.value)}
            maxlength={200}
          />
        </View>

        {/* 提示区 */}
        <View className='tip-section'>
          <Text className='tip-icon'>💡</Text>
          <Text className='tip-text'>这个问题帮助你建立自我认知，也是副业选择的出发点</Text>
        </View>
      </View>

      {/* 底部按钮 */}
      <View className='dialogue-footer'>
        <View
          className={`btn btn-primary ${!answer.trim() ? 'btn-disabled' : ''}`}
          onClick={handleNext}
        >
          <Text className='btn-text'>下一问 →</Text>
        </View>
        <Text className='footer-progress'>第 1/6 问</Text>
      </View>
    </View>
  )
}
