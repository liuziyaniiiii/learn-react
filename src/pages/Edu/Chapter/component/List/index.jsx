import React, { Component } from 'react'
import {Button,Tooltip,Alert,Table,Modal} from 'antd'
import {
    PlusOutlined,
    FullscreenOutlined,
    ReloadOutlined,
    SettingOutlined,
    FormOutlined,
    DeleteOutlined,
    EyeOutlined

}from "@ant-design/icons"
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import Player from 'griffith'

import {getAllLessonList} from "../../redux"

import "./index.less"

@withRouter
@connect((state)=>({chapters:state.chapter.chapters}),{getAllLessonList})
class List extends Component {
    state = {
        expandedRowKeys:[],
        isShowVideoModal:false,
        lesson:{}
    };
    handleExpandedRowsChange = (expandedRowKeys) => {
        const length = expandedRowKeys.length;
        if (length > this.state.expandedRowKeys.length) {
          const lastKey = expandedRowKeys[length - 1];
          this.props.getAllLessonList(lastKey);
        }
    
        this.setState({
          expandedRowKeys,
        });
      };
    showAddLesson = (chapter)=>{
        return ()=>{
            this.props.history.push('/edu/chapter/addlesson',chapter)
        }
    }
    showVideoModal = (lesson)=>{
        return ()=>{
            this.setState({
                isShowVideoModal:true,
                lesson,
            })
        }
    }

    hiddenVidoModal = ()=>{
        this.setState({
            isShowVideoModal:false,
            lesson:{},
        }) 
    }
    render() {
        const {chapters} = this.props;
        const {expandedRowKeys,isShowVideoModal,lesson} = this.state
        const columns = [
            {
                title:'名称',
                dataIndex:"title",
                key:"title",
            },
            {
                title:"是否免费",
                dataIndex:"free",
                key:"free",
                render:(free)=>{
                    return free === undefined ? "" : free ? "是" :"否";
                }
            },
            {
                title:"视频",
                key:"video",
                render:(lesson)=>{
                    return (
                        "video" in lesson && (
                            <Tooltip title="预览视频">
                                <Button onClick={this.showVideoModal(lesson)}>
                                    <EyeOutlined />
                                </Button>
                            </Tooltip>
                        )
                    )
                }
            },
            {
                title:"操作",
                key:"action",
                width:250,
                render:(data)=>{
                    return(
                        <>
                            {
                                "free" in data ? null:(
                                    <Tooltip title="新增课时">
                                        <Button type="primary" 
                                        className="chapter-btn"
                                        onClick={this.showAddLesson(data)}
                                    >
                                            <PlusOutlined/>
                                        </Button>
                                    </Tooltip>
                                )
                            }
                            <Tooltip title="更新">
                                <Button type="primary">
                                    <FormOutlined />
                                </Button>
                            </Tooltip>
                            <Tooltip title="删除">
                                <Button type="danger" className="subject-btn">
                                    <DeleteOutlined />
                                </Button>
                            </Tooltip>
                        </>
                    )
                }
            }
        ]
        return (
            <div className="chapter-list">
                <div className="chapter-list-header">
                    <h5>课程章节列表</h5>
                    <div>
                        <Button type="primary"> 
                            <PlusOutlined/>
                            新增课程
                        </Button>
                        <Button type="danger">批量删除</Button>
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
                    columns={columns}
                    expandable={{
                        expandedRowKeys,
                        onExpandedRowsChange: this.handleExpandedRowsChange,
                    }}
                    dataSource = {chapters.items}
                    rowKey="_id"
                    pagination={{
                        total:chapters.total,
                        showQuickJumper:true,
                        showSizeChanger:true,
                        pageSizeOptions:["5","10","15","20"],
                        defaultPageSize:10,
                    }}
                />
                <Modal
                    title={lesson.title}
                    visible={isShowVideoModal}
                    onCancel={this.hiddenVidoModal}
                    footer={null}
                    centered
                    destroyOnClose={true}
                    >
                    <Player sources={{
                        hd: {
                            play_url:lesson.video,

                          }
                    }} />
                </Modal>
            </div>
        );
    }
}
export default List;
