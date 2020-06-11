import React, { Component } from 'react'
import {Button,Tooltip,Alert,Table} from 'antd'
import {
    PlusOutlined,
    FullscreenOutlined,
    ReloadOutlined,
    SettingOutlined,}
 from "@ant-design/icons"

import "./index.less"

export default class List extends Component {
    render() {
        return (
            <div className="chapter-list">
                <div className="chapter-list-header">
                    <h5>课程章节列表</h5>
                    <div>
                        <Button type="primary"> 
                            <PlusOutlined/>
                            新增
                        </Button>
                        <Button type="danger">删除</Button>
                        <Tooltip title="全屏">
                            <FullscreenOutlined/>
                        </Tooltip>
                        <Tooltip title="刷新">
                            <ReloadOutlined/>
                        </Tooltip>
                        <Tooltip title="设置">
                            <SettingOutlined/>
                        </Tooltip>
                    </div>
                </div>
                <Alert message="已选择 0 项" type="info" showIcon/>
                <Table
                    className="chapter-list-table"
                    columns={[]}
                    expandable={{}}
                    dataSource = {[]}
                    rowKey="_id"
                    pagination={{
                        showQuickJumper:true,
                        showSizeChanger:true,
                        pageSizeOptions:["5","10","15","20"],
                        defaultPageSize:10,
                    }}
                />
            </div>
        );
    }
}
