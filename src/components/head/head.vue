<template>
  <div>
    <div class="head">
      <div class="logo"></div>
      <div class="user-center">个人中心</div>
    </div>
  </div>
</template>

<script lang="ts">
export default {};
</script>

<style lang="scss">
@media screen and (min-width: 550px) {
  .head {
    background: #f40;
    height: 100px;
    width: 100%;
    .logo {
      width: 100px;
    }
    .user-center {
      color: red;
    }
  }
}
</style>
