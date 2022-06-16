import React, { FC, useState, useEffect } from "react";
import { Button, Form, Input } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import "./index.scss";
import { useStores } from '@/store';
import { observer } from 'mobx-react';
import AddCourse from './components/addCourse';
import { BasePage } from '@/api/interface';
import { useNavigate } from 'react-router-dom';
import { CourseItem } from '@/api/course';
import CoverSrc from '@/assets/layout/cover.jpeg';
import { CourseListParams } from '@/api/course';

const initPageInfo = { pageNum: 1, pageSize: 10 };

const CourseManagement: FC<{}> = () => {
  const { courseStore: { getCourseList, courseList } } = useStores();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [pageInfo, setPageInfo] = useState<BasePage>(initPageInfo);
  const [addCoursevisible, setAddCourseVisible] = useState(false);
  const [successFlag, setSuccessFlag] = useState(1);

  const getTableList = async (data: CourseListParams|{}) => {
    await getCourseList({ ...pageInfo, ...data });
  }

  useEffect(() => {
    getTableList({});
  }, [pageInfo, successFlag])

  const onFinish = (values: object) => {
    setPageInfo({ ...pageInfo, pageNum: 1 });
    getTableList(values);
  };

  const onReset = () => {
    form.resetFields();
    getTableList({});
  };

  return (
    <div className="course-management">
      <div className="course-management-title">
        <Form
          layout="inline"
          form={form}
          onFinish={onFinish}
        >
          <Form.Item label="课程名称" name="search">
            <Input placeholder="请输入课程名称搜索" />
          </Form.Item>
          <Form.Item>
            <Button onClick={onReset}>重置</Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">搜索</Button>
          </Form.Item>
        </Form>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setAddCourseVisible(true)}>新建课程</Button>
      </div>
      <div className="course-management-body">
        {
          courseList.map((item: CourseItem) => (
            <div className="course-management-body-item" onClick={() => {
              navigate(`detail?id=${item.id}`)
            }}>
              <img src={CoverSrc} alt="" className="course-management-body-item-cover" />
              <div className="course-management-body-item-title">
                {item.name}
              </div>
              <div className="course-management-body-item-teacher">
                教学方：{item.teacherName}
              </div>
              <div className="course-management-body-item-price">
                {item.price ? `￥ ${(Number(item.price) / 100).toFixed(2)}` : '免费'}
              </div>
            </div>
          ))
        }
      </div>
      <AddCourse
        visible={addCoursevisible}
        onSuccess={(successFlag: number) => {
          setSuccessFlag(successFlag);
        }}
        onChangeVisible={(visible: boolean) => {
          setAddCourseVisible(visible);
        }} />
    </div>
  );
};

export default observer(CourseManagement);
