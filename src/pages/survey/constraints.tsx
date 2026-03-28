import { View, Text } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { useState } from 'react'
import ProgressBar from '../../components/ProgressBar'
import OptionSelector from '../../components/OptionSelector'
import { saveConsultationData, updateCurrentStep, getConsultationData } from '../../utils/storage'
import './constraints.scss'

const TIME_OPTIONS = [
  { label: '每天1小时以内', value: 'minimal' },
  { label: '每天1-2小时', value: 'low' },
  { label: '每天2-4小时', value: 'medium' },
  { label: '每天4小时以上', value: 'high' },
  { label: '周末集中投入', value: 'weekend' }
]

const FUND_OPTIONS = [
  { label: '无启动资金', value: '0' },
  { label: '1000元以内', value: '1000' },
  { label: '1000-5000元', value: '3000' },
  { label: '5000-10000元', value: '7500' },
  { label: '10000-30000元', value: '20000' },
  { label: '30000元以上', value: '50000' }
]

const RISK_OPTIONS = [
  { label: '低风险偏好', value: 'low', desc: '宁可收入低，也不冒险' },
  { label: '中等风险偏好', value: 'medium', desc: '可以接受一定风险' },
  { label: '高风险偏好', value: 'high', desc: '愿意冒风险追求高回报' }
]

export default function SurveyConstraints() {
  const [availableTime, setAvailableTime] = useState('')
  const [availableFund, setAvailableFund] = useState('')
  const [riskTolerance, setRiskTolerance] = useState('')

  useLoad(() => {
    const data = getConsultationData()
    if (data?.constraintsInfo) {
      setAvailableTime(data.constraintsInfo.availableTime || '')
      setAvailableFund(data.constraintsInfo.availableFund || '')
      setRiskTolerance(data.constraintsInfo.riskTolerance || '')
    }
    updateCurrentStep('constraints')
  })

  const isValid = () => {
    return availableTime && availableFund && riskTolerance
  }

  const handleNext = () => {
    if (!isValid()) {
      Taro.showToast({
        title: '请完善所有信息',
        icon: 'none'
      })
      return
    }

    saveConsultationData({
      constraintsInfo: {
        availableTime,
        availableFund,
        riskTolerance: riskTolerance as 'low' | 'medium' | 'high'
      }
    })

    Taro.navigateTo({
      url: '/pages/dialogue/q1'
    })
  }

  const handlePrev = () => {
    Taro.navigateBack()
  }

  return (
    <View className='survey-page'>
      <ProgressBar current={4} total={10} />

      <View className='survey-content'>
        <View className='survey-header'>
          <Text className='step-badge'>步骤 4/4</Text>
          <Text className='survey-title'>约束条件</Text>
          <Text className='survey-subtitle'>了解你可用的时间和资源</Text>
        </View>

        <View className='step-hint'>
          <Text className='hint-icon'>⏰</Text>
          <Text className='hint-text'>背景扫描完成！接下来是苏格拉底深度对话</Text>
        </View>

        {/* 可用时间 */}
        <View className='question-card'>
          <View className='question-header'>
            <Text className='question-number'>Q1</Text>
            <Text className='question-title'>你每天能投入多少时间做副业？</Text>
          </View>
          <OptionSelector
            type='single'
            options={TIME_OPTIONS}
            value={availableTime}
            onChange={setAvailableTime}
          />
        </View>

        {/* 启动资金 */}
        <View className='question-card'>
          <View className='question-header'>
            <Text className='question-number'>Q2</Text>
            <Text className='question-title'>你能接受的启动资金是多少？</Text>
          </View>
          <OptionSelector
            type='single'
            options={FUND_OPTIONS}
            value={availableFund}
            onChange={setAvailableFund}
          />
        </View>

        {/* 风险承受 */}
        <View className='question-card'>
          <View className='question-header'>
            <Text className='question-number'>Q3</Text>
            <Text className='question-title'>你的风险承受能力如何？</Text>
          </View>
          <View className='risk-options'>
            {RISK_OPTIONS.map((option) => (
              <View
                key={option.value}
                className={`risk-card ${riskTolerance === option.value ? 'selected' : ''}`}
                onClick={() => setRiskTolerance(option.value)}
              >
                <View className='risk-header'>
                  <View className={`radio ${riskTolerance === option.value ? 'checked' : ''}`} />
                  <Text className='risk-title'>{option.label}</Text>
                </View>
                <Text className='risk-desc'>{option.desc}</Text>
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
            <Text className='btn-text'>进入深度对话 →</Text>
          </View>
        </View>
      </View>
    </View>
  )
}
