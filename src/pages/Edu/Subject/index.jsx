import React, { Component } from "react";
// 引入antd组件
import { Button, Table } from "antd";
// 引入antd字体图标
import { PlusOutlined, FormOutlined, DeleteOutlined } from "@ant-design/icons";
import { connect } from "react-redux";

import { getSubjectList, getSubSubjectList } from "./redux";

import "./index.less";

@connect(
  (state) => ({ subjectList: state.subjectList }), // 状态数据
  {
    // 更新状态数据的方法
    getSubjectList,
    getSubSubjectList,
  }
)
class Subject extends Component {
  state = {
    expandedRowKeys: [], // 展开项
  };

  componentDidMount() {
    // 代表一上来请求第一页数据
    this.props.getSubjectList(1, 10);
  }

  
  handleExpandedRowsChange = (expandedRowKeys) => {
    console.log("handleExpandedRowsChange", expandedRowKeys);
    // 长度
    const length = expandedRowKeys.length;

    // 如果最新长度大于之前的长度，说明就是展开~
    if (length > this.state.expandedRowKeys.length) {
      // 点击要展开的最后一项值~
      const lastKey = expandedRowKeys[length - 1];
      // 发送请求，请求要展开菜单的二级菜单数据
      this.props.getSubSubjectList(lastKey);
    }

    // 更新state --> 告诉Table哪个子菜单需要展开
    this.setState({
      expandedRowKeys,
    });
  };

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
        <Button type="primary" className="subject-btn">
          <PlusOutlined />
          新建
        </Button>
        <Table
          columns={columns} // 决定列头
          expandable={{
            expandedRowKeys,
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
