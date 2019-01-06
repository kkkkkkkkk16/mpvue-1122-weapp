<template>
  <div>
    <Card :key="book.id" v-for="book in books" :book="book"></Card>
  </div>
</template>



<script>
import Card from "@/components/Card";
import { get } from "@/util";
export default {
  components: {
    Card
  },
  data() {
    return {
      books: []
    };
  },
  methods: {
    async getList() {
      wx.showNavigationBarLoading()
      const booklist = await get("/weapp/booklist");
      this.books = booklist.data.data.list;
      console.log(booklist.data.data.list);
      wx.stopPullDownRefresh()
      wx.hideNavigationBarLoading()
    }
  },
  mounted() {
    this.getList();
  },
  onPullDownRefresh(){
    this.getList()
    
  }
};
</script>

<style lang='sass'>
</style>
