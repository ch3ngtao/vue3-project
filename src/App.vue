<template>
  <div id="nav">
      <head-nav />
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view />
</template>

<script lang="ts">
import components from "vue-class-component";
import header from "@/components/head/head.vue"
export default {
    components: {
        "head-nav": header
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
@import './style/reset.css';
@import './style/base.scss';
@media screen and (max-width: 500px) {
    .nav {
        background-color: #eb1a19;
    }
}
</style>
