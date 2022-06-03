import React, { FC, useState, useEffect } from "react";
import { Table, Button, Form, Input, Popconfirm, message } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import "./index.scss";
import { useStores } from '@/store';
import { observer } from 'mobx-react';
import AddCourse from './components/addCourse';


const CourseManagement: FC<{}> = () => {
  let store = useStores();
  const { courseStore, orderStore  } = store;
  const { getCourseList, courseList, courseTotal, deleteCourse } = courseStore;
  const { placeOrder } = orderStore;
  const [form] = Form.useForm();
  const [pageNum, setPageNum] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [visible, setVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [successFlag, setSuccessFlag] = useState(1);
  const [currentId, setCurrentId] = useState(0);

  const getTableList = async (data: any) => {
    await getCourseList({ pageNum, pageSize, ...data })
  }

  useEffect(() => {
    getTableList({})
  }, [pageNum, pageSize, successFlag])

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      render: (text, record, index) => <span>{index + 1 + (pageNum - 1) * pageSize}</span>,
    },
    {
      title: '课程名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '课程简介',
      dataIndex: 'description',
      key: 'description',

    },
    {
      title: '授课教师',
      dataIndex: 'teacherName',
      key: 'teacherName',
    },
    {
      title: '教师简介',
      dataIndex: 'teacherDescription',
      key: 'teacherDescription',
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      render: (text) => <span>{text / 100 || 0}元</span>,
    },
    {
      title: '视频',
      dataIndex: 'videoList',
      key: 'videoList',
      render: (text) => <span>{
        text.map((item) => item.name).join('、')
      }</span>,
    },
    {
      title: 'Action',
      key: 'action',
      width: 300,
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => {placeOrder({courseId: record.id}).then((res)=>{
            console.log(res)
            document.appendChild(res.data.data.formHtml)
          })}}>下单</Button>
          <Button type="link" onClick={() => { setCurrentId(record.id); setIsEdit(true); setVisible(true); }}>更新</Button>
          <Popconfirm
            title="您确定要删除此课程吗？"
            onConfirm={() => {
              deleteCourse(record.id).then(res => {
                message.success('删除成功')
                setSuccessFlag(Math.random())
              })
            }}
            okText="确定"
            cancelText="取消"
          >
            <Button type="link" onClick={() => { }}>删除</Button>
          </Popconfirm>

        </>
      ),
    },
  ];

  const tableOnChange = (pagination: any) => {
    setPageNum(pagination.current);
    setPageSize(pagination.pageSize)
  };
  const onFinish = (values: any) => {
    setPageNum(1);
    getTableList(values)
  };

  const onReset = () => {
    form.resetFields();
    getTableList({})
  };

  return (
    <div className="course_management_wrap">
      <div className="course_management_wrap_title">
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
        <Button type="primary" icon={<PlusOutlined />} onClick={() => { setIsEdit(false); setVisible(true); }}>新建课程</Button>
      </div>
      <Table
        columns={columns}
        dataSource={courseList}
        onChange={tableOnChange}
        rowKey="id"
        pagination={{
          pageSize,
          current: pageNum,
          showTotal: () => <div>{` 共: ${courseTotal} 条 `}</div>,
          showQuickJumper: true,
          showSizeChanger: true,
          total: courseTotal,
        }}
      />
      <AddCourse
        visible={visible}
        isEdit={isEdit}
        currentId={currentId}
        onSuccess={(isSuccess: number) => {
          setSuccessFlag(isSuccess);
        }}
        onChangeVisible={(visible: boolean) => {
          setVisible(visible);
        }} />
    </div>
  );
};

export default observer(CourseManagement);
