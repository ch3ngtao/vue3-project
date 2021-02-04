export interface ArrType {
  id: number;
  desc: string;
  color: string;
}
export interface TipsType {
  arr: ArrType[];
}

export interface GroupItem {
  no: string,
  answered: number,
  question_id: number,
  isSelect?: boolean
}

export interface EpGroupItem {
  group_name: string,
  group_questions: GroupItem[]
}

export interface EpGroup {
  ep_groups: EpGroupItem[]
  ep_id: number,
  ep_record_id: number,
  ep_duration?: number
}

export interface QuestionListType {
  ep_id: number,
  uestion_group: number
  question_id: number
  question_options: string
  question_score: number
  question_style: number
  question_title: string
  unit_code: string
}

export interface QuestionInfoType {
  questionList: QuestionListType[]
}