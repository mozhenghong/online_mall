import React, { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { deleteOrder, cancelOrder, getOrderList, OrderItem, VideoItem } from '@/api/order';
import { Button, Form, Input, message, Popconfirm, Table } from 'antd';
import { BasePage } from '@/api/interface';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

import './index.scss';

const initPageInfo = { pageNum: 1, pageSize: 10 };

const OrderManagement: FC = () => {
    const [searchInfo, setSearchInfo] = useState({});
    const [pageInfo, setPageInfo] = useState<BasePage>(initPageInfo);
    const [orderList, setOrderList] = useState<OrderItem[]>([]);
    const [total, setTotal] = useState<number>(0);
    const searchForm = Form.useForm()[0];
    const navigate = useNavigate();

    const onDeleteOrder = async (id: number) => {
        await deleteOrder(id);
        message.success('删除成功');
    };

    const onCancelOrder = async (id: number) => {
        await cancelOrder(id);
        message.success('取消订单成功');
    };

    const columns = [
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: '教师',
            dataIndex: 'teacherName',
            key: 'teacherName'
        },
        {
            title: '教师描述',
            dataIndex: 'teacherDescription',
            key: 'teacherDescription'
        },
        {
            title: '价格',
            dataIndex: 'price',
            key: 'price'
        },
        {
            title: '视频',
            dataIndex: 'videoList',
            key: 'videoList',
            render: (text: VideoItem[]) => <span>{
                text.map((item: VideoItem) => item.name).join('、')
            }</span>,
        },
        {
            title: '创建时间',
            dataIndex: 'createdOn',
            key: 'createdOn',
            render: (time: string) => dayjs(time).format('YYYY-MM-DD hh:mm:ss')
        },
        {
            title: '操作',
            key: 'operation',
            fixed: 'left' as const,
            width: 240,
            render: (_: void, record: OrderItem) => <div className="order-management-action">
                <Popconfirm
                    title="确定删除订单？"
                    onConfirm={onDeleteOrder.bind(null, record.id)}
                    okText="确定"
                    cancelText="取消"
                >
                    <div className="order-management-action-item">删除</div>
                </Popconfirm>
                <Popconfirm
                    title="确定取消订单？"
                    onConfirm={onCancelOrder.bind(null, record.id)}
                    okText="确定"
                    cancelText="取消"
                >
                    <div className="order-management-action-item">取消订单</div>
                </Popconfirm>
                <div className="order-management-action-item"
                    onClick={() => navigate(`orderDetail?id=${record.id}`)}>详情
                </div>
            </div>
        }
    ];

    const fetchOrderList = async () => {
        const { data, total: isolateTotal } = await getOrderList({ ...searchInfo, ...pageInfo });
        setOrderList(data);
        setTotal(isolateTotal);
    };

    useEffect(() => {
        void fetchOrderList();
    }, [pageInfo, searchInfo]);

    const onFinish = () => setSearchInfo(searchForm.getFieldsValue());

    const onReset = () => {
        searchForm.resetFields();
        setSearchInfo({});
    };

    const onPaginationChange = (pageNum: number, pageSize: number) => {
        setPageInfo({ pageNum, pageSize });
    };

    return (
        <div className="order-management">
            <div className="order-management-header">
                <Form
                    layout="inline"
                    form={searchForm}
                    onFinish={onFinish}
                >
                    <Form.Item label="名称" name="name"><Input /></Form.Item>
                    <Form.Item>
                        <Button type="primary" onClick={onReset}>重置</Button>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">搜索</Button>
                    </Form.Item>
                </Form>
            </div>
            <div className="order-management-main">
                <Table dataSource={orderList} columns={columns} rowKey="id" pagination={{
                    total,
                    showSizeChanger: true,
                    current: pageInfo.pageNum,
                    pageSize: pageInfo.pageSize,
                    showTotal: total => `共${total}项`,
                    onShowSizeChange: onPaginationChange,
                    onChange: onPaginationChange
                }} />
            </div>
        </div>
    );
};

export default observer(OrderManagement);
