import React, {useEffect} from 'react'
import {Form,Select,Button, message} from "antd";
import {connect} from 'react-redux';
import {getAllCourseList,getAllChapterList} from '../../redux'
import './index.less'
const {Option} = Select;


function Search({getAllCourseList,allCourseList,getAllChapterList}) {
    const [form] =Form.useForm();

    const finish = async ({courseId})=>{
        // console.log(values);
        await getAllChapterList({page:1,limit:10,courseId});
        message.success("获取课时数据成功")
    };

    const resetForm  = () =>{
        form.resetFields()
    }
        useEffect(()=>{
            getAllCourseList();
        },[getAllCourseList]);

        return (
            <Form 
                onFinish={finish} 
                layout="inline" 
                className="chapter-search"
                form={form}
            >
                <Form.Item
                    label="选择课程"
                    name="courseId"
                    rules={[{required:true,message:"请选择课程分类"}]}
                >
                    <Select placeholder="请选择课程" className="chapter-search-select">
                        {allCourseList.map((course)=>{
                            return (
                                <Option key={course._id} value={course._id}>
                                    {course.title}
                                </Option>
                            )
                        })}
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" >
                        查询课程章节
                    </Button>
                    <Button className="subject-btn" onClick={resetForm}>
                        重置
                    </Button>
                </Form.Item>
            </Form>
        )
}
export default connect(
    (state) => ({allCourseList: state.chapter.allCourseList}),
    {
        getAllCourseList,
        getAllChapterList
    }
)(Search)
