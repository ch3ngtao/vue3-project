<template>
  <div id="nav">
    <!-- <head-nav /> -->
  </div>
  <div>
    <router-view />
  </div>
  <!-- <foot /> -->
</template>

<script lang="ts">
// import components from "vue-class-component";
// import foot from "@/components/foot/foot.vue";
export default {
  components: {
    // foot
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

<style lang="scss">
@import "./style/reset.css";
@import "./style/base.scss";
@media screen and (max-width: 550px) {
  html,
  body {
    font-size: 14px !important;
  }
  .nav {
    background-color: #eb1a19;
  }
}
@media screen and (min-width: 550px) {
  html,
  body {
    font-size: 16px !important;
  }
  .nav {
    background-color: #eb1a19;
  }
}
</style>
