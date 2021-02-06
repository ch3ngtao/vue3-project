<template>
  <div>
    <div class="slide-menu" id="slide-menu">
      <div class="center-head">
        <div class="avatar">
          <img src="../../assets/images/unlogin-head.png" />
        </div>
        <p>{{ userInfo.member_nickname }}</p>
      </div>
      <div>
        <a-menu style="width: 100%" mode="vertical" @click="handleClick">
          <!-- <a-menu-item key="1" :disabled="true">
            个人中心
          </a-menu-item> -->
          <a-menu-item key="2">
            修改密码
          </a-menu-item>
          <a-menu-item key="3" @click="quitLogin">
            退出登录
          </a-menu-item>
        </a-menu>
      </div>
      <div class="icon" @click="slideMenu">个人中心</div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, toRefs } from "vue";
import { useStore } from "vuex";
import { removeStorage } from "@/utils/storage";
import { useRouter } from "vue-router";
import { Modal } from "ant-design-vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { createVNode } from "vue";
export default {
  setup() {
    const showSlide = ref(0);
    const store = useStore();
    const router = useRouter();

    const handleClick = (e: Record<string, any>) => {
      console.log(e);
    };

    const slideMenu = () => {
      const slideRef: HTMLElement = document.getElementById(
        "slide-menu"
      ) as HTMLElement;
      const slideW = slideRef.clientWidth;

      if (showSlide.value === 0) {
        showSlide.value = 1;
        slideRef.style.left = 0 + "px";
      } else if (showSlide.value === 1) {
        showSlide.value = 0;
        slideRef.style.left = -slideW - 2 + "px";
      }
    };

    const quitLogin = () => {
      Modal.confirm({
        title: "退出提示",
        icon: createVNode(ExclamationCircleOutlined),
        content: createVNode(
          "div",
          { style: "color:black;" },
          "你确定要退出登录吗？"
        ),
        okText: "确定",
        cancelText: "取消",
        onOk() {
          removeStorage("token");
          store.commit("setToken", "");
          setTimeout(() => {
            router.push({
              path: "/estimate"
            });
          }, 50);
        },
        onCancel() {
          console.log("Cancel");
        },
        class: "test"
      });
    };

    return {
      handleClick,
      slideMenu,
      ...toRefs(store.state),
      quitLogin
    };
  }
};
</script>

<style lang="scss" scoped>
.slide-menu {
  @media screen and (max-width: 550px) {
    position: absolute;
    left: -203px;
    z-index: 99;
  }
  width: 202px;
  height: 700px;
  float: left;
  background: #fff;
  border: 1px solid #ddd;
  transition: all 0.5s linear;
  .icon {
    position: absolute;
    font-size: 14px;
    width: 26px;
    padding: 6px 5px;
    // height: 30px;
    border: 1px solid #ddd;
    top: 38%;
    right: -26px;
    @media screen and (min-width: 550px) {
      display: none;
    }
  }
  .center-head {
    height: 169px;
    overflow: hidden;
    .avatar {
      height: 100px;
      width: 100px;
      border-radius: 50%;
      // background-color: #666;
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
