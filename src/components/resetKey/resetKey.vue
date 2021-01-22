<template>
  <div>
    <div class="form">
      <div>
        <span>原始密码</span>
        <a-input-password
          v-model:value="passwordInfo.old"
          placeholder="请输入原始密码"
          style="width: 200px;height: 36px"
        />
      </div>
      <div>
        <span>新密码</span>
        <a-input-password
          v-model:value="passwordInfo.new"
          placeholder="请输入新密码"
          style="width: 200px;height: 36px"
        />
      </div>
      <div>
        <span>确认密码</span>
        <a-input-password
          v-model:value="passwordInfo.check"
          placeholder="请再输入新密码"
          style="width: 200px;height: 36px"
        />
      </div>
    </div>
    <div class="btn">
      <a-button type="primary">
        确认
      </a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive } from "vue";
export default {
  setup() {
    const passwordInfo = reactive({
      old: "",
      new: "",
      check: ""
    });

    return {
      passwordInfo
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
