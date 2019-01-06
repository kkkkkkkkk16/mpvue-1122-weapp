<template>
  <div>id{{bookid}}</div>
</template>
<script>
import {get} from   "@/util";
export default {
  data() {
    return {
      bookid: ""
    };
  },
  methods: {
    async getDetail() {
      const info = await get("/weapp/bookdetail", { 
          id: this.bookid 
          });
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
