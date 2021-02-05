<template>
  <div>
    <div class="form">
      <div>
        <span>输入密码</span>
        <a-input-password
          v-model:value="new_pass"
          placeholder="请输入新密码"
          style="width: 200px;height: 36px"
        />
      </div>
      <div>
        <span>确认密码</span>
        <a-input-password
          v-model:value="re_new"
          placeholder="请确认新密码"
          style="width: 200px;height: 36px"
        />
      </div>
      <div>
        <span>验证码</span>
        <a-input
          v-model:value="imageCode"
          placeholder="图形验证码"
          style="width: 120px;height: 36px"
        />
        <img :src="code_img" @click="getImageCode" />
      </div>
    </div>
    <div class="btn">
      <a-button type="primary" @click="changePassword">
        确认
      </a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, ref, toRefs } from "vue";
import { changePassWord, getImage } from "@/service/user";
import { removeStorage } from "../../utils/storage";
import { useStore } from "vuex";
export default {
  setup() {
    const passwordInfo = reactive({
      new_pass: "",
      re_new: "",
      imageCode: ""
    });
    const uuid = Math.random()
      .toString(36)
      .slice(-8);

    const store = useStore();

    const code_img = ref("");

    const changePassword = () => {
      const data = {
        password: passwordInfo.new_pass,
        re_password: passwordInfo.re_new,
        image_code: passwordInfo.imageCode
      };
      changePassWord(data, uuid).then((res: any) => {
        console.log(res);
        removeStorage("token");
        store.commit("setToken", "");
      });
    };

    const getImageCode = () => {
      getImage(uuid).then(res => {
        code_img.value = res.data;
      });
    };
    getImageCode();

    return {
      ...toRefs(passwordInfo),
      code_img, //图片地址
      // methods
      changePassword,
      getImageCode
    };
  }
};
</script>

<style lang="scss" scoped>
.form {
  div {
    height: 50px;
    span {
      float: left;
      height: 50px;
      width: 70px;
      line-height: 50px;
      margin-right: 20px;
      text-align: right;
    }
    input {
      margin-top: 10px;
    }
    img {
      vertical-align: bottom;
      height: 36px;
      width: 90px;
    }
  }
}
.btn {
  width: 320px;
  text-align: center;
  margin-top: 20px;
}
/deep/ .ant-input-password {
  margin-top: 8px;
}
/deep/ .ant-input-affix-wrapper .ant-input {
  text-align: left;
}
</style>
