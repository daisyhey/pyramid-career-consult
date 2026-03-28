import { View, Text, Image } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { useState } from 'react'
import { updateCurrentStep } from '../../utils/storage'
import './index.scss'

const FEATURES = [
  {
    icon: '📋',
    title: '背景扫描',
    desc: '了解你的职业、技能、资源'
  },
  {
    icon: '💭',
    title: '苏格拉底6问',
    desc: '深度挖掘内心真实需求'
  },
  {
    icon: '🤖',
    title: 'AI智能匹配',
    desc: '从50+副业中精准推荐'
  },
  {
    icon: '📊',
    title: '专属报告',
    desc: '获得完整的副业规划方案'
  }
]

export default function SurveyIndex() {
  const [estimatedTime, setEstimatedTime] = useState('5-8分钟')

  useLoad(() => {
    // 初始化当前步骤
    updateCurrentStep('basic')
  })

  const handleStart = () => {
    Taro.navigateTo({
      url: '/pages/survey/basic'
    })
  }

  return (
    <View className='survey-index'>
      {/* Header */}
      <View className='survey-header'>
        <Text className='header-title'>金字塔副业咨询</Text>
        <Text className='header-subtitle'>三步找到最适合你的副业</Text>
      </View>

      {/* Process Flow */}
      <View className='process-flow'>
        <View className='process-step active'>
          <View className='step-number'>1</View>
          <Text className='step-title'>背景扫描</Text>
          <Text className='step-desc'>4个问题</Text>
        </View>
        <View className='process-line' />
        <View className='process-step'>
          <View className='step-number'>2</View>
          <Text className='step-title'>深度对话</Text>
          <Text className='step-desc'>6个灵魂拷问</Text>
        </View>
        <View className='process-line' />
        <View className='process-step'>
          <View className='step-number'>3</View>
          <Text className='step-title'>智能匹配</Text>
          <Text className='step-desc'>TOP3推荐</Text>
        </View>
      </View>

      {/* Features */}
      <View className='features-section'>
        <Text className='section-title'>咨询特色</Text>
        <View className='features-grid'>
          {FEATURES.map((feature, index) => (
            <View key={index} className='feature-item'>
              <Text className='feature-icon'>{feature.icon}</Text>
              <Text className='feature-title'>{feature.title}</Text>
              <Text className='feature-desc'>{feature.desc}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Time Estimate */}
      <View className='time-estimate'>
        <Text className='time-icon'>⏱️</Text>
        <Text className='time-text'>预计用时 {estimatedTime}</Text>
        <Text className='time-desc'>支持断点续传，可随时退出</Text>
      </View>

      {/* Privacy Note */}
      <View className='privacy-note'>
        <Text className='privacy-icon'>🔒</Text>
        <Text className='privacy-text'>你的信息仅用于副业匹配，严格保密</Text>
      </View>

      {/* CTA Button */}
      <View className='cta-section'>
        <View className='btn btn-primary' onClick={handleStart}>
          <Text className='btn-text'>开始咨询</Text>
        </View>
        <Text className='cta-desc'>已有 12,345 人完成咨询</Text>
      </View>
    </View>
  )
}
