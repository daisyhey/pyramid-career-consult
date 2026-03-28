import { View, Text } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { useState } from 'react'
import ProgressBar from '../../components/ProgressBar'
import { saveConsultationData, updateCurrentStep, getConsultationData, saveMatchResults } from '../../utils/storage'
import { calculateMatch } from '../../utils/matchAlgorithm'
import './dialogue.scss'

export default function DialogueQ6() {
  const [answer, setAnswer] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useLoad(() => {
    const data = getConsultationData()
    if (data?.socratesAnswers?.q6_pay) {
      setAnswer(data.socratesAnswers.q6_pay)
    }
    updateCurrentStep('q6')
  })

  const handleSubmit = async () => {
    if (!answer.trim()) {
      Taro.showToast({
        title: '请填写你的回答',
        icon: 'none'
      })
      return
    }

    setIsLoading(true)

    // 保存答案
    const existingData = getConsultationData()
    const userProfile = {
      ...existingData?.basicInfo,
      ...existingData?.careerInfo,
      ...existingData?.skillsInfo,
      ...existingData?.constraintsInfo,
      socratesAnswers: {
        ...existingData?.socratesAnswers,
        q6_pay: answer
      }
    }

    saveConsultationData({
      socratesAnswers: {
        ...existingData?.socratesAnswers,
        q6_pay: answer
      }
    })

    // 计算匹配结果
    try {
      const results = calculateMatch(userProfile as any)
      saveMatchResults(results)
      
      // 跳转到结果页
      Taro.redirectTo({
        url: '/pages/result/index'
      })
    } catch (error) {
      console.error('匹配计算失败', error)
      Taro.showToast({
        title: '计算失败，请重试',
        icon: 'none'
      })
    }

    setIsLoading(false)
  }

  const handlePrev = () => {
    Taro.navigateBack()
  }

  return (
    <View className='dialogue-page'>
      <ProgressBar current={10} total={10} />

      <View className='dialogue-content'>
        <View className='question-section'>
          <View className='question-badge'>苏格拉底第6问</View>
          <Text className='question-title'>你愿意付出什么？</Text>
          <Text className='question-subtitle'>为了副业，你愿意投入多少时间和精力？</Text>
          <Text className='question-desc'>（具体的时间安排和投入承诺）</Text>
        </View>

        <View className='example-card'>
          <Text className='example-title'>参考示例</Text>
          <View className='example-list'>
            <Text className='example-item'>"工作日每天2小时，周末可以投入8-10小时，愿意坚持1年"</Text>
            <Text className='example-item'>"只能利用碎片时间，但保证每天至少1小时，周末看情况"</Text>
            <Text className='example-item'>"我已经准备好全职投入，每天12小时都没问题"</Text>
          </View>
        </View>

        <View className='input-section'>
          <View className='input-header'>
            <Text className='input-label'>你的回答</Text>
            <Text className='input-count'>{answer.length} 字</Text>
          </View>
          <textarea
            className='dialogue-textarea'
            placeholder='描述你愿意付出的时间和努力...'
            value={answer}
            onInput={(e) => setAnswer(e.detail.value)}
            maxlength={200}
          />
        </View>

        <View className='tip-section'>
          <Text className='tip-icon'>🎯</Text>
          <Text className='tip-text'>这是最后一问了！完成后即可获得你的专属副业推荐</Text>
        </View>
      </View>

      <View className='dialogue-footer'>
        <View className='btn-group'>
          <View className='btn btn-secondary' onClick={handlePrev}>
            <Text className='btn-text'>← 上一问</Text>
          </View>
          <View
            className={`btn btn-primary ${!answer.trim() || isLoading ? 'btn-disabled' : ''}`}
            onClick={handleSubmit}
          >
            <Text className='btn-text'>{isLoading ? '计算中...' : '查看结果 →'}</Text>
          </View>
        </View>
        <Text className='footer-progress'>第 6/6 问</Text>
      </View>
    </View>
  )
}
