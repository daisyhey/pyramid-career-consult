import { View, Text, Input } from '@tarojs/components'
import { useState } from 'react'
import './index.scss'

export interface Option {
  label: string
  value: string
  icon?: string
}

interface OptionSelectorProps {
  type: 'single' | 'multiple' | 'input'
  options?: Option[]
  value?: string | string[]
  placeholder?: string
  onChange: (value: string | string[]) => void
}

export default function OptionSelector({
  type,
  options = [],
  value,
  placeholder = '请输入',
  onChange
}: OptionSelectorProps) {
  const [inputValue, setInputValue] = useState('')

  const isSelected = (optionValue: string) => {
    if (type === 'single') {
      return value === optionValue
    }
    if (type === 'multiple') {
      return Array.isArray(value) && value.includes(optionValue)
    }
    return false
  }

  const handleSelect = (optionValue: string) => {
    if (type === 'single') {
      onChange(optionValue)
    } else if (type === 'multiple') {
      const currentValues = Array.isArray(value) ? value : []
      if (currentValues.includes(optionValue)) {
        onChange(currentValues.filter(v => v !== optionValue))
      } else {
        onChange([...currentValues, optionValue])
      }
    }
  }

  const handleInputChange = (e) => {
    const val = e.detail.value
    setInputValue(val)
    onChange(val)
  }

  if (type === 'input') {
    return (
      <View className='option-selector-input'>
        <Input
          className='selector-input'
          type='text'
          placeholder={placeholder}
          value={typeof value === 'string' ? value : inputValue}
          onInput={handleInputChange}
        />
      </View>
    )
  }

  return (
    <View className='option-selector'>
      {options.map((option) => (
        <View
          key={option.value}
          className={`option-item ${isSelected(option.value) ? 'selected' : ''}`}
          onClick={() => handleSelect(option.value)}
        >
          {type === 'multiple' && (
            <View className={`checkbox ${isSelected(option.value) ? 'checked' : ''}`}>
              {isSelected(option.value) && <Text className='check-icon'>✓</Text>}
            </View>
          )}
          {type === 'single' && (
            <View className={`radio ${isSelected(option.value) ? 'checked' : ''}`} />
          )}
          {option.icon && <Text className='option-icon'>{option.icon}</Text>}
          <Text className='option-label'>{option.label}</Text>
        </View>
      ))}
    </View>
  )
}
