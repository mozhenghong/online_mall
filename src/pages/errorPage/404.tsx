import React, { FC, ReactElement } from 'react';
import './index.scss';

const NoFoundPage: FC = (): ReactElement => {

  return (
    <div className="error404-Wrap">
      <div className="img404"></div>
      <div className="text404">
        <p>对不起，您访问的页面不存在</p>
      </div>
    </div>
  );
};

export default NoFoundPage;
