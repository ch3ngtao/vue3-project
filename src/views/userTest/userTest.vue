<template>
  <div>
    <head-com />
    <div class="fill-content">
      <bread />
      <div class="content">
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
                  @click="selectQuestion(val.no, val.question_id)"
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
          <!-- 单选 -->
          <div class="question-content">
            <a-radio-group
              v-model:value="radioValue"
              @change="onChange"
              v-if="questionList[0].question_style == 1"
            >
              <a-radio
                :style="radioStyle"
                :value="item.option"
                v-for="item in jsonArr"
                :key="item.id"
              >
                {{ item.label }}
              </a-radio>
            </a-radio-group>
            <!-- 多选 -->
            <a-checkbox-group
              v-model:value="checkList"
              style="display: block"
              @change="onCheck"
              v-if="questionList[0].question_style == 2"
            >
              <a-checkbox
                :value="item.option"
                v-for="item in jsonArr"
                :key="item.id"
              >
                A{{ item.label }}
              </a-checkbox>
            </a-checkbox-group>
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
    const activeIndex = ref(0);
    const questionInfo: QuestionInfoType = reactive({
      questionList: [
        {
          ep_id: 0,
          uestion_group: 0,
          question_id: 0,
          question_options: "",
          question_score: 0,
          question_style: 0,
          question_title: "",
          unit_code: ""
        }
      ]
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
    const rightList = reactive({
      jsonArr: []
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

    //每道题的问题
    const selectQuestion = (no: string, q_id: number) => {
      activeSelect.value = no; // 01 string
      activeIndex.value = Number(no); //1 number
      const data = {
        ecId: ecId,
        question_id: q_id,
        unit_code
      };
      getCurrentQuestion(data).then((res: any) => {
        console.log(res);
        const resData: [] = res.data;
        questionInfo.questionList = resData;
        rightList.jsonArr = JSON.parse(
          questionInfo.questionList[0].question_options
        );
        console.log(rightList.jsonArr, "rightList.jsonArr");
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
        selectQuestion(
          testList.ep_groups[0].group_questions[0].no,
          testList.ep_groups[0].group_questions[0].question_id
        );
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
      // console.log(checkInfo.checkList.sort());
    };

    const nextTest = () => {
      console.log(radioValue);
      activeIndex.value++;
      if (activeIndex.value > 9) {
        activeSelect.value = activeIndex.value.toString();
      } else {
        activeSelect.value = `0${activeIndex.value}`;
      }
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
      ...toRefs(rightList),
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
.content {
  border: 1px solid #ccc;
  height: 700px;
}
.left {
  float: left;
  padding-top: 30px;
  width: 230px;
  height: 100%;
  border-right: 1px solid #ccc;
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
      padding-left: 10px;
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
  padding-left: 20px;
  height: 100%;
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
