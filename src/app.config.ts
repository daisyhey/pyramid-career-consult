export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/survey/index',
    'pages/survey/basic',
    'pages/survey/career',
    'pages/survey/skills',
    'pages/survey/constraints',
    'pages/dialogue/index',
    'pages/dialogue/q1',
    'pages/dialogue/q2',
    'pages/dialogue/q3',
    'pages/dialogue/q4',
    'pages/dialogue/q5',
    'pages/dialogue/q6',
    'pages/result/index',
    'pages/result/detail',
    'pages/result/report',
    'pages/encyclopedia/index',
    'pages/encyclopedia/list',
    'pages/encyclopedia/detail',
    'pages/profile/index',
    'pages/profile/history',
    'pages/profile/favorites',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '金字塔副业咨询',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#999',
    selectedColor: '#2E5BFF',
    backgroundColor: '#fff',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: 'assets/icons/home.png',
        selectedIconPath: 'assets/icons/home-active.png'
      },
      {
        pagePath: 'pages/encyclopedia/index',
        text: '百科',
        iconPath: 'assets/icons/book.png',
        selectedIconPath: 'assets/icons/book-active.png'
      },
      {
        pagePath: 'pages/profile/index',
        text: '我的',
        iconPath: 'assets/icons/user.png',
        selectedIconPath: 'assets/icons/user-active.png'
      }
    ]
  },
  cloud: true
})
