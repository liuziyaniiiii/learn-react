// import React, { Component } from "react";
// // 引入antd组件
// import { Button, Table } from "antd";
// // 引入antd字体图标
// import { PlusOutlined, FormOutlined, DeleteOutlined } from "@ant-design/icons";

// import {reqGetSubjectList} from "@api/edu/subject" 

// import "./index.less";

// export default class Subject extends Component {
//   state={
//     subjects:{
//       total:0,
//       items:[],
//     },
//   };
//   componentDidMount(){
//     this.getSubjectList(1,10);
//   }
//   getSubjectList = async(page,limit)=>{
//     const result = await reqGetSubjectList(page,limit);
//     this.setState({
//       subjects:result,
//     })
//   }

//   render() {
//     const {subjects} = this.state;
//     const columns = [
//       {
//         // 表头显示的内容
//         title: "分类名称",
//         // 当前列要显示data中哪个数据（显示数据的key属性）
//         // data[dataIndex]
//         dataIndex: "title",
//         // 遍历元素需要唯一key属性
//         key: "title",
//       },
//       {
//         title: "操作",
//         dataIndex: "",
//         key: "action",
//         // 列的宽度
//         width: 200,
//         // 默认情况下，渲染的内容是纯文本
//         // 如果想渲染成其他方案（按钮）需要用render方法指定
//         render: () => (
//           <>
//             <Button type="primary">
//               <FormOutlined />
//             </Button>
//             <Button type="danger" className="subject-btn">
//               <DeleteOutlined />
//             </Button>
//           </>
//         ),
//       },
//     ];

//     return (
//       <div className="subject">
//         <Button type="primary" className="subject-btn">
//           <PlusOutlined />
//           新建
//         </Button>
//         <Table
//           columns={columns} // 决定列头
//           expandable={{
//             // 决定列是否可以展开
//             // 决定行展开时显示什么内容
//             expandedRowRender: (record) => (
//               <p style={{ margin: 0 }}>{record.description}</p>
//             ),
//             // 决定行是否可以展开
//             // 返回值true 就是可以展开
//             // 返回值false 就是不可以展开
//             rowExpandable: (record) => record.name !== "Not Expandable",
//           }}
//           dataSource={subjects.items} // 决定每一行显示的数据
//           rowKey="_id"
//           pagination={{
//             total:subjects.total,
//             showQuickJumper: true, // 是否显示快速跳转
//             showSizeChanger: true, // 是否显示修改每页显示数量
//             pageSizeOptions: ["5", "10", "15", "20"],
//             defaultPageSize: 10,
//             onChange:this.getSubjectList,
//           }}
//         />
//       </div>
//     );
//   }
// }
import React, { Component } from 'react'
import {Button,Table} from 'antd';
import {PlusOutlined ,FormOutlined, DeleteOutlined} from '@ant-design/icons'

import {reqGetSubjectList} from "@api/edu/subject"

import './index.less'
export default class Subject extends Component {
  state={
    subjects:{
      total:0,
      items:[],
    },
  };

  componentDidMount(){
    this.getSubjectList(1,10);
  }

  getSubjectList = async (page,limit)=>{
    const result = await reqGetSubjectList(page,limit);
    this.setState({
      subjects:result,
    });
  };

  handleSizeChange = (page,size)=>{
    this.getSubjectList(page,size)
  }

  render() {
    const {subjects} = this.state;
    const columns = [
      {  title: '分类名称',
         dataIndex: 'title', //代表当前列要显示data中哪个数据(显示数据的keyshux)
         key: 'name'//遍历的每一列都要有唯一的key属性
      },
      
      {
        title: '操作',
        dataIndex: '',
        key: 'action',
        width:200,
        // align:"right",
        render: () => <>
          <Button type="primary"><FormOutlined/></Button>
          <Button type="danger" className="subject-btn"><DeleteOutlined/></Button>
        </>, //默认情况下,渲染的内容是纯文本,如果想渲染成其他方案,需要用render方法指定
      },
    ];
    
    // const data = [
    //   {
    //     key: 1,
    //     name: 'John Brown',
    //     age: 32,
    //     address: 'New York No. 1 Lake Park',
    //     description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    //   },
    // ];
    return (
      <div className="subject">
        <Button type="primary" className="subject-btn">
          <PlusOutlined />
          新建
        </Button>
        <Table
          columns={columns}//决定列头 
          expandable={{//决定是否可以展开
            // 决定行展开时显示什么内容
            expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
            // 具体决定每一行是否可以展开
            rowExpandable: record => record.name !== 'Not Expandable',
          }}
          dataSource={subjects.items} //决定每一行的数据
          rowKey="_id"
          pagination={{
            total:subjects.total,
            showQuickJumper: true, // 是否显示快速跳转
            showSizeChanger: true, // 是否显示修改每页显示数量
            pageSizeOptions: ["5", "10", "15", "20"],
            defaultPageSize: 10,
            onChange: this.getSubjectList,
            onShowSizeChange: this.handleSizeChange
          }}
        />,
      </div>
    )
  }
}
