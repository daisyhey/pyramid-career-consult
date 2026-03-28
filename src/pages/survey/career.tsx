import { View, Text, Input } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { useState } from 'react'
import ProgressBar from '../../components/ProgressBar'
import OptionSelector from '../../components/OptionSelector'
import { saveConsultationData, updateCurrentStep, getConsultationData } from '../../utils/storage'
import './career.scss'

const INDUSTRY_OPTIONS = [
  { label: '互联网/IT', value: 'internet' },
  { label: '金融/银行', value: 'finance' },
  { label: '教育/培训', value: 'education' },
  { label: '医疗/健康', value: 'healthcare' },
  { label: '制造/实业', value: 'manufacturing' },
  { label: '零售/电商', value: 'retail' },
  { label: '房地产/建筑', value: 'realestate' },
  { label: '服务业', value: 'service' },
  { label: '体制内/公务员', value: 'government' },
  { label: '其他', value: 'other' }
]

const WORK_YEARS_OPTIONS = [
  { label: '应届生/1年以内', value: 0.5 },
  { label: '1-3年', value: 2 },
  { label: '3-5年', value: 4 },
  { label: '5-10年', value: 7.5 },
  { label: '10年以上', value: 12 }
]

const SCHEDULE_OPTIONS = [
  { label: '965 固定坐班', value: 'fixed' },
  { label: '偶尔加班', value: 'occasional-ot' },
  { label: '经常加班/996', value: 'frequent-ot' },
  { label: '弹性工作', value: 'flexible' },
  { label: '远程办公', value: 'remote' }
]

const STABILITY_OPTIONS = [
  { label: '很稳定，从不担心失业', value: 'high' },
  { label: '基本稳定，偶尔担心', value: 'medium' },
  { label: '不稳定，经常担心', value: 'low' }
]

export default function SurveyCareer() {
  const [industry, setIndustry] = useState('')
  const [position, setPosition] = useState('')
  const [workYears, setWorkYears] = useState<number | ''>('')
  const [schedule, setSchedule] = useState('')
  const [stability, setStability] = useState('')

  useLoad(() => {
    const data = getConsultationData()
    if (data?.careerInfo) {
      setIndustry(data.careerInfo.industry || '')
      setPosition(data.careerInfo.position || '')
      setWorkYears(data.careerInfo.workYears || '')
      setSchedule(data.careerInfo.workSchedule || '')
      setStability(data.careerInfo.jobStability || '')
    }
    updateCurrentStep('career')
  })

  const isValid = () => {
    return industry && position && workYears !== '' && schedule && stability
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
      careerInfo: {
        industry,
        position,
        workYears: workYears as number,
        workSchedule: schedule,
        jobStability: stability as 'high' | 'medium' | 'low'
      }
    })

    Taro.navigateTo({
      url: '/pages/survey/skills'
    })
  }

  const handlePrev = () => {
    Taro.navigateBack()
  }

  return (
    <View className='survey-page'>
      <ProgressBar current={2} total={10} />

      <View className='survey-content'>
        <View className='survey-header'>
          <Text className='step-badge'>步骤 2/4</Text>
          <Text className='survey-title'>职业背景</Text>
          <Text className='survey-subtitle'>了解你的工作经验和现状</Text>
        </View>

        {/* 行业 */}
        <View className='question-card'>
          <View className='question-header'>
            <Text className='question-number'>Q1</Text>
            <Text className='question-title'>你所在的行业？</Text>
          </View>
          <OptionSelector
            type='single'
            options={INDUSTRY_OPTIONS}
            value={industry}
            onChange={setIndustry}
          />
        </View>

        {/* 职位 */}
        <View className='question-card'>
          <View className='question-header'>
            <Text className='question-number'>Q2</Text>
            <Text className='question-title'>你的职位/岗位？</Text>
          </View>
          <Input
            className='input-field'
            placeholder='例如：产品经理、销售经理、护士'
            value={position}
            onInput={(e) => setPosition(e.detail.value)}
          />
        </View>

        {/* 工作年限 */}
        <View className='question-card'>
          <View className='question-header'>
            <Text className='question-number'>Q3</Text>
            <Text className='question-title'>你的工作年限？</Text>
          </View>
          <OptionSelector
            type='single'
            options={WORK_YEARS_OPTIONS.map(opt => ({ ...opt, value: String(opt.value) }))}
            value={String(workYears)}
            onChange={(val) => setWorkYears(Number(val))}
          />
        </View>

        {/* 工作性质 */}
        <View className='question-card'>
          <View className='question-header'>
            <Text className='question-number'>Q4</Text>
            <Text className='question-title'>你的工作性质？</Text>
          </View>
          <OptionSelector
            type='single'
            options={SCHEDULE_OPTIONS}
            value={schedule}
            onChange={setSchedule}
          />
        </View>

        {/* 稳定性 */}
        <View className='question-card'>
          <View className='question-header'>
            <Text className='question-number'>Q5</Text>
            <Text className='question-title'>你对自己工作的稳定性评价？</Text>
          </View>
          <OptionSelector
            type='single'
            options={STABILITY_OPTIONS}
            value={stability}
            onChange={setStability}
          />
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
            <Text className='btn-text'>下一步</Text>
          </View>
        </View>
      </View>
    </View>
  )
}
