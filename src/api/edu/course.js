import request from "@utils/request";
// 线上访问地址
const BASE_URL = "/admin/edu/course";


// 获取所有课程列表
export function reqGetAllCourseList(){
    return request({
        url:`${BASE_URL}`,
        method:"GET"
    });
}
