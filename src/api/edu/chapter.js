import request from "@utils/request";
// 线上访问地址
const BASE_URL = "/admin/edu/chapter";


// 获取所有课程章节数据
export function reqGetAllChapterList({page,limit,courseId}){
    return request({
        url:`${BASE_URL}/${page}/${limit}`,
        method:"GET",
        params:{
            courseId,
        },
    });
}
