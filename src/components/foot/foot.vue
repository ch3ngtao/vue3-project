<template>
  <div class="footer">
    <div class="bottom">
      ©Copyright(c)2017 qingyishuo All Rights Reserved 京ICP备17037866号
      京公网安备11010602100476号 | 北京医林文化传播有限公司 |
      网站建设技术支持-天润顺腾
    </div>
  </div>
</template>

<script lang="ts">
import { inject } from "vue";
export default {
  setup() {
    const configINfo = inject("configInfo");
    console.log(configINfo);
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
