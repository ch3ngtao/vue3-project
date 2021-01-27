<template>
  <div>
    <div class="head">
      <div class="logo"></div>
      <div class="title">中国新青年</div>
      <div class="login" v-if="true">
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
          v-model:value="code"
          placeholder="请输入"
          style="width: 110px;height: 36px;"
        />
        <i @click="sendCode">发送验证码</i>
      </div>
      <div class="password">
        <span class="span">验证码</span>
        <a-input
          v-model:value="code"
          placeholder="请输入验证码"
          style="width: 110px;height: 36px;"
        />
        <i @click="sendCode">发送验证码</i>
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { reactive, ref, toRefs } from "vue";
import { useRouter } from "vue-router";
import { userRegister, userLogin, getCode } from "@/service/user";
interface UserInfoType {
  key: number | string;
  password: number | string;
  checkpassword?: number | string;
  code?: number | string;
}
export default {
  setup() {
    const registerModal = ref(false);
    const loginModal = ref(false);
    const userInfo: UserInfoType = reactive({
      key: "",
      password: "",
      checkpassword: "",
      code: ""
    });
    const router = useRouter();

    //验证码
    const sendCode = () => {
      getCode().then((res: any) => {
        console.log(res);
      });
    };
    //登录
    const loginIn = () => {
      userLogin(userInfo).then((res: any) => {
        console.log(res);
      });
    };
    //注册
    const register = () => {
      userRegister(userInfo).then((res: any) => {
        console.log(res);
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
      ...toRefs(userInfo),
      loginIn,
      register,
      toUserCenter,
      sendCode
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
    background: #ccc;
    border-radius: 50%;
    @media screen and (max-width: 550px) {
      width: 50px;
      height: 50px;
      margin-top: 15px;
      margin-left: 15px;
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
    text-align: center;
  }
}
.password {
  margin-top: 20px;
  .span {
    display: inline-block;
    width: 60px;
    text-align: center;
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
  }
}

/deep/ .ant-input-password {
  margin-top: 8px;
}
/deep/ .ant-input-affix-wrapper .ant-input {
  text-align: left;
}
</style>
