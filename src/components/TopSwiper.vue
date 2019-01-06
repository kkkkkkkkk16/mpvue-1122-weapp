<template>
  <div class="swiper">
    <swiper
      :indicator-dots="true"
      indicator-color="#EA5A49"
      :autoplay="true"
      :interval="3000"
      :duration="1000"
      :circular="true"
    >
      <div :key="imgindex" v-for="(top,imgindex) in tops">
        <swiper-item>
          <img width="355" height="150" class="slide-image" mode="aspectFit" :src="top.image" alt>
        </swiper-item>
      </div>
    </swiper>
  </div>
</template>

<script>
export default {
  props: ["tops"],
};
</script>

<style>
</style>
