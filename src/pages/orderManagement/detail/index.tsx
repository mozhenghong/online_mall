import React, { useEffect, useRef, useState } from 'react';;
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Descriptions } from 'antd';
import { getOrderById, OrderItem, CourseItem } from '@/api/order';
import { status } from '../index';
import dayjs from 'dayjs';
import './index.scss';

const initDetail = {
    id: 0,
    price: '',
    createdOn: '',
    status: '',
    course: {
        id: 0,
        name: '',
        teacherName: '',
        teacherDescription: '',
        createdOn: '',
        price: ''
    }
}

const OrderDetail = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const [detail, setDetail] = useState<OrderItem>(initDetail);

    const getOrder = async (id: number) => {
        const { data } = await getOrderById(id);
        setDetail(data)
    };

    useEffect(() => {
        void getOrder(Number(id));
    }, []);

    return <div className="order-detail">
        <Descriptions title={detail.course.name} bordered>
            <Descriptions.Item label="教师">{detail.course.teacherName}</Descriptions.Item>
            <Descriptions.Item label="教师简介">{detail.course.teacherDescription}</Descriptions.Item>
            <Descriptions.Item label="价格">{Number(detail.price) / 100}元</Descriptions.Item>
            <Descriptions.Item label="订单状态">{status[detail.status]}</Descriptions.Item>
            <Descriptions.Item label="下单时间">{dayjs(detail.createdOn).format('YYYY-MM-DD HH:MM:ss')}</Descriptions.Item>
        </Descriptions>
    </div>;
};

export default OrderDetail
