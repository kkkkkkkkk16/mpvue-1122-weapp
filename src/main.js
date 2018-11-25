import Vue from 'vue'
import App from './App'

// Vue.config.productionTip = false;
// 实例化App
const app = new Vue(App)
// 挂载app
app.$mount()
export default {
  // 就是暴露给小程序的window.config  是小程序官方文档的 app.json配置
  //  config: {
  //     "window":{
  //       "backgroundTextStyle":"black",
  //       "navigationBarBackgroundColor": "#000",
  //         "navigationBarTitleText": "11",
  //       "navigationBarTextStyle":"black"
  //     }
  //   }
}
