import { View, Text, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState, useEffect } from 'react'
import SideJobCard from '../../components/SideJobCard'
import { getFavorites, removeFavorite } from '../../utils/storage'
import { getSideJobById, SIDE_JOBS } from '../../constants/sidejobs'
import './favorites.scss'

export default function ProfileFavorites() {
  const [favorites, setFavorites] = useState<string[]>([])
  const [favoriteJobs, setFavoriteJobs] = useState<any[]>([])

  useEffect(() => {
    loadFavorites()
  }, [])

  const loadFavorites = () => {
    const favIds = getFavorites()
    setFavorites(favIds)

    // 获取副业详情
    const jobs = favIds
      .map(id => getSideJobById(id))
      .filter(Boolean)
    setFavoriteJobs(jobs)
  }

  const handleRemove = (jobId: string, e: any) => {
    e.stopPropagation()

    Taro.showModal({
      title: '取消收藏',
      content: '确定要取消收藏这个副业吗？',
      success: (res) => {
        if (res.confirm) {
          removeFavorite(jobId)
          loadFavorites()
          Taro.showToast({ title: '已取消收藏', icon: 'success' })
        }
      }
    })
  }

  const handleJobClick = (job: any) => {
    Taro.navigateTo({
      url: `/pages/encyclopedia/detail?id=${job.id}`
    })
  }

  if (favoriteJobs.length === 0) {
    return (
      <View className='favorites-page empty'>
        <Text className='empty-icon'>⭐</Text>
        <Text className='empty-title'>暂无收藏</Text>
        <Text className='empty-desc'>收藏的副业会显示在这里</Text>
        <View className='btn btn-primary' onClick={() => Taro.switchTab({ url: '/pages/encyclopedia/index' })}>
          <Text className='btn-text'>去浏览百科</Text>
        </View>
      </View>
    )
  }

  return (
    <View className='favorites-page'>
      {/* 头部 */}
      <View className='favorites-header'>
        <Text className='header-title'>我的收藏</Text>
        <Text className='header-subtitle'>共 {favoriteJobs.length} 个收藏</Text>
      </View>

      {/* 列表 */}
      <ScrollView className='favorites-list' scrollY>
        {favoriteJobs.map((job) => (
          <View key={job.id} className='favorite-item'>
            <SideJobCard
              sideJob={job}
              onClick={() => handleJobClick(job)}
            />
            <View
              className='remove-btn'
              onClick={(e) => handleRemove(job.id, e)}
            >
              <Text className='remove-icon'>✕</Text>
              <Text className='remove-text'>取消收藏</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}
