import { useEffect } from 'react'
import Taro from '@tarojs/taro'
import './app.scss'

function App({ children }) {
  useEffect(() => {
    // 初始化云开发
    if (process.env.TARO_ENV === 'weapp') {
      Taro.cloud.init({
        env: 'your-cloud-env-id',
        traceUser: true
      })
    }

    // 检查更新
    const updateManager = Taro.getUpdateManager()
    updateManager.onCheckForUpdate((res) => {
      if (res.hasUpdate) {
        updateManager.onUpdateReady(() => {
          Taro.showModal({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用？',
            success: (res) => {
              if (res.confirm) {
                updateManager.applyUpdate()
              }
            }
          })
        })
      }
    })
  }, [])

  return children
}

export default App
