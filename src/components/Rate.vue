<template>
  <div class='rate'>
    <span>☆☆☆☆☆</span>
    <div class="hollow" :style='style'>
      ★★★★★
    </div>
    
  </div>
</template>
<script>
export default {
  //以对象方法，强制要求验证pr
  //ops传入参数的数据类型为Number或String

  props: {
    value: {
      type: [Number, String],
      default: "0"
    }
  },
  //计算属性：监控数据变化，将多个数据的变换记性计算
  // 实现多数据的双向绑定
  computed: {
    style() {
      return `width:${this.value*10}%`;
    }
  }
};
</script>
<style lang='scss'>
.rate{
  position: relative;
  display: inline-block;
  .hollow{
    position: absolute;
    display: inline-block;
    top:0;
    left:0;
    width:0;
    overflow:hidden;
  }
}
</style>


