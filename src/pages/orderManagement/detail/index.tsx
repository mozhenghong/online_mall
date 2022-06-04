import React, { useEffect, useRef, useState } from 'react';;
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Descriptions } from 'antd';
import { getOrderById, OrderItem, VideoItem } from '@/api/order';
import './index.scss';
const initDetail = {
    id: 0,
    name: '',
    teacherName: '',
    teacherDescription: '',
    price: '',
    videos: []
}

const OrderDetail = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const [detail, setDetail] = useState<OrderItem>(initDetail);

    const getVideo = async (id: number) => {
        const { data } = await getOrderById(id);
        setDetail(data)
    };

    useEffect(() => {
        void getVideo(Number(id));
    }, []);

    return <div className="order-detail">
        <Descriptions title={detail.name} layout="vertical">
            <Descriptions.Item label="教师">{detail.teacherName}</Descriptions.Item>
            <Descriptions.Item label="教师简介">{detail.teacherDescription}</Descriptions.Item>
            <Descriptions.Item label="价格">{detail.price}元</Descriptions.Item>
        </Descriptions>
        <div className='order-detail-video'>
            {detail.videos.length && detail.videos.map((item: VideoItem) => <div className='order-detail-video-item'>
                <div className='order-detail-video-item-title'>
                    {item.name}
                </div>
                <div className='order-detail-video-item-description'>
                    {item.description}
                </div>
                {item.url ? (
                    <video controls className="video-detail-preview" ref={item.url}>
                        <source src={item.url} />
                        Sorry, your browser does not support embedded videos.
                    </video>)
                    : null}
            </div>)}
        </div>
    </div>;
};

export default OrderDetail
