import subjectList from "./reducer";

import { getSubjectList,getSubSubjectList,updateSubject } from "./actions";

export { 
  subjectList, // 状态数据
  getSubjectList ,// 更新状态数据的方法 
  getSubSubjectList,
  updateSubject,
}; 
