<template>
  <div>
    <div :key="book.id" v-for="book in books">{{book.title}}</div>
  </div>
</template>



<script>
import { get } from "@/util";
export default {
  data() {
    return {
      books: []
    };
  },
  methods: {
    async getList() {
      const booklist = await get("/weapp/booklist");
      this.books = booklist.data.data.list;
      console.log(booklist)
    }
  },
  mounted() {
    this.getList();
  }
};
</script>

<style>
</style>
