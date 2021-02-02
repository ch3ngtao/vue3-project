<template>
  <div>
    <head-com />
    <div class="fill-content">
      <bread />
      <div class="estimate">
        <p class="title">考试分类</p>
        <ul>
          <li
            v-for="(item, index) in testClass.subjects"
            :key="item.ec_id"
            :class="{ active: activeIndex == index }"
            @click="selectSubject(index, item.ec_id)"
          >
            {{ item.ec_name }}
          </li>
        </ul>
      </div>
      <div class="content" v-if="subjectTestsList.length > 0">
        <p class="content-title">
          {{ subjectTestsList[0].title }}
        </p>
        <div class="rules">
          <p>考试规则</p>
          <ul>
            <li class="rule-item">
              1、考生进入模拟考场，不得携带任何书籍、计算器、通讯工具、资料等。
            </li>
            <li class="rule-item">
              2、考生在每科考试前5分钟进入模拟考场。
            </li>
            <li class="rule-item">
              3、考生考试终了，时间一到，考生应立即停止答卷。
            </li>
            <li class="rule-item">
              4、考试方式为上机模拟考试，严禁携带任何与考试无关的资料。
            </li>
            <li class="rule-item">
              5、考试时间为模拟考试时间，请在规定时间内答题，超时则视为自动交卷处理。
            </li>
            <li class="rule-item">
              6、考生必须严格遵守考场纪律，违者视情节轻重，分别给予批评、试卷作废、取消考试资格等处理。
            </li>
          </ul>
        </div>
        <div class="time">
          <p>考试时间</p>
          <div class="limit-time">{{ startTime }}—{{ endTime }}</div>
          <div class="tips">
            请在规定时间内随时参加考试，自行预留答题时间，超过开放时间则自动交卷。
          </div>
        </div>
        <div class="test-info">
          <p>考试单元</p>
          <div class="units">
            <div
              class="units-item"
              v-for="(item, index) in subjectTestsList[0].unit"
              :key="item"
              @click="toTestPage(item)"
            >
              第{{ index + 1 }}单元
            </div>
          </div>
        </div>
        <div
          class="score"
          v-if="
            !subjectTestsList[0].unit &&
              subjectTestsList[0].ep_record &&
              subjectTestsList[0].ep_record[0].committed == 1
          "
        >
          考试得分：{{
            subjectTestsList[0].ep_record &&
              subjectTestsList[0].ep_record[0].member_score
          }}
        </div>
        <div
          class="btn-test"
          v-if="!subjectTestsList[0].unit"
          @click="toTestPage(null)"
        >
          开始考试
        </div>
      </div>
    </div>
    <foot-com />
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { getTestClass, getSelectClass } from "@/service/test";
import { useStore } from "vuex";
import { message } from "ant-design-vue";
interface Sbujiect {
  ec_name: string;
  ec_id: number;
}
interface TestClassType {
  subjects?: Sbujiect[];
}
interface EpRecordType {
  committed: number;
  ep_id: number;
  ep_record_id: number;
  member_score: number;
  unit_code: string;
}
interface SubjectTestsListType {
  duration: number;
  ec_id: number;
  end_at: number;
  ep_id: number;
  need_sign: number;
  score: number;
  start_at: number;
  title: string;
  unit: number;
  ep_record: [EpRecordType];
}

interface SubjectTestsInfoType {
  subjectTestsList: SubjectTestsListType[];
}

export default {
  setup() {
    const activeIndex = ref();
    const ecId = ref(); //科目id
    const subjectTestsInfo: SubjectTestsInfoType = reactive({
      subjectTestsList: []
    });
    const testInfo = reactive({
      area: "",
      school: "",
      classes: "",
      subject: ""
    });
    const store = useStore();
    const testClass: TestClassType = reactive({});
    const router = useRouter();
    const unitList = reactive({
      unitLists: [{}]
    });

    //选择科目
    const selectSubject = (i: number, ec_id: number) => {
      activeIndex.value = i;
      ecId.value = ec_id;
      unitList.unitLists = [];
      subjectTestsInfo.subjectTestsList = [];
      getSelectClass(ecId.value).then((res: any) => {
        subjectTestsInfo.subjectTestsList = res.data;
        const units = res.data[0].unit;
        const records = res.data[0].ep_record || [];
        const unit_list = [];
        for (let i = 0; i < units; i++) {
          let unitObj = {};
          unitObj = {
            unit_code: `unit_${i + 1}`,
            committed: 0,
            member_score: 0
          };
          unit_list.push(unitObj);
        }
        unit_list.forEach((item: any) => {
          records?.forEach((item2: any) => {
            if (item.unit_code == item2.unit_code) {
              (item.committed = item2.committed),
                (item.member_score = item2.member_score);
            }
          });
        });
        unitList.unitLists = unit_list;
        console.log(unitList.unitLists, "unitLists");
        console.log(
          subjectTestsInfo.subjectTestsList,
          "subjectTestsInfo.subjectTestsList"
        );
      });
    };

    const startTime = computed(() => {
      const timeSnap = new Date(subjectTestsInfo.subjectTestsList[0].start_at);
      const y = timeSnap.getFullYear();
      const m = timeSnap.getMonth() + 1;
      const d = timeSnap.getDate();
      return `${y}年${m}月${d}日`;
    });

    const endTime = computed(() => {
      const timeSnap = new Date(subjectTestsInfo.subjectTestsList[0].end_at);
      const y = timeSnap.getFullYear();
      const m = timeSnap.getMonth() + 1;
      const d = timeSnap.getDate();
      return `${y}年${m}月${d}日`;
    });

    //初始化列表
    const fetchClass = () => {
      getTestClass(1).then((res: any) => {
        console.log(res, "estamite");

        testClass.subjects = res.data;
        ecId.value = res.data[0].ec_id;
        selectSubject(0, ecId.value);
      });
    };
    fetchClass();

    const toTestPage = (idx: number) => {
      if (store.state.token) {
        router.push({
          path: "/userTest",
          query: {
            id: ecId.value,
            unit_code: idx ? `unit_${idx + 1}` : ""
          }
        });
      } else {
        message.info("请登录");
      }
    };
    return {
      testClass, //分类科目
      ...toRefs(testInfo), //报名信息
      ...toRefs(subjectTestsInfo),
      activeIndex,
      ...toRefs(unitList),

      //methods
      // handleProvinceChange,
      toTestPage,
      fetchClass,
      selectSubject,
      startTime,
      endTime
    };
  }
};
</script>

<style lang="scss" scoped>
@import "./estimate.scss";
</style>
