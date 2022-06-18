import React, { FC, ReactElement } from 'react';
import './index.scss';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const Error403: FC = (): ReactElement => {
  const navigate = useNavigate();

  return (
    <div className="error403-Wrap">
      <div className="img403"></div>
      <div className="text403">
        <p>对不起，您没有访问该页面的权限</p>
      </div>
      <Button
        type="primary"
        onClick={() => {
          navigate(-1);
        }}
        style={{ width: 144, height: 50 }}
      >
        返回
      </Button>
    </div>
  );
};

export default Error403;
