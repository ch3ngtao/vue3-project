<template>
  <div id="nav"></div>
  <div>
    <router-view />
  </div>
  <!-- <foot-com /> -->
</template>

<script lang="ts">
import _axios from "./utils/axios";
import { useStore } from "vuex";
import { GetUserInfo } from "./service/user";
import { provide, ref, createVNode } from "vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { Modal } from "ant-design-vue";
export default {
  setup() {
    const store = useStore();
    const footInfo = ref("");
    const shouldSms = ref("");
    provide("footInfo", footInfo);
    provide("sms", shouldSms);
    if (
      navigator.userAgent.match(
        /(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i
      )
    ) {
      console.log("手机访问.");
      store.commit("setVisitOrigin", "mobile");
    } else {
      console.log("电脑访问.");
      store.commit("setVisitOrigin", "pc");
    }
    const initConfig = () => {
      _axios({
        method: "get",
        url: "/v1/config"
      })
        .then((res: any) => {
          footInfo.value = res.data.site_ba;
          shouldSms.value = res.data.sms_captcha;
          document.title = res.data.site_name;
        })
        .catch(err => {
          console.log(err);
          store.commit("setDisable", 1);
          Modal.info({
            title: "维护中",
            icon: createVNode(ExclamationCircleOutlined),
            content: "哦豁，站点正在维护中...",
            okText: "我知道了",
            okButtonProps: {
              disabled: true,
              type: "danger"
            }
          });
        });
    };
    const fetchUserInfo = () => {
      GetUserInfo().then((res: any) => {
        console.log(res);
        store.commit("setUserInfo", res.data);
      });
    };
    fetchUserInfo();
    initConfig();
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
