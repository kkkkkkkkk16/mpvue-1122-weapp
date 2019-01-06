<template>
 <div class="progressbar">jindutiao
   <progress :percent="percent" activeColor="#EA5A49" show-info />
   <p>  {{year}} 年已经过去了{{days}}天 </p>
 </div>

</template>

<script>
  export default {
    methods: {
      isLeapYear () {
        let year = new Date().getFullYear()
        if (year % 400 === 0) {
          return true
        } else if (year % 4 === 0 && year % 100 !== 0) {
          return true
        } else {
          return false
        }
      },
      getDayOfYear () {
        return this.isLeapYear() ? 366 : 365
      }
    },
    computed: {
      year () {
        return new Date().getFullYear()
      },
      days () {
        let start = new Date()
        start.setMonth(0)
        start.setDate(1)
        let offset = new Date().getTime() - start.getTime()
        return parseInt(offset / 1000 / 60 / 60 / 24) + 1
      },
      percent () {
        return (this.days / this.getDayOfYear() * 100).toFixed(1)
      }
    }
  }
</script>

<style >
.progressbar{
  width: 100%;
}
  .progressbar{
    text-align: center;
    margin-top: 10px;
  }
</style>
