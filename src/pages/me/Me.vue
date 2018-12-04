<template>
  <div>
    个人中心
    <div class="container">
      <div class="userinfo">
        <img class="userinfo-img" :src="userinfo.avatarUrl" alt="">
        <p>{{userinfo.nickName}}</p>
        <YearProgress></YearProgress>
        <button @click="scanBook" class="btn">添加图书</button>
      </div>
    </div>
    <button v-if="!userinfo" open-type="getUserInfo" lang="zh_CN" class='btn' @getuserinfo="login">点击登录</button>
  </div>

</template>

<script>
  import config from '@/config'
import { showSuccess, post } from '@/util'
import YearProgress from '@/components/YearProgress'

const qcloud = require('wafer2-client-sdk')
export default {
    components: {
      YearProgress
    },
    data () {
      return { userinfo: {} }
    },
    onload () {
      // 这个时候 不行，可能与生命周期有关系
      // this.getSetting()
    },
    mounted () {
      // 一进来看看用户是否授权过
      // this.getSetting();
    },
    created () {
      this.userinfo = wx.getStorageSync('userinfo')
    },
    methods: {
      async addBook (isbn) {
        const res = await post('/weapp/addbook', {
          isbn,
          openid: this.userinfo.openId
        })
        if (res.code === 0 && res.data.title) {
          showSuccess('添加成功', `${res.data.title}添加成功`)
        } else {
          console.log(res)
        }
      },
      scanBook () {
        wx.scanCode({
          success: (res) => {
            if (res.result) {
              this.addBook(res.result)
            }
            console.log(res)
          }
        })
      },
      login () {
        qcloud.setLoginUrl(config.loginUrl)
        wx.showToast({
          title: '登录中',
          icon: 'loading'
        })
        const session = qcloud.Session.get()
        if (session) {
          qcloud.loginWithCode({
            success: res => {
              console.log('没过期的登录', res)
              showSuccess('login success')
              wx.setStorageSync('userinfo', res)
            },
            fail: err => {
              console.error(err)
            }
          })
        } else {
          qcloud.login({
            success: res => {
              console.log('登录成功', res)

              showSuccess('login success')
              // this.loginSuccess(res);
              wx.setStorageSync('userinfo', res)
            },
            fail: err => {
              console.error(err)
            }
          })
        }
      }
    }
  }
</script>

<style>

  .container {
    padding: 0 30 rpx;
    text-align: center;
  }

  .userinfo-img {
    width: 128rpx;
    height: 128rpx;
    margin: 58rpx;
    border-radius: 50%;
  }
</style>
