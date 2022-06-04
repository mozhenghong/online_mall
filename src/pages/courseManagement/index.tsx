import React, { FC, useState, useEffect } from "react";
import { Table, Button, Form, Input, Popconfirm, message, Modal, Spin } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import "./index.scss";
import { useStores } from '@/store';
import { observer } from 'mobx-react';
import AddCourse from './components/addCourse';
import { BasePage } from '@/api/interface';
import { ObservableValue } from "mobx/dist/internal";

const initPageInfo = { pageNum: 1, pageSize: 10 };

const CourseManagement: FC<{}> = () => {
  let store = useStores();
  const { courseStore, orderStore } = store;
  const { getCourseList, courseList, courseTotal, deleteCourse } = courseStore;
  const { placeOrder } = orderStore;
  const [form] = Form.useForm();
  const [pageInfo, setPageInfo] = useState<BasePage>(initPageInfo);
  const [visible, setVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [successFlag, setSuccessFlag] = useState(1);
  const [currentId, setCurrentId] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const getTableList = async (data: {}) => {
    await getCourseList({ ...pageInfo, ...data })
  }

  useEffect(() => {
    getTableList({})
  }, [pageInfo.pageNum, pageInfo.pageSize, successFlag])

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      render: (text: string, record: Object, index: number) => <span>{index + 1 + (pageInfo.pageNum - 1) * pageInfo.pageSize}</span>,
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
      render: (text: string) => <span>{Number(text) ? `${Number(text) / 100}元` : '免费'}</span>,
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
          <Button type="link" onClick={() => {
            placeOrder(record.id).then((res) => {
              setIsModalVisible(true)
              let newWindow = window.open('about:blank')
              newWindow.document.write(res.data.formComponentHtml)
              newWindow.focus()
            })
          }}>下单</Button>
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
            <Button type="link">删除</Button>
          </Popconfirm>

        </>
      ),
    },
  ];

  const tableOnChange = (pagination: any) => {
    setPageInfo(pagination)
  };
  const onFinish = (values: any) => {
    setPageInfo({ ...pageInfo, pageNum: 1 })
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
          pageSize: pageInfo.pageSize,
          current: pageInfo.pageNum,
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

      <Modal title="下单结果" visible={isModalVisible} okText="已支付" cancelText="支付失败" onOk={() => { }} onCancel={() => { }}>
        <Spin>
          订单生成中...
        </Spin>
      </Modal>

    </div>
  );
};

export default observer(CourseManagement);
