import { View, Text } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { useState, useEffect } from 'react'
import ProgressBar from '../../components/ProgressBar'
import OptionSelector from '../../components/OptionSelector'
import { saveConsultationData, updateCurrentStep, getConsultationData } from '../../utils/storage'
import './basic.scss'

const AGE_OPTIONS = [
  { label: '18-25岁', value: '18-25' },
  { label: '26-30岁', value: '26-30' },
  { label: '31-35岁', value: '31-35' },
  { label: '36-40岁', value: '36-40' },
  { label: '40岁以上', value: '40+' }
]

const CITY_OPTIONS = [
  { label: '一线城市（北上广深）', value: 'tier1' },
  { label: '新一线城市（杭蓉武等）', value: 'new-tier1' },
  { label: '二线城市', value: 'tier2' },
  { label: '三四线城市', value: 'tier3-4' },
  { label: '县城/乡镇', value: 'town' }
]

const EDUCATION_OPTIONS = [
  { label: '高中及以下', value: 'high-school' },
  { label: '大专', value: 'college' },
  { label: '本科', value: 'bachelor' },
  { label: '硕士', value: 'master' },
  { label: '博士', value: 'phd' }
]

export default function SurveyBasic() {
  const [age, setAge] = useState('')
  const [city, setCity] = useState('')
  const [education, setEducation] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useLoad(() => {
    // 加载已保存的数据
    const data = getConsultationData()
    if (data?.basicInfo) {
      setAge(data.basicInfo.age?.toString() || '')
      setCity(data.basicInfo.city || '')
      setEducation(data.basicInfo.education || '')
    }
    updateCurrentStep('basic')
  })

  const isValid = () => {
    return age && city && education
  }

  const handleNext = () => {
    if (!isValid()) {
      Taro.showToast({
        title: '请完善所有信息',
        icon: 'none'
      })
      return
    }

    setIsLoading(true)

    // 保存数据
    saveConsultationData({
      basicInfo: {
        age: parseInt(age),
        city,
        education
      }
    })

    // 跳转下一步
    Taro.navigateTo({
      url: '/pages/survey/career'
    })

    setIsLoading(false)
  }

  return (
    <View className='survey-page'>
      <ProgressBar current={1} total={10} />

      <View className='survey-content'>
        {/* 标题区 */}
        <View className='survey-header'>
          <Text className='step-badge'>步骤 1/4</Text>
          <Text className='survey-title'>基础信息</Text>
          <Text className='survey-subtitle'>让我们先了解你的基本情况</Text>
        </View>

        {/* 问题1: 年龄段 */}
        <View className='question-card'>
          <View className='question-header'>
            <Text className='question-number'>Q1</Text>
            <Text className='question-title'>你的年龄段？</Text>
          </View>
          <OptionSelector
            type='single'
            options={AGE_OPTIONS}
            value={age}
            onChange={setAge}
          />
        </View>

        {/* 问题2: 城市 */}
        <View className='question-card'>
          <View className='question-header'>
            <Text className='question-number'>Q2</Text>
            <Text className='question-title'>你所在的城市？</Text>
          </View>
          <OptionSelector
            type='single'
            options={CITY_OPTIONS}
            value={city}
            onChange={setCity}
          />
        </View>

        {/* 问题3: 学历 */}
        <View className='question-card'>
          <View className='question-header'>
            <Text className='question-number'>Q3</Text>
            <Text className='question-title'>你的最高学历？</Text>
          </View>
          <OptionSelector
            type='single'
            options={EDUCATION_OPTIONS}
            value={education}
            onChange={setEducation}
          />
        </View>
      </View>

      {/* 底部按钮 */}
      <View className='survey-footer'>
        <View
          className={`btn btn-primary ${!isValid() ? 'btn-disabled' : ''}`}
          onClick={handleNext}
        >
          <Text className='btn-text'>下一步</Text>
        </View>
        <Text className='footer-tip'>填写完成后自动保存</Text>
      </View>
    </View>
  )
}
