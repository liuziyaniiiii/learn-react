import request from "@utils/request";


// 获取七牛上传凭证uploadtoken
export function reqGetUploadToken(){
    return request({
        url:`/uploadtoken`,
        method:"GET",
    });
}
