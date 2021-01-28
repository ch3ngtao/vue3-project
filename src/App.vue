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
    if (
      navigator.userAgent.match(
        /(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i
      )
    ) {
      console.log("手机访问.");
    } else {
      console.log("电脑访问.");
    }
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
