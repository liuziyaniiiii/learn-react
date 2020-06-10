import request from "@utils/request";
// 线上访问地址
const BASE_URL = "/admin/edu/subject";
// mock地址
const MOCK_BASE_URL = `http://localhost:9527${BASE_URL}`;

// 获取一级分类分页列表数据
export function reqGetSubjectList(page,limit){
    return request({
        url:`${MOCK_BASE_URL}/${page}/${limit}`,
        method:"GET"
    });
}
// 获取二级分类分页列表数据
export function reqGetSubSubjectList(parentId){
    return request({
        url:`${MOCK_BASE_URL}/get/${parentId}`,
        method:"GET",
    });
}
