import { View, Text, Input } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { CATEGORY_MAP } from '../../constants/sidejobs'
import './index.scss'

const CATEGORIES = [
  { ...CATEGORY_MAP.skill, count: 15, color: '#2E5BFF' },
  { ...CATEGORY_MAP.content, count: 15, color: '#22c55e' },
  { ...CATEGORY_MAP.resource, count: 10, color: '#f59e0b' },
  { ...CATEGORY_MAP.network, count: 10, color: '#8b5cf6' }
]

const HOT_JOBS = [
  { name: '小红书博主', trend: '+45%' },
  { name: '独立开发', trend: '+32%' },
  { name: '知识付费', trend: '+28%' },
  { name: '短视频创作', trend: '+56%' },
  { name: '电商选品', trend: '+23%' }
]

export default function EncyclopediaIndex() {
  const handleCategoryClick = (category: string) => {
    Taro.navigateTo({
      url: `/pages/encyclopedia/list?category=${category}`
    })
  }

  const handleSearch = () => {
    Taro.showToast({
      title: '搜索功能开发中',
      icon: 'none'
    })
  }

  return (
    <View className='encyclopedia-page'>
      {/* 头部 */}
      <View className='encyclo-header'>
        <Text className='header-title'>副业百科全书</Text>
        <Text className='header-subtitle'>50+ 副业类型，总有一款适合你</Text>
      </View>

      {/* 搜索框 */}
      <View className='search-section'>
        <View className='search-bar' onClick={handleSearch}>
          <Text className='search-icon'>🔍</Text>
          <Text className='search-placeholder'>搜索副业名称或技能...</Text>
        </View>
      </View>

      {/* 四大类型 */}
      <View className='categories-section'>
        <Text className='section-title'>四大类型</Text>
        <View className='categories-grid'>
          {CATEGORIES.map((cat) => (
            <View
              key={cat.name}
              className='category-card'
              style={{ borderColor: cat.color }}
              onClick={() => handleCategoryClick(cat.name === '技能驱动型' ? 'skill' : cat.name === '内容驱动型' ? 'content' : cat.name === '资源信息差型' ? 'resource' : 'network')}
            >
              <Text className='category-icon'>{cat.icon}</Text>
              <Text className='category-name'>{cat.name}</Text>
              <Text className='category-desc'>{cat.desc}</Text>
              <Text className='category-count' style={{ color: cat.color }}>{cat.count} 种副业</Text>
            </View>
          ))}
        </View>
      </View>

      {/* 热门副业 */}
      <View className='hot-section'>
        <View className='section-header'>
          <Text className='section-title'>🔥 热门副业趋势</Text>
          <Text className='section-more'>查看全部 →</Text>
        </View>
        <View className='hot-list'>
          {HOT_JOBS.map((job, index) => (
            <View key={index} className='hot-item'>
              <View className='rank-badge'>{index + 1}</View>
              <Text className='job-name'>{job.name}</Text>
              <Text className='trend-tag'>↑ {job.trend}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* CTA */}
      <View className='encyclo-cta'>
        <Text className='cta-text'>不确定选哪个？</Text>
        <View className='btn btn-primary' onClick={() => Taro.switchTab({ url: '/pages/index/index' })}>
          <Text className='btn-text'>让AI帮你匹配 →</Text>
        </View>
      </View>
    </View>
  )
}
