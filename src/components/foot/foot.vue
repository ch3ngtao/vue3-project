<template>
  <div class="footer">
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
  @media screen and (max-width: 550px) {
    display: none;
  }
  margin-top: 30px;
  width: 100vw;
  .bottom {
    background: #000;
    font-size: 14px;
    color: #fff;
    height: 90px;
    text-align: center;
    line-height: 90px;
  }
}
</style>
