<template>
  <div>
    <head-com />
    <div class="fill-content">
      <bread />
      <div class="estimate">
        <p class="title">考试分类</p>
        <ul>
          <li v-for="item in testClass" :key="item.id">{{ item.type }}</li>
        </ul>
      </div>
      <div class="content">
        <p class="content-title">
          2021中医执业医师资格考试医学综合考试第一次模拟试卷
        </p>
        <div class="rules">
          <p>考试规则</p>
          <ul>
            <li class="rule-item">
              1、考生进入模拟考场，不得携带任何书籍、计算器、通讯工具、资料等。
            </li>
            <li class="rule-item">
              1、考生进入模拟考场，不得携带任何书籍、计算器、通讯工具、资料等。
            </li>
            <li class="rule-item">
              1、考生进入模拟考场，不得携带任何书籍、计算器、通讯工具、资料等。
            </li>
          </ul>
        </div>
        <div class="time">
          <p>考试时间</p>
          <div class="limit-time">2020年12月27日—2021年03月01日</div>
          <div class="tips">
            请在规定时间内随时参加考试，自行预留答题时间，超过开放时间则自动交卷。
          </div>
        </div>
        <div class="test-info">
          <p>报名信息</p>
          <div class="select">
            <a-select
              v-model:value="area"
              style="width: 120px"
              @change="handleProvinceChange"
            >
              <a-select-option v-for="pro in provinceData" :key="pro">
                {{ pro }}
              </a-select-option>
            </a-select>
            <a-select v-model:value="school" style="width: 120px">
              <a-select-option v-for="city in cities" :key="city">
                {{ city }}
              </a-select-option>
            </a-select>
            <a-select v-model:value="classes" style="width: 120px">
              <a-select-option v-for="pro in provinceData" :key="pro">
                {{ pro }}
              </a-select-option>
            </a-select>
            <a-select v-model:value="subject" style="width: 120px">
              <a-select-option v-for="city in cities" :key="city">
                {{ city }}
              </a-select-option>
            </a-select>
          </div>
        </div>
        <div class="btn-test" @click="toTestPage">开始考试</div>
      </div>
    </div>
    <foot-com />
  </div>
</template>

<script lang="ts">
import bread from "@/components/bread/bread.vue";
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
interface City {
  [key: string]: string[];
}
interface Sbujiect {
  type: string;
  id: string;
}

export default {
  components: {
    bread
  },
  setup() {
    const provinceData = ["Zhejiang", "Jiangsu"];
    const cityData: City = reactive({
      Zhejiang: ["Hangzhou", "Ningbo", "Wenzhou"],
      Jiangsu: ["Nanjing", "Suzhou", "Zhenjiang"]
    });
    const testInfo = reactive({
      area: "",
      school: "",
      classes: "",
      subject: ""
    });
    const cities: string[] = reactive([]);
    const obj: Sbujiect[] = [
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
      },
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
    const router = useRouter();

    const handleProvinceChange = (e: string) => {
      cities.push(...cityData[e]);
      console.log(cities);
    };

    const toTestPage = () => {
      console.log(router);

      router.push({
        path: "/userTest"
      });
    };
    return {
      testClass,
      provinceData,
      ...toRefs(testInfo),
      handleProvinceChange,
      cities,
      toTestPage,
      router
    };
  }
};
</script>

<style lang="scss" scoped>
@import "./estimate.scss";
</style>
