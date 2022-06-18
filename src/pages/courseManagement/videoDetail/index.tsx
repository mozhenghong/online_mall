import React, { FC, useState, useEffect } from "react";
import "./index.scss";
import { observer } from 'mobx-react';
import { getVideoById } from '@/api/video';
import { useSearchParams } from 'react-router-dom';
import { VideoItem } from '@/api/order';

const initDetail = {
  id: 0,
  name: '',
  description: '',
  createdOn: '',
  url: ''
}

const VideoDetail: FC<{}> = () => {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("videoId");
  const courseId = searchParams.get("courseId");
  const [detail, setDetail] = useState<VideoItem>(initDetail);

  const getVideoDetail = () => {
    getVideoById(Number(courseId), Number(videoId)).then((res) => {
      setDetail(res.data);
    })
  }

  useEffect(() => {
    getVideoDetail();
  }, [])

  return (
    <div className="course-management-detail-video">
      <div className="course-management-detail-video-body">
        <div className="course-management-detail-video-title">
          {detail.name}
        </div>
        {detail.url ? (
          <video controls className="course-management-detail-video-content">
            <source src={detail.url} />
            Sorry, your browser does not support embedded videos.
          </video>)
          : null}
      </div>
    </div>
  );
};

export default observer(VideoDetail);
