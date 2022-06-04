import React, { FC, useState, useEffect } from "react";
import { Table, Button, Form, Input } from "antd";
import "./index.scss";
import { useStores } from '@/store';
import { observer } from 'mobx-react';
import UpdateUser from './components/updateUser';

const UserManagement: FC<{}> = () => {
  let store = useStores();
  const { userStore } = store;
  const { getUserList, userList, userTotal } = userStore;
  const [form] = Form.useForm();
  const [pageNum, setPageNum] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [visible, setVisible] = useState(false);
  const [successFlag, setSuccessFlag] = useState(1);
  const [currentId, setCurrentId] = useState(0);

  const getTableList = async (data: any) => {
    await getUserList({ pageNum, pageSize, ...data })
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
      title: '姓名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '角色',
      dataIndex: 'roles',
      key: 'roles',
      render: (text) => <span>{
        text.map((item) => item.name).join('、')
      }</span>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button type="link" onClick={() => { setCurrentId(record.id); setVisible(true) }}>更新</Button>
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
    <div className="user_management_wrap">
      <div className="user_management_wrap_title">
        <Form
          layout="inline"
          form={form}
          onFinish={onFinish}
        >
          <Form.Item label="用户名" name="search">
            <Input placeholder="请输入用户名搜索" />
          </Form.Item>
          <Form.Item>
            <Button onClick={onReset}>重置</Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">搜索</Button>
          </Form.Item>
        </Form>
      </div>
      <Table
        columns={columns}
        dataSource={userList}
        onChange={tableOnChange}
        rowKey="id"
        pagination={{
          pageSize,
          current: pageNum,
          showTotal: () => <div>{` 共: ${userTotal} 条 `}</div>,
          showQuickJumper: true,
          showSizeChanger: true,
          total: userTotal,
        }}
      />
      <UpdateUser
        visible={visible}
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

export default observer(UserManagement);
