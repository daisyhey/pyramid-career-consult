import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { updateCurrentStep } from '../../utils/storage'
import './dialogue.scss'

const QUESTION_PREVIEW = [
  {
    num: 'Q1',
    title: '你是谁？',
    subtitle: '自我认知',
    desc: '用一句话描述你自己（职业、性格、特点）',
    icon: '🧘'
  },
  {
    num: 'Q2',
    title: '你拥有什么？',
    subtitle: '资源盘点',
    desc: '除了技能，你还有哪些资源？',
    icon: '🎒'
  },
  {
    num: 'Q3',
    title: '你想要什么？',
    subtitle: '目标澄清',
    desc: '做副业，你最看重什么？',
    icon: '🎯'
  },
  {
    num: 'Q4',
    title: '你能承受什么？',
    subtitle: '风险评估',
    desc: '对于副业失败，你的底线是什么？',
    icon: '🛡️'
  },
  {
    num: 'Q5',
    title: '你适合什么？',
    subtitle: '性格匹配',
    desc: '什么样的副业最适合你现在的状态？',
    icon: '✨'
  },
  {
    num: 'Q6',
    title: '你愿意付出什么？',
    subtitle: '投入确认',
    desc: '为了副业，你愿意投入多少时间和精力？',
    icon: '⏰'
  }
]

export default function DialogueIndex() {
  const handleStart = () => {
    updateCurrentStep('q1')
    Taro.navigateTo({
      url: '/pages/dialogue/q1'
    })
  }

  return (
    <View className='welcome-page'>
      <View className='welcome-icon'>💭</View>
      <Text className='welcome-title'>苏格拉底式深度对话</Text>
      <Text className='welcome-subtitle'>通过6个灵魂拷问，挖掘你内心真实的副业需求</Text>

      {/* 核心价值 */}
      <View className='socrates-intro'>
        <Text className='intro-title'>你将获得</Text>
        <View className='intro-list'>
          <Text className='intro-item'>🧘 更清晰的自我认知</Text>
          <Text className='intro-item'>🎒 全面的资源盘点</Text>
          <Text className='intro-item'>🎯 明确的目标方向</Text>
          <Text className='intro-item'>✨ 精准的副业匹配</Text>
        </View>
      </View>

      {/* 6问预览 */}
      <View className='questions-preview'>
        <Text className='preview-title'>6个问题带你找到答案</Text>
        <View className='questions-grid'>
          {QUESTION_PREVIEW.map((q, index) => (
            <View key={index} className='preview-card'>
              <View className='card-header'>
                <Text className='card-icon'>{q.icon}</Text>
                <Text className='card-num'>{q.num}</Text>
              </View>
              <Text className='card-title'>{q.title}</Text>
              <Text className='card-subtitle'>{q.subtitle}</Text>
              <Text className='card-desc'>{q.desc}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* CTA */}
      <View className='btn btn-primary' onClick={handleStart}>
        <Text className='btn-text'>开始深度对话</Text>
      </View>
      <Text className='cta-desc'>预计用时 5-8 分钟</Text>
    </View>
  )
}
