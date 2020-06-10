import React, { Component } from "react";
// 引入antd组件
import { Button, Table } from "antd";
// 引入antd字体图标
import { PlusOutlined, FormOutlined, DeleteOutlined } from "@ant-design/icons";
import { connect } from "react-redux";

import { getSubjectList, getSubSubjectList } from "./redux";

import "./index.less";

@connect(
  (state) => ({ subjectList: state.subjectList }),
  {
    getSubjectList,
    getSubSubjectList,
  }
)
class Subject extends Component {
  state = {
    expandedRowKeys: [], 
  };

  componentDidMount() {
    this.props.getSubjectList(1, 10);
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

  //显示添加界面
  showAddSubject = ()=>{
    this.props.history.push("/edu/subject/add");
  }

  render() {
    const { subjectList, getSubjectList } = this.props;
    const { expandedRowKeys } = this.state;

    const columns = [
      {
        title: "分类名称",
        dataIndex: "title",
        key: "title",
      },
      {
        title: "操作",
        dataIndex: "",
        key: "action",
        width: 200,
        render: () => (
          <>
            <Button type="primary">
              <FormOutlined />
            </Button>
            <Button type="danger" className="subject-btn">
              <DeleteOutlined />
            </Button>
          </>
        ),
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
            total: subjectList.total,
            showQuickJumper: true, 
            showSizeChanger: true, 
            pageSizeOptions: ["5", "10", "15", "20"],
            defaultPageSize: 10,
            onChange: getSubjectList,
            onShowSizeChange: getSubjectList,
          }}
        />
      </div>
    );
  }
}

export default Subject;
