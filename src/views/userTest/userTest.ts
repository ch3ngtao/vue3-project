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
  ep_id?: number,
  ep_duration?: number
}