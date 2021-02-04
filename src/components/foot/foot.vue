<template>
  <div class="footer">
    <img src="../../assets/images/wx-code.jpg" />
    <div class="bottom" v-html="footInfo"></div>
  </div>
</template>

<script lang="ts">
import { inject, onMounted } from "vue";
export default {
  setup() {
    const footInfo = inject("footInfo");
    onMounted(() => {
      console.log(footInfo);
    });
    return {
      footInfo
    };
  }
};
</script>

<style lang="scss" scoped>
.footer {
  position: relative;
  height: 140px;
  background: #000;
  @media screen and (max-width: 550px) {
    display: none;
  }
  margin-top: 30px;
  width: 100vw;
  .bottom {
    background: #000;
    font-size: 14px;
    color: #fff;
    height: 70px;
    text-align: center;
    line-height: 70px;
  }
  img {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 20px;
    height: 66px;
  }
}
</style>
