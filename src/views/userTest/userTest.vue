<template>
  <div>
    <head-com />
    <div class="fill-content">
      <bread />
      <div class="left">
        <div class="tips">
          <div v-for="item in arr" :key="item.id" class="tips-item">
            <div :style="{ backgroundColor: item.color }"></div>
            <p>{{ item.desc }}</p>
          </div>
        </div>
        <div class="test-list">
          <div v-for="item in testList.ep_groups" :key="item.id">
            <p>{{ item.group_name }}</p>
            <div class="list">
              <div
                v-for="val in item.group_questions"
                :key="val.id"
                class="items"
                :class="{
                  isSelect: val.no == activeSelect,
                  answered: val.answered
                }"
                @click="selectQuestion(val.no)"
              >
                {{ val.no }}
              </div>
            </div>
          </div>
        </div>
        <div class="btn-submit">
          <a-button type="primary" @click="submitTest">
            提交试卷
          </a-button>
        </div>
      </div>
      <div class="right">
        <div class="question-title" v-if="questionList.length">
          <span>02</span>
          <span>{{ questionList[0].question_title }}</span>
        </div>
        <div class="question-content">
          <a-radio-group v-model:value="radioValue" @change="onChange">
            <a-radio
              :style="radioStyle"
              :value="item.option"
              v-for="item in jsonArr"
              :key="item.id"
            >
              {{ item.label }}
            </a-radio>
          </a-radio-group>

          <a-checkbox-group
            v-model:value="checkList"
            style="display: block"
            :options="plainOptions"
            @change="onCheck"
          />
        </div>
        <div class="btns">
          <a-button type="danger">
            上一题
          </a-button>
          <a-button type="primary" @click="nextTest">
            下一题
          </a-button>
        </div>
      </div>
    </div>
    <foot-com />
  </div>
</template>

<script lang="ts">
import bread from "@/components/bread/bread.vue";
import { reactive, toRefs, ref } from "vue";
import { TipsType, EpGroup, QuestionInfoType } from "./userTest";
import { useRoute } from "vue-router";
import {
  getLeftMenuList,
  getCurrentQuestion,
  submitQuestion,
  submitTestCard
} from "@/service/test";

export default {
  components: {
    bread
  },
  setup() {
    //左侧顶部测试题状态
    const tips: TipsType = reactive({
      arr: []
    });
    const plainOptions = ["Apple", "Pear", "Orange"];
    const route = useRoute();
    const ecId = route.query.id;
    const unit_code = route.query.unit_code;
    const activeSelect = ref("");
    const questionInfo: QuestionInfoType = reactive({
      questionList: []
    });
    const radioStyle = reactive({
      display: "block",
      height: "30px",
      lineHeight: "30px"
    });
    const radioValue = ref("");
    const checkInfo = reactive({
      checkList: []
    });
    //左测试题目列表
    const testList: EpGroup = reactive({
      ep_groups: [],
      ep_id: 0
    });

    tips.arr = [
      {
        id: 1,
        desc: "已答",
        color: "#1890ff"
      },
      {
        id: 1,
        desc: "当前",
        color: "#ffd352"
      },
      {
        id: 1,
        desc: "未答",
        color: "white"
      }
    ];
    const jsonArr = JSON.parse(
      '[{"option":"A","label":"选项A：阿基米德"},{"option":"B","label":"选项B：普罗米修斯"},{"option":"C","label":"选项C：牛顿"},{"option":"D","label":"选项D：福尔摩斯"}]'
    );
    console.log(jsonArr);
    const activeIndex = ref(0);
    //每道题的问题
    const selectQuestion = (no: string) => {
      activeSelect.value = no;
      const data = {
        ecId: ecId,
        no,
        unit_code
      };
      getCurrentQuestion(data).then((res: any) => {
        console.log(res);
        const resData: [] = res.data;
        questionInfo.questionList = resData;
      });
    };
    //获取左边问题栏问题
    const fetchLeftMenu = () => {
      const data = {
        ecId: ecId,
        unit_code: unit_code
      };
      getLeftMenuList(data).then((res: any) => {
        const resData = res.data;
        Object.assign(testList, resData);
        selectQuestion(testList.ep_groups[0].group_questions[0].no);
      });
    };
    fetchLeftMenu();

    const onChange = (e: any) => {
      console.log("radio checked", e.target.value);
    };
    //提交试卷
    const submitTest = () => {
      submitTestCard(testList.ep_id).then((res: any) => {
        console.log(res);
      });
    };

    const onCheck = () => {
      console.log(checkInfo.checkList);
    };

    const nextTest = () => {
      console.log(radioValue);
      const data = {
        question_id: questionInfo.questionList[0].question_id,
        answer: radioValue.value,
        ep_id: questionInfo.questionList[0].ep_id,
        unit_code: questionInfo.questionList[0].unit_code
      };
      submitQuestion(data).then((res: any) => {
        console.log(res);
      });
    };

    return {
      ...toRefs(tips), //题目状态展示
      testList, //左侧试题列表
      activeSelect, //当前选择问题
      radioStyle,
      radioValue, //单选
      plainOptions, //多选菜单
      ...toRefs(checkInfo), //多选
      ...toRefs(questionInfo), //试题信息
      jsonArr,
      // methods
      onChange,
      onCheck,
      submitTest,
      nextTest,
      selectQuestion
    };
  }
};
</script>

<style lang="scss" scoped>
.left {
  float: left;
  margin-top: 30px;
  width: 230px;
  height: 600px;
  border: 1px solid #000;
  @media screen and (max-width: 550px) {
    display: none;
  }
  .btn-submit {
    margin-top: 40px;
    margin-left: 50%;
    transform: translateX(-50%);
  }
  .tips {
    display: flex;
    justify-content: space-around;
    .tips-item {
      div {
        height: 36px;
        width: 36px;
        border-radius: 50%;
      }
      p {
        text-align: center;
      }
      &:last-child {
        div {
          border: 1px solid #ccc;
        }
      }
    }
  }
  .test-list {
    p {
      margin: 2px 0;
    }
    .list {
      justify-content: space-around;
      padding: 0 10px;
      .items {
        display: inline-block;
        font-size: 16px;
        font-weight: bold;
        height: 34px;
        width: 34px;
        text-align: center;
        line-height: 28px;
        border-radius: 50%;
        border: 1px solid #ddd;
        margin: 2px 8px;
        cursor: pointer;
        overflow: hidden;
      }
      .answered {
        background: #1890ff;
        color: #fff;
      }
      .isSelect {
        background: #ffd352;
        color: #fff;
      }
    }
  }
}
.right {
  float: left;
  width: 60%;
  margin-top: 30px;
  margin-left: 20px;
  height: 600px;
  @media screen and (max-width: 550px) {
    width: 100%;
  }
  .question-title {
    font-size: 18px;
    font-weight: 600;
    margin-top: 10px;
    span {
      margin-right: 20px;
    }
  }
  .btns {
    padding-right: 20px;
    text-align: center;
    button {
      margin: 0 15px;
      color: #fff;
      &:first-child {
        background: #e85454;
      }
    }
  }
}
/deep/.ant-checkbox-group-item {
  display: block;
  margin: 10px 0;
}
</style>
