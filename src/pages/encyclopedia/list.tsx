import { View, Text, ScrollView } from '@tarojs/components'
import Taro, { useLoad, useRouter } from '@tarojs/taro'
import { useState, useMemo } from 'react'
import SideJobCard from '../../components/SideJobCard'
import { SIDE_JOBS, CATEGORY_MAP, SideJobCategory } from '../../constants/sidejobs'
import './list.scss'

type SortType = 'default' | 'difficulty' | 'income' | 'cycle'
type FilterType = 'all' | 'easy' | 'medium' | 'hard'

export default function EncyclopediaList() {
  const router = useRouter()
  const [category, setCategory] = useState<SideJobCategory>('skill')
  const [sortBy, setSortBy] = useState<SortType>('default')
  const [filterBy, setFilterBy] = useState<FilterType>('all')

  useLoad(() => {
    const { category: cat } = router.params
    if (cat && ['skill', 'content', 'resource', 'network'].includes(cat)) {
      setCategory(cat as SideJobCategory)
    }
  })

  // 过滤和排序副业
  const filteredJobs = useMemo(() => {
    let jobs = SIDE_JOBS.filter(job => job.category === category)

    // 应用筛选
    if (filterBy !== 'all') {
      const difficultyMap = { easy: [1, 2], medium: [3], hard: [4, 5] }
      const allowedDifficulties = difficultyMap[filterBy]
      jobs = jobs.filter(job => allowedDifficulties.includes(job.difficulty))
    }

    // 应用排序
    switch (sortBy) {
      case 'difficulty':
        jobs = jobs.sort((a, b) => a.difficulty - b.difficulty)
        break
      case 'income':
        jobs = jobs.sort((a, b) => b.incomePotential - a.incomePotential)
        break
      case 'cycle':
        // 简单的排序，实际应该解析启动周期
        jobs = jobs.sort((a, b) => a.startupCycle.localeCompare(b.startupCycle))
        break
      default:
        // 默认排序保持原顺序
        break
    }

    return jobs
  }, [category, sortBy, filterBy])

  const categoryInfo = CATEGORY_MAP[category]

  const handleJobClick = (sideJob: any) => {
    Taro.navigateTo({
      url: `/pages/encyclopedia/detail?id=${sideJob.id}`
    })
  }

  return (
    <View className='list-page'>
      {/* 头部 */}
      <View className='list-header'>
        <View className='category-info'>
          <Text className='category-icon'>{categoryInfo.icon}</Text>
          <View className='category-text'>
            <Text className='category-name'>{categoryInfo.name}</Text>
            <Text className='category-count'>{filteredJobs.length} 个副业</Text>
          </View>
        </View>
        <Text className='category-desc'>{categoryInfo.desc}</Text>
      </View>

      {/* 筛选栏 */}
      <View className='filter-bar'>
        <View className='filter-section'>
          <Text className='filter-label'>排序</Text>
          <View className='filter-options'>
            {[
              { key: 'default', label: '综合' },
              { key: 'difficulty', label: '难度' },
              { key: 'income', label: '收入' },
              { key: 'cycle', label: '周期' }
            ].map((opt) => (
              <View
                key={opt.key}
                className={`filter-chip ${sortBy === opt.key ? 'active' : ''}`}
                onClick={() => setSortBy(opt.key as SortType)}
              >
                <Text>{opt.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View className='filter-section'>
          <Text className='filter-label'>难度</Text>
          <View className='filter-options'>
            {[
              { key: 'all', label: '全部' },
              { key: 'easy', label: '简单' },
              { key: 'medium', label: '中等' },
              { key: 'hard', label: '困难' }
            ].map((opt) => (
              <View
                key={opt.key}
                className={`filter-chip ${filterBy === opt.key ? 'active' : ''}`}
                onClick={() => setFilterBy(opt.key as FilterType)}
              >
                <Text>{opt.label}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* 列表 */}
      <ScrollView className='job-list' scrollY>
        {filteredJobs.length === 0 ? (
          <View className='empty-state'>
            <Text className='empty-icon'>🔍</Text>
            <Text className='empty-text'>暂无符合条件的副业</Text>
          </View>
        ) : (
          filteredJobs.map((job) => (
            <SideJobCard
              key={job.id}
              sideJob={job}
              onClick={() => handleJobClick(job)}
            />
          ))
        )}
      </ScrollView>
    </View>
  )
}
