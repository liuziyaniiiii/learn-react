import {reqGetAllCourseList} from "@api/edu/course"
import {reqGetAllChapterList} from "@api/edu/chapter"
import {reqGetAllLessonList} from "@api/edu/lesson"

import {GET_ALL_COURSE_LIST,GET_ALL_CHAPTER_LIST,GET_ALL_LESSON_LIST} from "./constants"


//得到所有课程分类
const getAllCourseListSync = (courseList)=>({
    type:GET_ALL_COURSE_LIST,
    data:courseList
})


export const getAllCourseList = ()=>{
    return (dispatch)=>{
        return reqGetAllCourseList().then((response)=>{
            dispatch(getAllCourseListSync(response));
            return response;
        });
    };
}

//得到课程中的章节
const getAllChapterListSync = (chapters)=>({
    type:GET_ALL_CHAPTER_LIST,
    data:chapters
})


export const getAllChapterList = ({page,limit,courseId})=>{
    return (dispatch)=>{
        return reqGetAllChapterList({page,limit,courseId}).then((response)=>{
            dispatch(getAllChapterListSync(response));
            return response;
        });
    };
};

//得到章节中的课时
const getAllLessonListSync = (data)=>({
    type:GET_ALL_LESSON_LIST,
    data:data
})


export const getAllLessonList = (chapterId)=>{
    return (dispatch)=>{
        return reqGetAllLessonList(chapterId).then((response)=>{
            dispatch(getAllLessonListSync({chapterId,lessons:response}));
            return response;
        });
    };
};
