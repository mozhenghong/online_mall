import React, { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { useStores } from '@/store';
import { deleteOrder, cancelOrder, getOrderList, OrderItem, CourseItem, placeOrderResult } from '@/api/order';
import { Button, Form, Input, message, Popconfirm, Table, Modal, Spin, } from 'antd';
import { BasePage } from '@/api/interface';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

import './index.scss';

const initPageInfo = { pageNum: 1, pageSize: 10 };

export const status: { [key: string]: string } = {
    'DELETED': '已删除',
    'UNPAID': '未支付',
    'CLOSED': '已关闭',
    'PAID': '已支付'
}

const OrderManagement: FC = () => {
    let store = useStores();
    const { orderStore } = store;
    const { placeOrder } = orderStore;
    const [searchInfo, setSearchInfo] = useState({});
    const [pageInfo, setPageInfo] = useState<BasePage>(initPageInfo);
    const [orderList, setOrderList] = useState<OrderItem[]>([]);
    const [total, setTotal] = useState<number>(0);
    const searchForm = Form.useForm()[0];
    const navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [orderId, setOrderId] = useState('');

    const onDeleteOrder = async (id: number) => {
        await deleteOrder(id);
        message.success('删除成功');
        fetchOrderList()
    };

    const onCancelOrder = async (id: number) => {
        await cancelOrder(id);
        message.success('取消订单成功');
        fetchOrderList()
    };

    const handlePlaceOrder = (record: OrderItem) => {
        placeOrder(record.course.id).then(({ data }: { data: placeOrderResult }) => {
            setIsModalVisible(true)
            setOrderId(`${data.id}`)
            let newWindow = window.open('about:blank')
            newWindow?.document.write(data.formComponentHtml)
            newWindow?.focus()
        })
    }
    const columns = [
        {
            title: '课程名称',
            dataIndex: 'course',
            key: 'name',
            render: (text: CourseItem) => <span>{text.name}</span>
        },
        {
            title: '教师',
            dataIndex: 'course',
            key: 'teacherName',
            render: (text: CourseItem) => <span>{text.teacherName}</span>
        },
        {
            title: '教师描述',
            dataIndex: 'course',
            key: 'teacherDescription',
            render: (text: CourseItem) => <span>{text.teacherDescription}</span>
        },
        {
            title: '价格',
            dataIndex: 'price',
            key: 'price',
            render: (text: string) => <span>{(Number(text) / 100).toFixed(2)}</span>
        },
        {
            title: '订单状态',
            dataIndex: 'status',
            key: 'status',
            render: (text: string) => <span>{status[text]}</span>
        },
        {
            title: '下单时间',
            dataIndex: 'createdOn',
            key: 'createdOn',
            render: (time: string) => dayjs(time).format('YYYY-MM-DD HH:MM:ss')
        },
        {
            title: '操作',
            key: 'operation',
            fixed: 'left' as const,
            width: 240,
            render: (_: void, record: OrderItem) => <div className="order-management-action">
                {(record.status !== 'DELETED' && record.status !== 'PAID') && <Popconfirm
                    title="确定删除订单？"
                    onConfirm={onDeleteOrder.bind(null, record.id)}
                    okText="确定"
                    cancelText="取消"
                >
                    <Button type="link">删除</Button>
                </Popconfirm>}
                {record.status === 'UNPAID' && <Popconfirm
                    title="确定取消订单？"
                    onConfirm={onCancelOrder.bind(null, record.id)}
                    okText="确定"
                    cancelText="取消"
                >
                    <Button type="link">取消订单</Button>
                </Popconfirm>}
                <Button type="link"
                    onClick={() => navigate(`detail?id=${record.id}`)}>详情
                </Button>
                {record.status !== 'PAID' && <Button type="link"
                    onClick={() => { handlePlaceOrder(record) }}>下单
                </Button>}

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
                    <Form.Item label="名称" name="name"><Input placeholder='输入名称查询' /></Form.Item>
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
            <Modal title="下单结果" visible={isModalVisible} okText="已支付" cancelText="支付失败" onOk={() => navigate(`orderManagement/detail?id=${orderId}`)} onCancel={() => setIsModalVisible(false)}>
                <Spin>
                    订单生成中...
                </Spin>
            </Modal>
        </div>
    );
};

export default observer(OrderManagement);
