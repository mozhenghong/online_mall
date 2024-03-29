import React, { FC } from "react";
import { Button } from "antd";
import "./index.scss";
import { useNavigate } from 'react-router-dom';
import { useStores } from '@/store';
import { observer } from 'mobx-react';

const OrderManagement: FC<{}> = () => {
  let store = useStores();
  const { userStore } = store;
  const { login } = userStore;
  const navigate = useNavigate()
  return (
    <div className="order_anagement">
      订单管理
      <Button type="primary" onClick={() => navigate('/login', { state: 'xxxxxx', replace: true })}>下订单</Button>
      <Button>请求</Button>
    </div>
  );
};

export default observer(OrderManagement);
