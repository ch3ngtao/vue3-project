import _axios from '../utils/axios';

interface CurrentQuestionType {
  ecId: any,
  no?: string,
  unit_code?: any
}

interface SubmitQuestionType {
  question_id: string|number,
  answer: string,
  ep_id: string|number,
  unit_code?:string
}

//试卷分类列表
export function getTestClass (id: number) {
  return _axios({
    method: "get",
    url:'/v1/examine/categoryList',
    params: {
      ec_id: id
    }
  })
}

//选择的科目信息
export function getSelectClass (id: number) {
  return _axios({
    method: "get",
    url: '/v1/examine/paperList',
    params: {
      ec_id: id
    }
  })
}
//左侧题目栏
export function getLeftMenuList (data: CurrentQuestionType) {
  return _axios({
    method: "post",
    url: '/v1/auth/examine/sideBar',
    data: {
      ec_id: data.ecId,
      unit_code: data.unit_code
    }
  })
}
//右侧题目
export function getCurrentQuestion (data: CurrentQuestionType) {
  return _axios({
    method: "get",
    url: '/v1/auth/examine/questionList',
    params: {
      ec_id: data.ecId,
      question_id: data.no,
      unit_code: data.unit_code
    }
  })
}
//提交试题
export function submitQuestion (data: SubmitQuestionType) {
  return _axios({
    method: "post",
    url: '/v1/auth/question/answer',
    data: {
      question_id: data.question_id,
      answer: data.answer,
      ep_id: data.ep_id,
      unit_code: data.unit_code
    }
  })
}

//提交试卷
export function submitTestCard (id:number|string) {
  return _axios({
    method: "post",
    url: '/v1/auth/examine/finish',
    data: {
      ep_id: id
    }
  })
}