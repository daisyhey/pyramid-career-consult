import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import './index.scss'

const MENU_ITEMS = [
  { icon: '📋', title: '咨询历史', desc: '查看历史推荐记录', path: '/pages/profile/history' },
  { icon: '⭐', title: '我的收藏', desc: '收藏的副业类型', path: '/pages/profile/favorites' },
  { icon: '💬', title: '意见反馈', desc: '帮助我们做得更好', path: '' },
  { icon: '❓', title: '使用帮助', desc: '常见问题解答', path: '' },
  { icon: '⚙️', title: '设置', desc: '隐私、通知等', path: '' }
]

export default function ProfileIndex() {
  const [userInfo] = useState({
    nickName: '用户',
    avatarUrl: ''
  })

  const [stats] = useState({
    consultations: 0,
    favorites: 0,
    joinedDays: 1
  })

  const handleMenuClick = (path: string) => {
    if (path) {
      Taro.navigateTo({ url: path })
    } else {
      Taro.showToast({
        title: '功能开发中',
        icon: 'none'
      })
    }
  }

  return (
    <View className='profile-page'>
      {/* 用户信息卡片 */}
      <View className='user-card'>
        <View className='user-avatar'>
          <Text className='avatar-placeholder'>👤</Text>
        </View>
        <View className='user-info'>
          <Text className='user-name'>{userInfo.nickName}</Text>
          <Text className='user-id'>ID: 12345678</Text>
        </View>
      </View>

      {/* 统计数据 */}
      <View className='stats-bar'>
        <View className='stat-item'>
          <Text className='stat-value'>{stats.consultations}</Text>
          <Text className='stat-label'>咨询次数</Text>
        </View>
        <View className='stat-divider' />
        <View className='stat-item'>
          <Text className='stat-value'>{stats.favorites}</Text>
          <Text className='stat-label'>收藏副业</Text>
        </View>
        <View className='stat-divider' />
        <View className='stat-item'>
          <Text className='stat-value'>{stats.joinedDays}</Text>
          <Text className='stat-label'>加入天数</Text>
        </View>
      </View>

      {/* 功能菜单 */}
      <View className='menu-section'>
        {MENU_ITEMS.map((item, index) => (
          <View
            key={index}
            className='menu-item'
            onClick={() => handleMenuClick(item.path)}
          >
            <Text className='menu-icon'>{item.icon}</Text>
            <View className='menu-content'>
              <Text className='menu-title'>{item.title}</Text>
              <Text className='menu-desc'>{item.desc}</Text>
            </View>
            <Text className='menu-arrow'>→</Text>
          </View>
        ))}
      </View>

      {/* 版本信息 */}
      <View className='version-info'>
        <Text className='version-text'>金字塔副业咨询 v1.0.0</Text>
        <Text className='copyright'>基于金字塔咨询模型</Text>
      </View>
    </View>
  )
}
