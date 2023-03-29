import qs from "qs";
import { TagQuery } from "../interfaces/popularTag.interface";
import { QuestionQueryParams } from "../interfaces/question.interface";

export const PopularTagAPI = (params: TagQuery) => {
  let path =
    "https://api.stackexchange.com/2.3/tags?page=1&pagesize=10&order=desc&sort=popular&site=stackoverflow";
  path += `&${qs.stringify({ ...params })}`;
  const popularTags = fetch(path)
    .then((response) => {
      return response.json();
    })
    .then((tags) => {
      return tags;
    });
  return popularTags;
};

export const GetQuestionResultsAPI = (params: QuestionQueryParams) => {
  let path =
    "https://api.stackexchange.com/2.3/questions?pagesize=20&order=asc&sort=activity";
  path += `&${qs.stringify({ ...params })}&site=stackoverflow`;
  const results = fetch(path)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    });
  return results;
};
export const GetQuestionResultByIdAPI = (id: string) => {
  let path = `https://api.stackexchange.com/2.3/questions/${id}?order=desc&sort=activity&site=stackoverflow`;
  const results = fetch(path)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    });
  return results;
};
