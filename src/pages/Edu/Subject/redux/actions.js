// 同步action 返回值是action对象
// 异步action 返回值是函数,接收dispatch为参数

import {reqGetSubjectList,reqGetSubSubjectList,reqUpdateSubject} from '@api/edu/subject'

import {GET_SUBJECT_LIST,GET_SUB_SUBJECT_LIST,UPDATE_SUBJECT} from "./constants"

// 获取一级课程分类数据
const getSubjectListSync = (subjectList) => ({
    type: GET_SUBJECT_LIST,
    data: subjectList,
  });
// 获取一级课程分类数据
export const getSubjectList = (page, limit) => {
    return (dispatch) => {
      // 执行异步代码
      return reqGetSubjectList(page, limit).then((response) => {
        //更新redux状态数据
        dispatch(getSubjectListSync(response));
        //请求成功时,返回一个请求成功的数据
        return response.items;
      });
    };
  };
// 获取二级分类数据
const getSubSubjectListSync=(data)=>({
  type:GET_SUB_SUBJECT_LIST,
  data,
})
export const getSubSubjectList = (parentId)=>{
  return(dispatch)=>{
    return reqGetSubSubjectList(parentId).then((response)=>{
      dispatch(
        getSubSubjectListSync({parentId,subSubjectList:response.items})
      );
      return response;
    });
  };
};
//更新课程分类数据
const updateSubjectSync = (subject)=>({
  type:UPDATE_SUBJECT,
  data:subject,
})

export const updateSubject = (title,id)=>{
  return (dispatch)=>{
    return reqUpdateSubject(title,id).then((response)=>{
      const subject = {title,_id:id};
      dispatch(updateSubjectSync(subject));
      return subject;
    })
  }
}