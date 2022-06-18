import React, { FC, ReactElement } from 'react';
import './index.scss';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const NoFoundPage: FC = (): ReactElement => {
  const navigate = useNavigate();

  return (
    <div className="error404-Wrap">
      <div className="img404"></div>
      <div className="text404">
        <p>对不起，您访问的页面不存在</p>
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

export default NoFoundPage;
