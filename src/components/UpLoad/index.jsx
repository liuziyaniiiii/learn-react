import React, { Component } from 'react'
import {Button, Upload as AntUpload,message} from 'antd'
import {UploadOutlined} from '@ant-design/icons'

import * as qiniu from 'qiniu-js'
import {nanoid} from 'nanoid'

import {reqGetUploadToken} from '@api/edu/upload'

const MAX_VIDEO_SIZE = 35 * 1024 * 1024;

export default class Upload extends Component {


    constructor(){
        super();
        const data = localStorage.getItem('upload_token')
        const state = {
            uploadToken:"",
            expires:0,
        }
        if(data){
           const{uploadToken,expires} =  JSON.parse(data)
           //修改状态为本地的数据
           state.uploadToken = uploadToken
           state.expires = expires 
        }

        this.state = state;
    }
    

    saveUploadToken = (uploadToken,expires)=>{
        const data = {
            uploadToken,
            //设置过期时间
            expires:Date.now() + expires * 1000 - 5 * 60 * 1000,
        }

        this.setState(data);

        localStorage.setItem('upload_token',JSON.stringify(data))
    }

    //在上传之前触发的函数
    beforeUpload = (file,fileList)=>{
        return new Promise(async (resolve,reject)=>{
            if(file.size>MAX_VIDEO_SIZE){
                message.warn('上传视频不能超过35mb')
                return reject();
            }
            //上传之前检查凭证有无过期,没有过期直接使用,过期了,重新发送请求
            //既要存在状态中也要存在localStorage中
            // const {uploadToken,expires} = await reqGetUploadToken()
            // console.log(response)
            const {expires} = this.state
            if(expires < Date.now()){
                //过期了.重新发送请求
                const {uploadToken,expires} = await reqGetUploadToken()
                this.saveUploadToken(uploadToken,expires)
            }
            resolve(file); //file就会作为要上传的文件
        });
    };


    //自定义上传视频方案 qiniu-js
    customRequest = ({file})=>{

        const key = nanoid(10);

        const putExtra = {
            fname:"",
            mineType:["video/mp4"]
        };

        const config = {
            region:qiniu.region.z1,
        }

        //创建上传文件对象
        const observable = qiniu.upload(
            file,
            key, 
            this.state.uploadToken, 
            putExtra, 
            config
        )
        const observer = {
            next(res) { //上传过程中触发的回调函数

            },
            error(err) { //上传失败触发的回调函数

            },
            complete(res) {

            }
        }
        const subscription = observable.subscribe(observer) // 上传开始
        // 上传取消
        // subscription.unsubscribe() 
    };

    render() {
        return (
            <div>
                <AntUpload 
                    beforeUpload= {this.beforeUpload}
                    customRequest ={this.customRequest}
                >
                    <Button>
                        <UploadOutlined /> 上传视频
                    </Button>
                </AntUpload>
            </div>
        )
    }
}
