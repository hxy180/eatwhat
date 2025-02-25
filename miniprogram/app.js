App({
  globalData: {
    // 全局数据状态
    userInfo: null,
    lastRecommendation: null
  },

  onLaunch() {
    // 小程序启动时执行，可以在这里进行初始化操作
    console.log('小程序启动')
  },

  onShow() {
    // 小程序显示时执行
  },

  onHide() {
    // 小程序隐藏时执行
  },

  // 全局方法
  updateLastRecommendation(food) {
    this.globalData.lastRecommendation = food
  }
})