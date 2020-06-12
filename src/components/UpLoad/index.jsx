import React, { Component } from 'react'
import {Button, Upload as AntUpload,message} from 'antd'
import {UploadOutlined} from '@ant-design/icons'

import * as qiniu from 'qiniu-js'
import {nanoid} from 'nanoid'

import {reqGetUploadToken} from '@api/edu/upload'
import qiniuconfig from '@conf/qiniu'

const MAX_VIDEO_SIZE = 35 * 1024 * 1024;

export default class Upload extends Component {

    getUploadToken = ()=>{
        try{
            const {uploadToken,expires} = JSON.parse(
                localStorage.getItem("upload_token")
            );

            if(!this.isValidUploadToken(expires)){
                throw new Error("uploadToken过期了")
            }
            return{
                uploadToken,
                expires,
            }
        }catch{
            return{
                uploadToken:"",
                expires:0,
            }
        }
    }

    state = {
        ...this.getUploadToken(),
        isUploadSuccess :false
    }

    fetchUploadToken = async()=>{
        const {uploadToken,expires} =  await reqGetUploadToken()
        this.saveUploadToken(uploadToken,expires)
    }

    isValidUploadToken = (expires)=>{
        return expires > Date.now();
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
            if(!this.isValidUploadToken(expires)){
                //过期了.重新发送请求
                await this.fetchUploadToken();
            }
            resolve(file); //file就会作为要上传的文件
        });
    };


    //自定义上传视频方案 qiniu-js
    customRequest = ({file,onProgress,onSuccess,onError})=>{
        const {uploadToken} =this.state
        // console.log(uploadToken)
        const key = nanoid(10);

        const putExtra = {
            fname:"",
            mineType:["video/mp4"]
        };

        const config = {
            region:qiniuconfig.region,
        }

        //创建上传文件对象
        const observable = qiniu.upload(
            file,
            key, 
            uploadToken, 
            putExtra, 
            config
        )
        const observer = {
            next(res) { //上传过程中触发的回调函数
                const percent = res.total.percent.toFixed(2);
                onProgress({percent},file);
            },
            error(err) { //上传失败触发的回调函数
                onError(err)
                message.error("上传视频失败")
            },
            complete: (res) => {
                onSuccess(res)
                message.success("上传视频成功")
                // console.log(res);
                const video = qiniuconfig.prefix_url + res.key
                this.props.onChange(video);
                this.setState({
                    isUploadSuccess:true
                })
            }
        }
        this.subscription = observable.subscribe(observer) // 上传开始
    };
    componentWillUnmount(){
        this.subscription && this.subscription.unsubscribe()
    }

    remove = ()=>{
        this.subscription && this.subscription.unsubscribe()
        this.props.onChange("");
        this.setState({
            isUploadSuccess:false
        });
    }

    render() {
        const {isUploadSuccess} = this.state
        return (
            <div>
                <AntUpload
                    accept="video/mp4" //决定只上传哪种类型的文件
                    listType="picture"
                    beforeUpload= {this.beforeUpload}
                    customRequest ={this.customRequest}
                    onRemove={this.remove}
                >
                    {
                        isUploadSuccess ? null : (
                            <Button>
                                <UploadOutlined /> 上传视频
                            </Button>
                        )
                    }
                </AntUpload>
            </div>
        )
    }
}
