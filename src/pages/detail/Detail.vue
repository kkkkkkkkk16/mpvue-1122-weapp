<template>
  <div>
    <BookInfo :info="info"></BookInfo>
    <CommentList :comments="comments"></CommentList>
    <div v-if="showAdd" class="commont">
      <textarea v-model="comment" placeholder="输入图书评论" class="textarea" :maxlength="100"/>
      <div class="location">地理位置：
        <switch :checked="location" @change="getGeo" color="#EA5A49"/>
        <span class="text-primary">{{location}}</span>
      </div>
      <div class="phone">手机型号：
        <switch :checked="phone" @change="getPhone" color="#EA5A49"/>
        <span class="text-primary">{{phone}}</span>
      </div> 
      <button class="btn" @click="addComment">评论</button>
    </div>
    <div v-else class="text-footer">未登陆或者已经评论过了</div>
   <button open-type="share" class="btn"> 分享</button>
  </div>
</template>
<script>
import { get, post, showModal } from '@/util'
import BookInfo from '@/components/BookInfo'
import CommentList from '@/components/CommentList'
export default {
  components: {
    BookInfo,
    CommentList
  },
  data () {
    return {
      bookid: '',
      info: {},
      comment: '',
      location: '',
      phone: '',
      userinfo: {},
      comments: []
    }
  },
  methods: {
    async getComments () {
      const comments = await get('/weapp/commentlist', {
        bookid: this.bookid
      })
      this.comments = comments.data.data.list || []
      console.log(this.comments)
    },
    addComment () {
      // 评论 手机型号 地理位置 图书ID 提交人openID
      // 以上数据均挂在data()上
      if (!this.comment) {
        return false
      }
      const data = {
        comment: this.comment,
        phone: this.phone,
        location: this.location,
        bookid: this.bookid,
        openid: this.userinfo.openId
      }
      try {
        post('/weapp/addcomment', data)
        this.comment = ''
        this.getComments()
      } catch (e) {
        showModal('失败', e.msg)
      }
    },
    async getDetail () {
      const info = await get('/weapp/bookdetail', {
        id: this.bookid
      })
      wx.setNavigationBarTitle({
        title: info.data.data.title
      })
      this.info = info.data.data
      console.log(info)
    },
    getGeo (e) {
      // a77KzXtENGGEfw0RFHeagHuDiSQzMa8H
      const ak = 'a77KzXtENGGEfw0RFHeagHuDiSQzMa8H'
      let url = 'http://api.map.baidu.com/geocoder/v2/'

      if (e.target.value) {
        this.location = wx.getLocation({
          success: geo => {
            wx.request({
              url,
              data: {
                ak,
                location: `${geo.latitude},${geo.longitude}`,
                output: 'json'
              },
              success: res => {
                if (res.data.status == 0) {
                  this.location = res.data.result.addressComponent.city
                } else {
                  this.location = '未知地点'
                }
              }
            })
          }
        })
      } else {
        this.location = ''
      }
    },
    getPhone (e) {
      if (e.target.value) {
        const phoneInfo = wx.getSystemInfoSync()
        this.phone = phoneInfo.model
      } else {
        this.phone = ''
      }
    }
  },

  mounted () {
    // mpvue 自带api
    // 获取页面跳转时，在page跳转的url中所带的参数id
    let Num = this.$root.$mp.query.id
    this.bookid = parseInt(Num)
    this.getDetail()
    // 获取评论列表
    this.getComments()
    const userinfo = wx.getStorageSync('userinfo')
    if (userinfo) {
      this.userinfo = userinfo
    }
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  computed: {
    showAdd () {
      if (!this.userinfo.openId) {
        return false
      } // 若可以查询到comment中有重复的opeinid评论则返回false
      if (this.comments.filter(v => v.openid == this.userinfo.openId).length) {
        return false
      }
      return true
    }
  }
}
</script>

<style lang="less" scoped>
.commont {
  margin: 10px 0;
  .textarea {
    width: 730rpx;
    height: 200rpx;
    background: #eee;
    padding: 10px;
  }
  .location {
    margin-top: 10px;
  }
  .phone {
    margin-top: 10px;
  }
}
</style>
