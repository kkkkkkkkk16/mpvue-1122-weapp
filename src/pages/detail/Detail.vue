<template>
  <div>
    <div>id{{bookid}}</div>
    <BookInfo :info="info"></BookInfo>
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
      info: {}
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

<style>
</style>
