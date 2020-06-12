import React from 'react'
import {PageHeader,Form,Card,Input,Button,Switch} from 'antd'

import Upload from '@comps/UpLoad'

import './index.less'

const layout = {
    labelCol:{span:2},
    wrapperCol: {span:5},
}

export default function AddLesson() {
    const onFinish = ()=>{}
    const onBack = ()=>{}
      return (
                <Card 
                    title={
                        <PageHeader
                            className="site-page-header"
                            onBack={onBack}
                            title="新增课时"
                            // subTitle="This is a subtitle"
                        />
                    }
                >
                     <Form
                        {...layout}
                        name="basic"
                        onFinish={onFinish}
                        >
                        <Form.Item
                            label="课时名称"
                            name="title"
                            rules={[{ required: true, message: '请输入课时名称' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="是否免费"
                            name="parentId"
                            valuePropName="checked"
                        >
                            <Switch checkedChildren="是" unCheckedChildren="否" defaultChecked />
                        </Form.Item>
                        
                        <Upload/>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="addlesson-button">
                            添加
                            </Button>
                        </Form.Item>
                        </Form>
                </Card>
        )

}

