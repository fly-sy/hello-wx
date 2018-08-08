
module.exports = (url, data) => {
  return new Promise((resolve, reject) => {
    wx.request({
      // 请求路径
      url: `https://locally.uieee.com\/${url}`,
      // 请求的参数
      data,
      // 成功回调
      success: resolve,
      // 失败回调 
      fail: reject,
    })
  })
}
