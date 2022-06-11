import React, { FC, useState, useEffect } from "react";
import { Button, Popconfirm, message, Modal, Spin } from "antd";
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
    const id = searchParams.get("id");
    const [detail, setDetail] = useState<VideoItem>(initDetail);

    const getVideoDetail = () => {
        getVideoById(Number(id)).then((res) => {
            setDetail(res.data)
        })
    }

    useEffect(() => {
        getVideoDetail()
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
