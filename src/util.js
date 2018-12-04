import config from './config'

// 工具函数库
// const host = 'http://localhost:5757'

export function get (url, data) {
  return request(url, 'GET', data)
}
export function post (url, data) {
  return request(url, 'POST', data)
}
export function showSuccess (text) {
  wx.showToast({
    title: text,
    icon: 'success'
  })
}
function request (url, method, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      data,
      method,
      url: config.host + url,
      success: function (res) {
        if (res.data.code === 0) {
          resolve(res)
        } else {
          reject(res.data)
        }
      }
    })
  })
}
