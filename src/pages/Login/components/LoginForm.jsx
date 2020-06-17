import React,{useState} from 'react'
import {Form,Tabs,Input ,Row,Col,Button,Checkbox,message} from 'antd'
import { UserOutlined,LockOutlined,MobileOutlined ,WechatOutlined,GithubOutlined,QqOutlined } from '@ant-design/icons';
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import {login,mobileLogin} from "@redux/actions/login"
import {reqsendCode} from "@api/acl/oauth"
import {CLIENT_ID} from "@conf/oauth";

import './index.less'
const {TabPane} = Tabs;


const rules = [
    {required:true,},
    { max: 15, message: "输入的长度不能超过15位" },
    { min: 4, message: "输入的长度不能小于4位" },
    {
        pattern: /^[a-zA-Z0-9_]+$/,
        message: "输入内容只能包含数字、英文和下划线",
    },
]

const TOTAL_TIME=60;
let countingDownTime = TOTAL_TIME;

function LoginForm({login,mobileLogin,history}) {

    const [form] = Form.useForm();
    // 初始化倒计时 
    const [,setCountingDownTime] = useState(0);
    // 标识要不要进入倒计时(是否已经发送验证码)
    const [isSendCode,setIsSendCode] = useState(false);

    const [activekey,setActivekey] = useState("user");

    const handleTabChange = (key)=>{
        // console.log(key);
        setActivekey(key)
    }

    const finish = async (values)=>{
        if (activekey ==="user"){
            form
                .validateFields(['username','password','rem'])
                .then( async (values)=>{
                    const {username,password,rem} = values;
                    const token = await login(username,password);
                    if(rem){ 
                        localStorage.setItem("user_token",token);
                    }
                    history.replace("/");
                })
            
            return;
        }
            form
                .validateFields(['mobile','code','rem'])
                .then( async (values)=>{
                    const {mobile,code,rem} = values;
                    const token = await mobileLogin(mobile,code);
                    if(rem){ 
                        localStorage.setItem("user_token",token);
                    }
                    history.replace("/");
                })

    }

    const validateMessages = {
        required: "请输入 ${name} ",
      };
    
    const countingDown =() => {
        const timer = setInterval(()=>{
            countingDownTime--;
            if(countingDownTime<=0){
                clearInterval(timer);
                countingDownTime = TOTAL_TIME;
                setIsSendCode (false);
                return
            }
            setCountingDownTime(countingDownTime)
        },1000)   
    };
    
    //   点击发送验证码
    const sendCode =()=>{
        // 手动触发表单校验规则
        form.validateFields(['mobile'])
            .then( async ({mobile})=>{
                await reqsendCode(mobile)
                setIsSendCode(true)//代表已经发送过验证码
                countingDown()
                message.success("验证码发送成功")
            })
            .catch((err)=>{})
    }

    const goGithub =()=>{
        window.location.href = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`
    }

    return (
        <Form 
            form={form}
            validateMessages={validateMessages} 
            initialValues={{rem:"checked"}}
            // onFinish={finish}
        >
            <Tabs activeKey={activekey} onChange={handleTabChange}>
                <TabPane tab="账户密码登录" key="user">
                    <Form.Item name="username" 
                    //  rules={[
                    //     {required:true,message:"请输入用户名称"},
                    //     {max:15,message:"输入的长度不能超过15个字符"},
                    //     {min:4,message:"输入的长度不能小于4"},
                    //     {
                    //         pattern:/^[a-zA-Z0-9_]+$/,
                    //         message:"输入的内容只能包含数字,英文和下划线"
                    //     }
                    // ]}
                    rules={rules}
                    >
                        <Input prefix={<UserOutlined />} placeholder="用户名: Admin"/>
                    </Form.Item>
                    <Form.Item name="password" 
                    // rules={[
                    //     {required:true,message:"请输入密码"},
                    //     {max:15,message:"输入的长度不能超过15个字符"},
                    //     {min:4,message:"输入的长度不能小于4"},
                    //     {
                    //         pattern:/^[a-zA-Z0-9_]+$/,
                    //         message:"输入的内容只能包含数字,英文和下划线"
                    //     }
                    // ]}
                    rules={rules}
                    >
                        <Input prefix={<LockOutlined />} placeholder="密码: 111111"/>
                    </Form.Item>
                </TabPane>
                <TabPane tab="手机号登录" key="mobile">
                        <Form.Item
                            name="mobile"
                            // 表单校验规则
                            rules={[
                            { required: true, message: "请输入手机号" },
                            {
                                pattern: /^(((13[0-9])|(14[579])|(15([0-3]|[5-9]))|(16[6])|(17[0135678])|(18[0-9])|(19[89]))\d{8})$/,
                                message: "请输入正确的手机号",
                            },
                            ]}
                        >
                            <Input prefix={<MobileOutlined />} placeholder="手机号" />
                        </Form.Item>
                        <Row justify="space-between">
                            <Col>
                                <Form.Item
                                name="code"
                                rules={[
                                {
                                    required: true,
                                    message: "请输入验证码",
                                },
                                {
                                    pattern: /^[0-9]{6}$/,
                                    message: "请输入正确的验证码",
                                },
                                ]}
                                >
                                
                                <Input placeholder="验证码" />
                                </Form.Item>
                            </Col>
                        
                            <Col>
                                <Form.Item>
                                <Button onClick={sendCode} disabled={isSendCode}>
                                    {isSendCode ? `${countingDownTime}秒后可重发` : "点击发送验证码"}
                                </Button> 
                                </Form.Item>
                            </Col>
                        </Row>
                </TabPane>   
            </Tabs>
            <Row justify="space-between">
                <Col>
                    <Form.Item name="rem" valuePropName="checked">
                        <Checkbox>记住密码</Checkbox>
                    </Form.Item>
                </Col>
                <Col>
                    <Form.Item name="forget" valuePropName="checked">
                        <Button type="link">忘记密码</Button>
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item>
                <Button type="primary" onClick={finish} className="login-form-btn" >登录</Button>
            </Form.Item>
            <Row justify="space-between">
                <Col>
                    <Form.Item>
                        <div className="login-form-icon">
                            <span>其他登录方式</span>
                            <GithubOutlined className="icons" onClick={goGithub}/>
                            <QqOutlined className="icons"/>
                            <WechatOutlined className="icons" />
                        </div>
                    </Form.Item>
                </Col>
                <Col>
                    <Form.Item >
                        <Button type="link">注册</Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}

export default withRouter(connect(null,{login,mobileLogin})(LoginForm))