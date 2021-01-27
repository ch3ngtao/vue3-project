import config from "@/config/config";
import axios from 'axios';

interface CurrentQuestionType {
  ecId: any,
  no?: string,
  unit_code?: any
}

//试卷分类列表
export function getTestClass (id: number) {
  return axios({
    method: "get",
    url: config.baseUrl + "4191802",
    params: {
      ec_id: id
    }
  })
}

//选择的科目信息
export function getSelectClass (id: number) {
  return axios({
    method: "get",
    url: config.baseUrl + "4146020",
    params: {
      ec_id: id
    }
  })
}
//左侧题目栏
export function getLeftMenuList (data: CurrentQuestionType) {
  return axios({
    method: "get",
    url: config.baseUrl + "4174302",
    params: {
      ec_id: data.ecId,
      unit_code: data.unit_code
    }
  })
}

export function getCurrentQuestion (data: CurrentQuestionType) {
  return axios({
    method: "get",
    url: config.baseUrl + "4192015",
    params: {
      ec_id: data.ecId,
      question_id: data.no,
      unit_code: data.unit_code
    },
    headers: { "Client-Token": "" }
  })
}