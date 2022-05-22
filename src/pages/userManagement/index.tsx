import React, { FC, useEffect } from "react";
import { Table, Button} from "antd";
import "./index.scss";
import { useStores } from '@/store';
import { observer } from 'mobx-react';

const UserManagement: FC<{}> = () => {
  let store = useStores();
  const { userStore } = store;
  const { getUserList, userList, userTotal } = userStore;

  useEffect(()=>{
    getUserList({})
  },[])

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      render: (text, record, index) => <span>{index+1}</span>,
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
      render: (text:Array<Object>) => <span>{text.map((item) => item.name).join('、')}</span>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button type="link">更新</Button>
      ),
    },
  ];

  return (
    <div className="user_management_wrap">
      <Table columns={columns} dataSource={userList} />
    </div>
  );
};

export default observer(UserManagement);
