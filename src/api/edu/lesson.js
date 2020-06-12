import request from "@utils/request";
// 线上访问地址
const BASE_URL = "/admin/edu/lesson";


// 获取所有课时数据
export function reqGetAllLessonList(chapterId){
    return request({
        url:`${BASE_URL}/get/${chapterId}`,
        method:"GET",
    });
}
