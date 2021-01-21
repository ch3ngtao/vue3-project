<template>
  <div>
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
    </div>
    <div class="right">
      <div class="question-title">
        <span>02</span>
        <span>下列疾病，表现为弛张热的是</span>
      </div>
      <div class="question-content">
        <a-radio-group v-model:value="radioValue" @change="onChange">
          <a-radio :style="radioStyle" :value="1">
            Option A
          </a-radio>
          <a-radio :style="radioStyle" :value="2">
            Option B
          </a-radio>
          <a-radio :style="radioStyle" :value="3">
            Option C
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
        <a-button type="primary">
          下一题
        </a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import bread from "@/components/bread/bread.vue";
import { reactive, toRefs, ref } from "vue";
import { TipsType, EpGroup } from "./userTest";

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
    const activeSelect = ref("");
    const radioStyle = reactive({
      display: "block",
      height: "30px",
      lineHeight: "30px"
    });
    const radioValue = ref(0);
    const checkInfo = reactive({
      checkList: []
    });
    //左测试题目列表
    let testList: EpGroup = reactive({
      ep_groups: []
    });
    const datas = {
      ep_id: 39,
      ep_duration: 30,
      ep_groups: [
        {
          group_name: "子证八世",
          group_questions: [
            {
              no: "01",
              answered: 0,
              question_id: 45
            },
            {
              no: "02",
              answered: 3,
              question_id: 3
            },
            {
              no: "03",
              answered: 0,
              question_id: 5
            },
            {
              no: "04",
              answered: 86,
              question_id: 45
            },
            {
              no: "05",
              answered: 3,
              question_id: 3
            },
            {
              no: "06",
              answered: 80,
              question_id: 5
            }
          ]
        },
        {
          group_name: "ddd",
          group_questions: [
            {
              no: "07",
              answered: 86,
              question_id: 45
            },
            {
              no: "08",
              answered: 3,
              question_id: 3
            },
            {
              no: "09",
              answered: 80,
              question_id: 5
            }
          ]
        }
      ]
    };

    testList = {
      ep_id: datas.ep_id,
      ep_duration: datas.ep_duration,
      ep_groups: datas.ep_groups
    };

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

    const selectQuestion = (idx: string) => {
      activeSelect.value = idx;
    };

    const onChange = (e: any) => {
      console.log("radio checked", e.target.value);
    };

    const onCheck = () => {
      console.log(checkInfo.checkList);
    };

    return {
      ...toRefs(tips),
      testList,
      selectQuestion,
      activeSelect,
      radioStyle,
      onChange,
      radioValue,
      plainOptions,
      ...toRefs(checkInfo),
      onCheck
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
