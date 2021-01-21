<template>
  <div id="nav">
    <!-- <head-nav /> -->
  </div>
  <div class="content">
    <router-view />
  </div>
  <foot />
</template>

<script lang="ts">
// import components from "vue-class-component";
import foot from "@/components/foot/foot.vue";
export default {
  components: {
    foot
  },
  setup() {
    //设置根元素字体大小
    // const getScreenWidth = () => {
    //   document.documentElement.style.fontSize =
    //     document.documentElement.clientWidth / 10 + "px";
    //   console.log(document.documentElement.style.fontSize);
    // };
    // window.addEventListener("resize", () => {
    //   document.documentElement.style.fontSize =
    //     document.documentElement.clientWidth / 10 + "px";
    //   getScreenWidth();
    // });
  }
};
</script>

<style lang="scss" scoped>
@import "./style/reset.css";
@import "./style/base.scss";
@media screen and (max-width: 500px) {
  html {
    font-size: 100px !important;
  }
  .nav {
    background-color: #eb1a19;
  }
  .content {
  }
}
@media screen and (min-width: 500px) {
  html {
    font-size: 100px !important;
  }
  .nav {
    background-color: #eb1a19;
  }
  .content {
    margin: 0 auto;
    width: 1160px;
  }
}
</style>
