import React, { FC, ReactElement } from 'react';
import './index.scss';

const Error403: FC = (): ReactElement => {

  return (
    <div className="error403-Wrap">
      <div className="img403"></div>
      <div className="text403">
        <p>对不起，您没有访问该页面的权限</p>
      </div>
    </div>
  );
};

export default Error403;
