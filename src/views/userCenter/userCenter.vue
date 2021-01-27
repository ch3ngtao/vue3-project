<template>
  <div>
    <head-com />
    <div class="fill-content">
      <bread />
      <div class="user-center">
        <div>
          <slideMenu />
        </div>
        <div class="right">
          <p class="title">修改密码</p>
          <resetKey />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import slideMenu from "@/components/userCenterMenu/userCenterMenu.vue";
import resetKey from "@/components/resetKey/resetKey.vue";
// import components from "vue-class-component";

export default {
  components: {
    slideMenu,
    resetKey
  }
};
</script>

<style lang="scss" scoped>
.user-center {
}
.right {
  float: left;
  width: 64%;
  height: 700px;
  border: 1px solid #ddd;
  border-left: unset;
  @media screen and (max-width: 550px) {
    width: 100%;
    border-left: unset;
    border-right: unset;
    border-bottom: unset;
  }
  .title {
    height: 50px;
    border-bottom: 1px solid #ddd;
    line-height: 50px;
    padding-left: 20px;
    width: 100%;
  }
}
</style>
