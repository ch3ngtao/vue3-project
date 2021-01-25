import config from "@/config/config";
import axios from 'axios';

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