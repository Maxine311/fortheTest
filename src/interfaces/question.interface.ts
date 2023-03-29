export interface QuestionQueryParams{
  tagged:string;
  page:number
}
export interface QuestionReturnData{
  has_more:boolean;
  items:IQuestion[];
  quota_max:number;
  quota_remaining:number;
}
export interface IQuestion{
  tags: string[],
  owner: IOwner,
  is_answered: boolean,
  view_count: number,
  answer_count: number,
  score: number,
  last_activity_date: number,
  creation_date: number,
  last_edit_date: number,
  question_id: number,
  link: string,
  title: string,
}
interface IOwner{
  reputation: number
  user_id: number,
  user_type: EnumUserType,
  accept_rate: number,
  profile_image: string,
  display_name: string,
  link: string
}
enum EnumUserType{
  "unregistered"="unregistered",
  "registered"="registered",
  "moderator"="moderator",
  "team_admin"="team_admin",
  "does_not_exist"="does_not_exist"
}