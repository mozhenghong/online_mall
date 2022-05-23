import React, { FC, useState, useEffect } from "react";
import { Table, Button} from "antd";
import "./index.scss";
import { useStores } from '@/store';
import { observer } from 'mobx-react';

const UserManagement: FC<{}> = () => {
  let store = useStores();
  const { userStore } = store;
  const { getUserList, userList, userTotal } = userStore;
  const [pageNum, setPageNum] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  useEffect(()=>{
    getUserList({ pageNum, pageSize })
  },[pageNum, pageSize])

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

  const tableOnChange = (pagination: any) => {
    setPageNum(pagination.current);
    setPageSize(pagination.pageSize)
  };

  return (
    <div className="user_management_wrap">
      <Table 
        columns={columns} 
        dataSource={userList} 
        onChange={tableOnChange}
        pagination={{
          pageSize,
          current: pageNum,
          showTotal: () => <div>{` 共: ${userTotal} 条 `}</div>,
          showQuickJumper: true,
          showSizeChanger: true,
          total: userTotal,
        }}
      />
    </div>
  );
};

export default observer(UserManagement);
