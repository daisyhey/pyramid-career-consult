import { useEffect, useState } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Image, Button, Swiper, SwiperItem } from '@tarojs/components'
import './index.scss'

const BANNER_LIST = [
  {
    id: 1,
    title: '金字塔副业咨询模型',
    subtitle: '科学匹配 · 深度挖掘 · 行动指南',
    image: 'https://placehold.co/750x400/2E5BFF/FFFFFF?text=金字塔模型'
  },
  {
    id: 2,
    title: '50+ 副业类型',
    subtitle: '覆盖技能/内容/资源/人脉四大类型',
    image: 'https://placehold.co/750x400/1E3A8A/FFFFFF?text=50+副业'
  },
  {
    id: 3,
    title: '已帮助 10,000+ 人',
    subtitle: '找到适合的副业方向',
    image: 'https://placehold.co/750x400/22c55e/FFFFFF?text=10000+用户'
  }
]

const FEATURE_LIST = [
  {
    icon: '🔍',
    title: '背景扫描',
    desc: '自动识别你的优势资产'
  },
  {
    icon: '💬',
    title: '深度对话',
    desc: '苏格拉底6问挖掘真实需求'
  },
  {
    icon: '🎯',
    title: '智能匹配',
    desc: 'AI算法精准推荐适合副业'
  },
  {
    icon: '📋',
    title: '行动指南',
    desc: '提供详细的启动路线图'
  }
]

const CASE_LIST = [
  {
    name: '张先生',
    title: '程序员',
    result: '技术咨询',
    income: '月入8K+',
    avatar: '👨‍💻'
  },
  {
    name: '李女士',
    title: '设计师',
    result: '接单设计',
    income: '月入12K+',
    avatar: '👩‍🎨'
  },
  {
    name: '王先生',
    title: '产品经理',
    result: '知识付费',
    income: '月入15K+',
    avatar: '👨‍💼'
  }
]

export default function Index() {
  const [userCount, setUserCount] = useState(12345)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // 获取用户统计
    fetchUserCount()
  }, [])

  const fetchUserCount = async () => {
    try {
      // 这里调用云函数获取真实数据
      // const { result } = await Taro.cloud.callFunction({
      //   name: 'getUserCount'
      // })
      // setUserCount(result.count)
    } catch (error) {
      console.error('获取用户统计失败', error)
    }
  }

  const handleStartConsult = () => {
    setIsLoading(true)
    
    // 检查是否有未完成的咨询
    const consultationData = Taro.getStorageSync('consultation_data')
    
    if (consultationData && consultationData.currentStep) {
      Taro.showModal({
        title: '继续咨询',
        content: '检测到你之前有未完成的咨询，是否继续？',
        confirmText: '继续',
        cancelText: '重新开始',
        success: (res) => {
          if (res.confirm) {
            // 继续之前的进度
            navigateToStep(consultationData.currentStep)
          } else {
            // 清除数据，重新开始
            Taro.removeStorageSync('consultation_data')
            Taro.navigateTo({
              url: '/pages/survey/index'
            })
          }
        }
      })
    } else {
      Taro.navigateTo({
        url: '/pages/survey/index'
      })
    }
    
    setIsLoading(false)
  }

  const navigateToStep = (step: string) => {
    const stepMap: Record<string, string> = {
      'basic': '/pages/survey/basic',
      'career': '/pages/survey/career',
      'skills': '/pages/survey/skills',
      'constraints': '/pages/survey/constraints',
      'q1': '/pages/dialogue/q1',
      'q2': '/pages/dialogue/q2',
      'q3': '/pages/dialogue/q3',
      'q4': '/pages/dialogue/q4',
      'q5': '/pages/dialogue/q5',
      'q6': '/pages/dialogue/q6',
    }
    
    Taro.navigateTo({
      url: stepMap[step] || '/pages/survey/index'
    })
  }

  const handleViewEncyclopedia = () => {
    Taro.switchTab({
      url: '/pages/encyclopedia/index'
    })
  }

  return (
    <View className='index-page'>
      {/* 轮播Banner */}
      <Swiper
        className='banner-swiper'
        indicatorColor='#999'
        indicatorActiveColor='#2E5BFF'
        circular
        indicatorDots
        autoplay
      >
        {BANNER_LIST.map((banner) => (
          <SwiperItem key={banner.id}>
            <View className='banner-item'>
              <Image
                className='banner-image'
                src={banner.image}
                mode='aspectFill'
              />
              <View className='banner-content'>
                <Text className='banner-title'>{banner.title}</Text>
                <Text className='banner-subtitle'>{banner.subtitle}</Text>
              </View>
            </View>
          </SwiperItem>
        ))}
      </Swiper>

      {/* 数据统计 */}
      <View className='stats-bar'>
        <View className='stats-item'>
          <Text className='stats-number'>{userCount.toLocaleString()}+</Text>
          <Text className='stats-label'>已服务用户</Text>
        </View>
        <View className='stats-divider' />
        <View className='stats-item'>
          <Text className='stats-number'>50+</Text>
          <Text className='stats-label'>副业类型</Text>
        </View>
        <View className='stats-divider' />
        <View className='stats-item'>
          <Text className='stats-number'>85%</Text>
          <Text className='stats-label'>匹配准确率</Text>
        </View>
      </View>

      {/* 核心功能 */}
      <View className='section'>
        <Text className='section-title'>三步找到适合你的副业</Text>
        <View className='features-grid'>
          {FEATURE_LIST.map((feature, index) => (
            <View key={index} className='feature-card'>
              <Text className='feature-icon'>{feature.icon}</Text>
              <Text className='feature-title'>{feature.title}</Text>
              <Text className='feature-desc'>{feature.desc}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* 成功案例 */}
      <View className='section'>
        <Text className='section-title'>成功案例</Text>
        <View className='cases-list'>
          {CASE_LIST.map((item, index) => (
            <View key={index} className='case-card'>
              <Text className='case-avatar'>{item.avatar}</Text>
              <View className='case-info'>
                <Text className='case-name'>{item.name}</Text>
                <Text className='case-title'>{item.title}</Text>
              </View>
              <View className='case-result'>
                <Text className='case-type'>{item.result}</Text>
                <Text className='case-income'>{item.income}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* CTA按钮区 */}
      <View className='cta-section'>
        <Button
          className='btn btn-primary cta-button'
          onClick={handleStartConsult}
          loading={isLoading}
        >
          开始副业咨询
        </Button>
        <Text className='cta-subtitle'>预计用时 5-8 分钟 · 免费体验</Text>
        
        <View className='secondary-actions'>
          <Text className='link-text' onClick={handleViewEncyclopedia}>
            浏览副业百科 →
          </Text>
        </View>
      </View>

      {/* 底部说明 */}
      <View className='footer'>
        <Text className='footer-text'>基于金字塔咨询模型 · 科学匹配</Text>
      </View>
    </View>
  )
}
