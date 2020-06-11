import React, { Component } from "react";
// 引入antd组件
import { Button, Table ,Tooltip,Input,message,Modal} from "antd";
// 引入antd字体图标
import { PlusOutlined, FormOutlined, DeleteOutlined,ExclamationCircleOutlined } from "@ant-design/icons";
import { connect } from "react-redux";

import { getSubjectList, getSubSubjectList ,updateSubject} from "./redux";
import {reqDelSubject} from "@api/edu/subject";

import "./index.less";

@connect(
  (state) => ({ subjectList: state.subjectList }),
  {
    getSubjectList,
    getSubSubjectList,
    updateSubject,
  }
)
class Subject extends Component {
  state = {
    expandedRowKeys: [], //展开项
    subjectId:"",//更新的课程分类id
    subjectTitle:"",//要更新的课程分类标题
    updateSubjectTitle:"",//正在更新分类的标题
    current:1, //当前页数
    pageSize:10,//每页条数
  };

  componentDidMount() {
    this.getSubjectList(1, 10);
  }

  
  handleExpandedRowsChange = (expandedRowKeys) => {
    // console.log("handleExpandedRowsChange", expandedRowKeys);
    const length = expandedRowKeys.length;
    // 如果最新长度大于当前的长度,需要更新expandedRowKeys并发送请求
    //但如果是关闭,只需要更新expandedRowKeys,但不发送请求
    if (length > this.state.expandedRowKeys.length) {
      const lastKey = expandedRowKeys[length - 1];
      this.props.getSubSubjectList(lastKey);
    }
    // 更新状态
    this.setState({
      expandedRowKeys,
    });
  };

  // 在切换每页数量时只固定显示第一页的数据
   getFirstPageSubjectList = (page,limit)=>{
    this.getSubjectList(1,limit)
  }

  //显示添加界面
  showAddSubject = ()=>{
    this.props.history.push("/edu/subject/add");
  }
  //收集更新分类标题数据
  handleInputChange = (e)=>{
    this.setState({
      updateSubjectTitle:e.target.value,
    });
  };
  //显示更新分类
  showUpdateSubject = (subject)=>{
    return ()=>{
      if(this.state.subjectId){
        message.warn("请更新当前")
        return
      }
      this.setState({
        subjectId:subject._id,
        subjectTitle:subject.title
      });
    };
  };
  // 取消更新课程分类
  cancel = ()=>{
    this.setState({
      subjectId:"",
      updateSubjectTitle:"",
    });
  };
  //更新课程分类
  updateSubject = async ()=>{
    const {subjectId,updateSubjectTitle,subjectTitle} = this.state;
    if(!updateSubjectTitle){
      message.warn("请输入要更新的标题")
      return;
    }
    if(updateSubjectTitle === subjectTitle){
      message.warn("更新的标题不能与之前一样")
      return;
    }
    await this.props.updateSubject(updateSubjectTitle,subjectId);
    message.success("更新分类数据成功");
    this.cancel();
  }
  //删除课程分类
  delSubject = (subject)=>{
    return ()=>{
      Modal.confirm({
        title:<p>你确定要删除<span className="subject-text">{subject.title}</span>课程分类吗?</p>,
        icon:<ExclamationCircleOutlined/>,
        onOk: async()=>{
          await reqDelSubject(subject._id);
          message.success("删除课程数据成功")
          const {current,pageSize} = this.state

          if(current>1 && 
            this.props.subjectList.items.length === 1 && 
            subject.parentId==="0"){
            this.getSubjectList(current-1,pageSize)
            return
          }
          this.getSubjectList(current,pageSize)
        },
      });
    }
  };
  getSubjectList = (page,limit)=>{
    this.setState({
      current:page,
      pageSize:limit
    })
    // this.pageData = {page,limit}
    return this.props.getSubjectList(page,limit)
  }
  //保存page和limit的对象
  // pageData = {
  //   page:1,
  //   limit:10
  // }
  render() {
    const { subjectList } = this.props;
    const { expandedRowKeys,current,pageSize } = this.state;

    const columns = [
      {
        title: "分类名称",
        // dataIndex: "title",
        key: "title",
        render:(subject)=>{
          //点击按钮要更新的目标ID
          const {subjectId} = this.state;
          //得到当前要渲染的分类id
          const id = subject._id;
          
          if(subjectId === id){
            return(
              <Input 
                className="subject-input"
                defaultValue={subject.title}
                onChange={this.handleInputChange}
              />
            )
          }
          return <span>{subject.title}</span>
        }
      },
      {
        title: "操作",
        dataIndex: "",
        key: "action",
        width: 200,
        render: (subject) => {

          const {subjectId} = this.state;
          const id = subject._id;

          if(subjectId === id){
            return(
              <>
                <Button type="primary" onClick={this.updateSubject}>
                  确认
                </Button>
                <Button className="subject-btn" onClick={this.cancel}>
                  取消
                </Button>
              </>
            )
          }
          return(
            <>
            <Tooltip title="更新课程分类">
              <Button 
                type="primary"
                onClick={this.showUpdateSubject(subject)}
              >
                <FormOutlined />
              </Button>
            </Tooltip>
            <Tooltip title="删除课程分类">
              <Button type="danger" className="subject-btn" onClick={this.delSubject(subject)}>
                <DeleteOutlined />
              </Button>
            </Tooltip>
          </>
          )
        },
      },
    ];

    return (
      <div className="subject">
        <Button type="primary" className="subject-btn" onClick={this.showAddSubject}>
          <PlusOutlined />
          新建
        </Button>
        <Table
          columns={columns} // 决定列头
          expandable={{
            //控制展开的行,内部默认会使用children作为展开的子菜单
            expandedRowKeys,
            //展开行时触发的回调,将展开的行作为参数传入
            onExpandedRowsChange: this.handleExpandedRowsChange,
          }}
          dataSource={subjectList.items}
          rowKey="_id" 
          pagination={{
            // 分页器
            current,
            pageSize,
            total: subjectList.total,
            showQuickJumper: true, 
            showSizeChanger: true, 
            pageSizeOptions: ["5", "10", "15", "20"],
            defaultPageSize: 10,
            onChange: this.getSubjectList,
            onShowSizeChange: this.getFirstPageSubjectList,
          }}
        />
      </div>
    );
  }
}

export default Subject;
