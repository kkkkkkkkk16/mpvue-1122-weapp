<template>
  <div>
    个人中心
    <div class="container">
      <div class="userinfo">
        <img   :src="userInfo.avatarUrl" alt="">
        <p>{{userInfo.nickName}}</p>
        <YearProgress>

        </YearProgress>
        <button class="button">添加图书</button>
      </div>
    </div>
    <button open-type="getUserInfo" lang="zh_CN" class='btn' @getuserinfo="login">点击登录</button>
  </div>

</template>

<script>

  import config from "../../config";
  import { showSuccess } from "../../util";

  const qcloud = require("wafer2-client-sdk");
  export default {
    data() {
      return { userInfo: {} };
    },
    onload() {
      // 这个时候 不行，可能与生命周期有关系
      // this.getSetting()
    },
    mounted() {
      // 一进来看看用户是否授权过
      // this.getSetting();
    },
    created() {
      this.userInfo = wx.getStorageSync("userInfo");
    }
    ,
    methods: {
      login() {
        qcloud.setLoginUrl(config.loginUrl);
        wx.showToast({
          title: "登录中",
          icon: "loading"
        });
        const session = qcloud.Session.get();
        if (session) {
          qcloud.loginWithCode({
            success: res => {
              console.log("没过期的登录", res);
              // this.loginSuccess(res);
              showSuccess("login success");
              wx.setStorageSync("userInfo", res);
            },
            fail: err => {
              console.error(err);
            }
          });
        } else {
          qcloud.login({
            success: res => {
              console.log("登录成功", res);

              showSuccess("login success");
              // this.loginSuccess(res);
              wx.setStorageSync("userinfo", res);
            },
            fail: err => {
              console.error(err);
            }
          });
        }
      }
    }
  };
</script>

<style lang="sass">

.container {
  padding : 0 30 rpx;
}

</style>
