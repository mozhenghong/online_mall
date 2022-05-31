import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, Input, message, Upload } from 'antd';
import { UploadRequestOption } from 'rc-upload/lib/interface';
import { InboxOutlined } from '@ant-design/icons';
import { createVideo, getVideoById, updateVideo, uploadVideo } from '@/api/video';
import { useNavigate } from 'react-router-dom';

import './index.scss';

const { Dragger } = Upload;
const supportFileType = [ 'video/mp4' ];

export const VideoDetail = () => {
    const navigate = useNavigate();
    const [ videoUrl, setVideoUrl ] = useState<string>('');
    const [ form ] = Form.useForm();
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => videoRef.current?.load(), [ videoUrl ]);

    const getVideo = async (videoId: number) => {
        const { data } = await getVideoById(videoId);
        form.setFieldsValue({ name: data.name, description: data.description });
        setVideoUrl(data.url);
    };

    useEffect(() => {
        if (location.search) {
            // 编辑
            const videoId = new URLSearchParams(location.search.slice(1)).get('id');
            void getVideo(Number(videoId));
        }
    }, []);

    const normFile = (e: { fileList: FileList }) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const onUpload = async (options: UploadRequestOption) => {
        if (~supportFileType.indexOf((options.file as File).type)) {
            const formData = new FormData();
            formData.append('file', options.file);

            try {
                const res = await uploadVideo(formData);
                setVideoUrl(res.data);
                form.setFieldsValue({ fileList: [ options.file ] });
                message.success('上传成功');
                options.onSuccess && options.onSuccess(options.file);
            } catch (e) {
                options.onError && options.onError({ status: 1, message: '上传失败', name: '' }, {});
            }
        }
    };

    const goBack = () => {
        navigate('/videoManagement');
    };

    const onFinish = async () => {
        const { name, description = '' } = form.getFieldsValue();
        if (location.search) {
            await updateVideo(Number(new URLSearchParams(location.search.slice(1)).get('id')), {
                name,
                description,
                url: videoUrl
            });
            message.success('更新成功');
        } else {
            await createVideo({ name, description, url: videoUrl });
            message.success('创建成功');
        }
        goBack();
    };

    return <div className="video-detail">
        <Form form={form} onFinish={onFinish}>
            <Form.Item label="视频地址" labelCol={{ span: 2 }} name="fileList"
                       rules={[ { required: true, message: '请选择文件' } ]}
                       valuePropName="fileList"
                       getValueFromEvent={normFile}>
                <Dragger customRequest={onUpload} maxCount={1} showUploadList={false}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined/>
                    </p>
                    <p className="ant-upload-text">点击或拖拽文件上传</p>
                </Dragger>
                {videoUrl ? (
                        <video controls className="video-detail-preview" ref={videoRef}>
                            <source src={videoUrl}/>
                            Sorry, your browser does not support embedded videos.
                        </video>)
                    : null}
            </Form.Item>
            <Form.Item label="名称" labelCol={{ span: 2 }} name="name" rules={[ { required: true, message: '请填写名称' } ]}>
                <Input/>
            </Form.Item>
            <Form.Item label="描述" labelCol={{ span: 2 }} name="description">
                <Input/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" onClick={goBack}>返回</Button>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">保存</Button>
            </Form.Item>
        </Form>
    </div>;
};
