<template>
  <div>
    <div class="estimate">
      <p class="title">考试分类</p>
      <ul>
        <li v-for="item in testClass" :key="item.id">{{ item.type }}</li>
      </ul>
    </div>
    <div class="content"></div>
  </div>
</template>

<script lang="ts">
import { reactive } from "vue";
export default {
  setup() {
    const obj = [
      {
        type: "考研",
        id: "1"
      },
      {
        type: "中医执医医师",
        id: "2"
      },
      {
        type: "中医助理医师",
        id: "3"
      },
      {
        type: "中西医助理医师",
        id: "4"
      }
    ];
    const testClass = reactive(obj);
    console.log(testClass);
    return {
      testClass
    };
  }
};
</script>

<style lang="scss" scoped>
.estimate {
  height: 1rem;
  background-color: #f70;
  font-size: 0.16rem;
  margin-bottom: 10px;
  .title {
    float: left;
    height: 100%;
    line-height: 0.5rem;
    font-size: 0.16rem;
  }
  ul {
    float: left;
    height: 100%;
    li {
      line-height: 0.5rem;
      float: left;
      font-size: 0.16rem;
    }
  }
}
.content {
  height: 6rem;
  width: 100%;
  background-color: #000;
}
</style>
