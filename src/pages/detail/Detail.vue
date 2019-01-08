<template>
  <div>
    <div>id{{bookid}}</div>
    <BookInfo :info="info"></BookInfo>
    <div class="commont">
      <textarea
        v-model="comment"
        placeholder="输入图书评论"
        class="textarea"
        :maxlength="100"
        auto-focus
      />
      <div class="location">地理位置：
        <switch :checked="location" @change="getGeo" color="#EA5A49"/>
        <span class="text-primary">{{location}}</span>
      </div>
      <div class="phone">手机型号：
        <switch :checked="phone" @change="getPhone" color="#EA5A49"/>
        <span class="text-primary">{{phone}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { get } from "@/util";
import BookInfo from "@/components/BookInfo";
export default {
  components: {
    BookInfo
  },
  data() {
    return {
      bookid: "",
      info: {},
      comment: "",
      location: "",
      phone: ""
    };
  },
  methods: {
    async getDetail() {
      const info = await get("/weapp/bookdetail", {
        id: this.bookid
      });
      wx.setNavigationBarTitle({
        title: info.data.data.title
      });
      this.info = info.data.data;
      console.log(info);
    },
    getGeo(e) {
      // a77KzXtENGGEfw0RFHeagHuDiSQzMa8H
      const ak = "a77KzXtENGGEfw0RFHeagHuDiSQzMa8H";
      let url = "http://api.map.baidu.com/geocoder/v2/";

      if (e.target.value) {
        this.location = wx.getLocation({
          success: geo => {
            wx.request({
              url,
              data: {
                ak,
                location: `${geo.latitude},${geo.longitude}`,
                output: "json"
              },
              success: res => {
                if(res.data.status == 0){
                  this.location = res.data.result.addressComponent.city
                console.log(res.data.result.addressComponent);
          
                }else{
                  this.location= "未知地点"
                }
                    }
            });

            console.log(geo);
          }
        });
      } else {
        this.location = "";
      }
    },
    getPhone(e) {
      if (e.target.value) {
        const phoneInfo = wx.getSystemInfoSync();
        this.phone = phoneInfo.model;
        console.log(phoneInfo);
      } else {
        this.phone = "";
      }
    }
  },

  mounted() {
    // mpvue 自带api
    let Num = this.$root.$mp.query.id;
    this.bookid = parseInt(Num);
    this.getDetail();
  }
};
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
