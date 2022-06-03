import React, { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { deleteVideoById, getVideoList, VideoItem } from '@/api/video';
import { Button, Form, Input, message, Popconfirm, Table } from 'antd';
import { BasePage } from '@/api/interface';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

import './index.scss';

const initPageInfo = { pageNum: 1, pageSize: 3 };

const VideoManagement: FC = () => {
    const [ searchInfo, setSearchInfo ] = useState({});
    const [ pageInfo, setPageInfo ] = useState<BasePage>(initPageInfo);
    const [ videoList, setVideoList ] = useState<VideoItem[]>([]);
    const [ total, setTotal ] = useState<number>(0);
    const searchForm = Form.useForm()[0];
    const navigate = useNavigate();

    const onDeleteVideo = async (videoId: number) => {
        await deleteVideoById(videoId);
        message.success('删除成功');
    };

    const columns = [
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: '描述',
            dataIndex: 'description',
            key: 'description'
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
            render: (_: void, record: VideoItem) => <div className="video-management-action">
                <Popconfirm
                    title="确定删除？"
                    onConfirm={onDeleteVideo.bind(null, record.id)}
                    okText="删除"
                    cancelText="取消"
                >
                    <div className="video-management-action-item">删除</div>
                </Popconfirm>
                <div className="video-management-action-item"
                     onClick={() => navigate(`videoDetail?id=${record.id}`)}>编辑
                </div>
            </div>
        }
    ];

    const fetchVideoList = async () => {
        const { data, total: isolateTotal } = await getVideoList({ ...searchInfo, ...pageInfo });
        setVideoList(data);
        setTotal(isolateTotal);
    };

    useEffect(() => {
        void fetchVideoList();
    }, [ pageInfo, searchInfo ]);

    const onFinish = () => setSearchInfo(searchForm.getFieldsValue());

    const onReset = () => {
        searchForm.resetFields();
        setSearchInfo({});
    };

    const onPaginationChange = (pageNum: number, pageSize: number) => {
        setPageInfo({ pageNum, pageSize });
    };

    return (
        <div className="video-management">
            <div className="video-management-header">
                <Form
                    layout="inline"
                    form={searchForm}
                    onFinish={onFinish}
                >
                    <Form.Item label="名称" name="name"><Input/></Form.Item>
                    <Form.Item>
                        <Button type="primary" onClick={onReset}>重置</Button>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">搜索</Button>
                    </Form.Item>
                </Form>
                <div className="video-management-header-action">
                    <Button type="primary"
                            onClick={() => navigate('videoDetail')}>增加</Button>
                </div>
            </div>
            <div className="video-management-main">
                <Table dataSource={videoList} columns={columns} rowKey="id" pagination={{
                    total,
                    showSizeChanger: true,
                    current: pageInfo.pageNum,
                    pageSize: pageInfo.pageSize,
                    showTotal: total => `共${total}项`,
                    onShowSizeChange: onPaginationChange,
                    onChange: onPaginationChange
                }}/>
            </div>
        </div>
    );
};

export default observer(VideoManagement);
