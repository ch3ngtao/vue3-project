<template>
  <div>
    <div class="head">
      <div class="logo">
        <img src="../../assets/images/logo-img.png" alt="" />
      </div>
      <div class="title"></div>
      <div class="login" v-if="!token">
        <a-button type="primary" @click="loginModal = true">
          登录
        </a-button>
        <a-button type="default" @click="registerModal = true">
          注册
        </a-button>
      </div>
      <div class="user-center" v-else @click="toUserCenter">个人中心</div>
    </div>

    <a-modal
      v-model:visible="loginModal"
      title="登录"
      style="text-align: center"
      width="400px"
      centered
      okText="登录"
      cancelText="取消"
      :maskClosable="false"
      :closable="false"
      @ok="loginIn"
      @cancel="resetUserInfo"
    >
      <div class="user">
        <span class="span">手机号</span>
        <a-input
          v-model:value="key"
          placeholder="请输入手机号"
          style="width: 200px;height: 36px"
        />
      </div>
      <div class="password">
        <span class="span">密码</span>
        <a-input-password
          v-model:value="password"
          placeholder="请输入密码"
          style="width: 200px;height: 36px"
        />
      </div>
      <div class="password">
        <span class="span">验证码</span>
        <a-input
          v-model:value="image_code"
          placeholder="请输入"
          style="width: 110px;height: 36px;"
        />
        <img :src="imgCode" @click="getImageCode" class="image" />
      </div>
    </a-modal>

    <a-modal
      v-model:visible="registerModal"
      title="注册"
      centered
      style="text-align: center"
      width="400px"
      okText="注册"
      cancelText="取消"
      :maskClosable="false"
      :closable="false"
      @ok="register"
      @cancel="resetUserInfo"
    >
      <div class="user">
        <span class="span">手机号</span>
        <a-input
          v-model:value="key"
          placeholder="请输入手机号"
          style="width: 200px;height: 36px"
        />
      </div>
      <div class="password">
        <span class="span">密码</span>
        <a-input-password
          v-model:value="password"
          placeholder="请输入密码"
          style="width: 200px;height: 36px"
        />
      </div>
      <div class="password">
        <span class="span">确认密码</span>
        <a-input-password
          v-model:value="checkpassword"
          placeholder="请输入密码"
          style="width: 200px;height: 36px"
        />
      </div>
      <div class="password">
        <span class="span">图形验证</span>
        <a-input
          v-model:value="image_code"
          placeholder="请输入"
          style="width: 110px;height: 36px;"
        />
        <img :src="imgCode" @click="getImageCode" class="image" />
      </div>
      <div class="password" v-if="shouldSms === 'open'">
        <span class="span">验证码</span>
        <a-input
          v-model:value="code"
          placeholder="请输入验证码"
          style="width: 110px;height: 36px;"
        />
        <i @click="sendCode">{{ showDesc }}</i>
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { inject, reactive, ref, toRefs, watch } from "vue";
import { useRouter } from "vue-router";
import {
  userRegister,
  userLogin,
  getCode,
  getImage,
  GetUserInfo
} from "@/service/user";
interface UserInfoType {
  key: number | null;
  password: number | string;
  image_code: string;
  checkpassword: number | string;
  code?: number | string;
}
import { useStore } from "vuex";
import { message } from "ant-design-vue";
export default {
  setup() {
    const registerModal = ref(false);
    const loginModal = ref(false);
    const shouldSms = inject("sms");
    const userInfo: UserInfoType = reactive({
      key: null, //手机号
      password: "", //第一次密码
      checkpassword: "", //第二次密码
      code: "", //sms短信验证
      image_code: "" //图形验证码
    });
    const imgCode = ref("");
    const router = useRouter();
    const store = useStore();
    const durtime = ref(0);
    const showDesc = ref("发送验证码");
    let timer: any;
    let shouldRequest = true;
    const uuid = Math.random()
      .toString(36)
      .slice(-8);
    // 倒计时;
    const coutTime = () => {
      if (durtime.value == 0) {
        showDesc.value = "再次发送";
        shouldRequest = true;
        return;
      }
      durtime.value--;
      if (timer) {
        clearTimeout(timer);
      }
      showDesc.value = durtime.value + "s";
      timer = setTimeout(coutTime, 1e3);
    };

    const resetUserInfo = () => {
      userInfo.key = null;
      userInfo.password = ""; //第一次密码
      userInfo.checkpassword = ""; //第二次密码
      userInfo.code = ""; //sms短信验证
      userInfo.image_code = ""; //图形验证码

      console.log(userInfo);
    };

    //短信验证码
    const sendCode = () => {
      if (shouldRequest) {
        shouldRequest = false;
        durtime.value = 60;
        coutTime();
        getCode(uuid, userInfo.key, userInfo.image_code).then((res: any) => {
          console.log(res);
        });
      }
    };

    //获取图形验证码
    const getImageCode = () => {
      getImage(uuid).then((res: any) => {
        imgCode.value = res.data;
      });
    };
    //跟新用户信息
    const upDateUserInfo = () => {
      GetUserInfo().then((res: any) => {
        console.log(res);
        store.commit("setUserInfo", res.data);
      });
    };

    watch([registerModal, loginModal], newVal => {
      newVal.forEach(item => {
        if (item) {
          getImageCode();
        }
      });
      // userInfo = {
      //   key: null, //手机号
      //   password: "", //第一次密码
      //   checkpassword: "", //第二次密码
      //   code: "", //sms短信验证
      //   image_code: "" //图形验证码
      // };
    });
    //登录
    const loginIn = () => {
      userLogin(userInfo, uuid).then((res: any) => {
        console.log(res);
        if (res.data && res.data.token) {
          loginModal.value = false;
          store.commit("setToken", res.data.token);
          upDateUserInfo();
          resetUserInfo();
        } else {
          message.info("密码错误");
        }
      });
    };
    //注册
    const register = () => {
      userRegister(userInfo, uuid).then((res: any) => {
        console.log(res);
        if (res.message === "success") {
          registerModal.value = false;
          resetUserInfo();
        }
      });
    };
    //跳转个人中心
    const toUserCenter = () => {
      router.push({
        path: "/userCenter"
      });
    };
    return {
      loginModal,
      registerModal,
      ...toRefs(userInfo), //用户登录信息
      ...toRefs(store.state),
      message, //组件
      showDesc, //发送验证码
      imgCode, //图片验证码地址
      shouldSms, //是否发生短信验证码
      // methods
      loginIn,
      register,
      toUserCenter,
      sendCode,
      getImageCode,
      resetUserInfo
    };
  }
};
</script>

<style lang="scss">
.head {
  height: 80px;
  width: 100%;
  margin: 0 auto 20px;
  @media screen and (min-width: 550px) {
    height: 100px;
    width: 1200px;
    margin: 20px auto;
  }
  .logo {
    float: left;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    @media screen and (max-width: 550px) {
      width: 50px;
      height: 60px;
      margin-top: 15px;
      margin-left: 15px;
    }
    img {
      height: 100%;
      width: 100%;
    }
  }
  .title {
    float: left;
    color: red;
    height: 100px;
    line-height: 100px;
    margin-left: 20px;
    @media screen and (max-width: 550px) {
      height: 80px;
      font-size: 14px;
      line-height: 80px;
      margin-left: 8px;
    }
  }
  .login {
    float: right;
    margin-right: 50px;
    margin-top: 35px;
    @media screen and (max-width: 550px) {
      margin-right: 15px;
      margin-top: 25px;
    }
    button {
      margin: 0 10px;
      span {
        font-size: 14px;
      }
    }
  }
  .user-center {
    margin-top: 35px;
    margin-right: 50px;
    float: right;
    cursor: pointer;
    @media screen and (max-width: 550px) {
      margin-right: 8px;
      font-size: 14px;
      margin-right: 15px;
    }
  }
}

.user {
  .span {
    display: inline-block;
    width: 60px;
    text-align: left;
  }
}
.password {
  margin-top: 20px;
  .span {
    display: inline-block;
    width: 60px;
    text-align: left;
  }
  i {
    font-style: normal;
    float: right;
    font-size: 14px;
    padding: 0 10px;
    box-sizing: border-box;
    line-height: 36px;
    border: 1px solid #ddd;
    cursor: pointer;
    height: 38px;
    width: 90px;
    font-size: 12px;
  }
  .image {
    float: right;
    height: 38px;
    width: 90px;
  }
}

/deep/ .ant-input-password {
  margin-top: 8px;
}
/deep/ .ant-input-affix-wrapper .ant-input {
  text-align: left;
}
</style>
