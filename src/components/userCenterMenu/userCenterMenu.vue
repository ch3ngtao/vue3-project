<template>
  <div>
    <div class="slide-menu">
      <div class="head">
        <div class="avatar"></div>
        <p>用户的昵称</p>
      </div>
      <div>
        <a-menu style="width: 100%" mode="vertical" @click="handleClick">
          <a-menu-item key="1" :disabled="true">
            个人中心
          </a-menu-item>
          <a-menu-item key="2">
            修改密码
          </a-menu-item>
          <a-menu-item key="3">
            退出登录
          </a-menu-item>
        </a-menu>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  setup() {
    const handleClick = (e: Record<string, any>) => {
      console.log(e);
    };
    return {
      handleClick
    };
  }
};
</script>

<style lang="scss" scoped>
.slide-menu {
  width: 202px;
  height: 700px;
  border: 1px solid #ddd;
  .head {
    height: 169px;
    overflow: hidden;
    .avatar {
      height: 100px;
      width: 100px;
      border-radius: 50%;
      background-color: #666;
      margin: 20px auto 0;
    }
    p {
      text-align: center;
      margin-top: 10px;
    }
  }
  ul {
    width: 100%;
    border-top: unset;
    li {
      height: 45px;
      line-height: 45px;
      text-align: center;
      background-color: #ede7e1;
    }
  }
}
</style>
