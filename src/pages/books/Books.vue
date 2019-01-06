<template>
  <div>
    <TopSwiper :tops='tops'>
    </TopSwiper>
    <Card :key="book.id" v-for="book in books" :book="book"></Card>
    <p class="text-footer" v-if="!more">数据到底</p>
  </div>
</template>

<script>
import Card from "@/components/Card";
import { get } from "@/util";
import TopSwiper from '@/components/TopSwiper';
export default {
  components: {
    Card,
    TopSwiper
  },
  data() {
    return {
      books: [],
      page: 0,
      more: true,
      tops:[]
    };
  },
  methods: {
    /**
     * @init 是否为初始化，初始化请求时，为ture，请求第一页数据
     */
    async getList(init) {
      if (init) {
        this.page = 1;
        this.more = true;
      }
      wx.showNavigationBarLoading();
      const booklist = await get("/weapp/booklist", { page: this.page });

      if (this.books.length < 10 && this.page > 0) {
        this.more = false;
      }
      if (init) {
        this.books = booklist.data.data.list;
        console.log(booklist.data.data.list);
        wx.stopPullDownRefresh();
      } else {
        this.books = this.books.concat(booklist.data.data.list);
      }
      wx.hideNavigationBarLoading();
    },
    async getTop(){
      const tops = get('/weapp/top')
      this.tops = tops.data.list;
      console.log(tops.data.list)
    }
  },
  mounted() {
    this.getList(true);
    this.getTop();
  },
  onPullDownRefresh() {
    this.getList(true);
    this.getTop();
  },
  onReachBottom() {
    if (this.more) {
      return false;
    }
    this.page = this.page + 1;
    this.getList();
  }
};
</script>

<style lang='sass'>
</style>
