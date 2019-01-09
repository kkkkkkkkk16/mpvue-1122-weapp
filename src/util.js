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
export function showModal (title, content) {
  wx.showModal({
    title,
    content,
    showCancel: false
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
          // 添加重复图书时，提示已经存在图书

          showModal('Warrning', res.data.data.msg)
          reject(res.data)
        }
      }
    })
  })
}
