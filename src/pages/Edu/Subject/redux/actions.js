import {reqGetSubjectList} from '@api/edu/subject'

import {GET_SUBJECT_LIST} from "./constants"

const getSubjectListSync = (subjectList) => ({
    type: GET_SUBJECT_LIST,
    data: subjectList,
  });
  
  export const getSubjectList = (page, limit) => {
    return (dispatch) => {
      return reqGetSubjectList(page, limit).then((response) => {
        dispatch(getSubjectListSync(response));
        return response;
      });
    };
  };