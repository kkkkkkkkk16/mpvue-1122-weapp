<template>
  <div class="container">
    <CommentList v-if="userinfo.openId" type="user" :comments="comments"></CommentList>
    <div v-if="userinfo.openId">
      <div class="page-title">
        <Card v-for="book in books" :key="book.id" :book="book"></Card>
      </div>
      <div v-if="!books.length">暂时没有图书</div>
    </div>
    <div>评论页面、test</div>
  </div>
</template>

<script>
import CommentList from "@/components/CommentList";
import Card from "@/components/Card";
import { get } from "@/util";
export default {
  components: {
    CommentList,
    Card
  },
  data() {
    return {
      comments: [],
      userinfo: {},
      books: []
    };
  },
  onShow() {
    if (!this.userinfo.openId) {
      let userinfo = wx.getStorageSync("userinfo");
      if (userinfo) {
        this.userinfo = userinfo;
        this.init();
      }
    }
  },
  onPullDownRefrest() {
    this.init();
    wx.stopPullDownRefresh();
  },
  methods: {
    init() {
      wx.showNavigationBarLoading();
      this.getComments();
      this.getBooks();
      wx.hideNavigationBarLoading();
    },
    async getComments() {
      const comments = await get("/weapp/commentlist", {
        openid: this.userinfo.openId
      });
      console.log(comments);
      this.comments = comments.data.data.list;
    },
    async getBooks() {
      const books = await get("/weapp/booklist", {
        openid: this.userinfo.openId
      });
      this.books = books.data.data.list;
      console.log(books)
    }
  }
};
</script>

<style>
</style>
