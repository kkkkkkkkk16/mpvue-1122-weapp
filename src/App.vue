
<script>
import config from "./config";
export default {
  created() {
    console.log("aaaa");
    wx.request({
      url: config.host + "/weapp/demo", //仅为示例，并非真实的接口地址
      
      success(res) {
        console.log(res);
      }
    });
  }
};
</script>



<style>
</style>
