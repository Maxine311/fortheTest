import { PopularTagAPI, GetQuestionResultsAPI,GetQuestionResultByIdAPI } from "../api/search.api"
import { TagQuery } from "../interfaces/popularTag.interface"
import { QuestionQueryParams } from "../interfaces/question.interface"

export const  getPopularTagsData=async(value:TagQuery)=>{
     const tags = await PopularTagAPI(value)
    return tags.items
}

export const  getQuestionResultsAPI=async(value:QuestionQueryParams)=>{
    const tags = await GetQuestionResultsAPI(value)
   return tags
}
export const  getQuestionResultByIdAPI=async(id:string)=>{
    const tags = await GetQuestionResultByIdAPI(id)
   return tags
}