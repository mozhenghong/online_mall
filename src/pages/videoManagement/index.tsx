import React, { FC } from "react";
import "./index.scss";
import { useNavigate } from 'react-router-dom';
import { useStores } from '@/store';
import { observer } from 'mobx-react';

const VideoManagement: FC<{}> = () => {
  let store = useStores();
  const { userStore } = store;
  const { login } = userStore;
  const navigate = useNavigate()
  return (
    <div className="video_anagement">
      视频管理
    </div>
  );
};

export default observer(VideoManagement);
