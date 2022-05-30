import React, { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { getVideoList, uploadVideo } from '@/api/video';
import { Button, Form, Input, message, Modal, Popconfirm, Table, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { BasePage } from '@/api/interface';
import dayjs from 'dayjs';
import { UploadRequestOption } from 'rc-upload/lib/interface';
import './index.scss';

interface VideoItem {
    id: number;
    name: string;
    description: string;
    createdOn: string;
}

enum ModalType {
    ADD,
    EDIT
}

interface ModalInfo {
    type: ModalType,
    title: string,
    id?: number;
    name?: string;
    description?: string;
}

const initPageInfo = { pageNum: 1, pageSize: 3 };
const supportFileType = [ 'video/mp4' ];

const VideoManagement: FC = () => {
    const [ searchInfo, setSearchInfo ] = useState({});
    const [ pageInfo, setPageInfo ] = useState<BasePage>(initPageInfo);
    const [ videoList, setVideoList ] = useState<VideoItem[]>([]);
    const [ total, setTotal ] = useState<number>(0);
    const [ modalInfo, setModalInfo ] = useState<ModalInfo | null>(null);
    const [ videoUrl, setVideoUrl ] = useState<string>('');
    const searchForm = Form.useForm()[0];
    const modalForm = Form.useForm()[0];

    const onDeleteVideo = (video: VideoItem) => {
        console.log(video);
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
            fixed: 'right',
            width: 240,
            render: (_: void, record: VideoItem) => <div className="video-management-action">
                <Popconfirm
                    title="确定删除？"
                    onConfirm={onDeleteVideo.bind(null, record)}
                    okText="删除"
                    cancelText="取消"
                >
                    <div className="video-management-action-item">删除</div>
                </Popconfirm>
                <div className="video-management-action-item"
                     onClick={() => setModalInfo({ type: ModalType.EDIT, title: '编辑', ...record })}>编辑
                </div>
            </div>
        }
    ];

    const fetchVideoList = async () => {
        const { data, total: isolateTotal }: { data: VideoItem[] } = await getVideoList({ ...searchInfo, ...pageInfo });
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

    const handleOk = () => {
        modalForm.validateFields()
            .then(values => {
                modalForm.resetFields();
                console.log(values);
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    };

    const handleCancel = () => {
        modalForm && modalForm.resetFields();
    };

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const onUpload = async (options: UploadRequestOption) => {
        console.log(options);
        setTimeout(() => {
            options.onError && options.onError({ status: 1, message: '上传失败', name: '' }, {});
        }, 500);
        return;
        if (~supportFileType.indexOf(options.file.type)) {
            const formData = new FormData();
            formData.append('file', options.file);

            const res = await uploadVideo(formData);
            setVideoUrl(res.data);
            modalForm.setFieldsValue({ fileList: [ options.file ] });
            message.success('上传成功');
        }
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
                            onClick={() => setModalInfo({ type: ModalType.ADD, title: '新增视频' })}>增加</Button>
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

            <Modal title={modalInfo && modalInfo.title} visible={!!modalInfo} onOk={handleOk} onCancel={handleCancel}>
                <Form form={modalForm}>
                    <Form.Item label="名称" labelCol={{ span: 4 }} name="name"
                               rules={[ { required: true, message: '请填写名称' } ]}><Input/></Form.Item>
                    <Form.Item label="描述" labelCol={{ span: 4 }} name="description"><Input/></Form.Item>
                    <Form.Item label="视频地址" labelCol={{ span: 4 }} name="fileList"
                               rules={[ { required: true, message: '请选择文件' } ]}
                               valuePropName="fileList"
                               getValueFromEvent={normFile}>
                        <Upload customRequest={onUpload} maxCount={1}>
                            <Button icon={<UploadOutlined/>}>选择文件</Button>
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default observer(VideoManagement);
