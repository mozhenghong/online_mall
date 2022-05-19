import React, { FC } from "react";
import { Button } from "antd";
import "./index.scss";
import { useNavigate } from 'react-router-dom'

const Order: FC<{}> = () => {
    const navigate = useNavigate()
  return (
    <div className="order">
      <Button type="primary" onClick={()=>navigate('/login', {state: 'xxxxxx', replace: true})}>下订单</Button>
    </div>
  );
};

export default Order;
