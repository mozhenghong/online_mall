import React, { useState, useEffect } from 'react';
import { Modal, Form, Select, Button, message, Input, InputNumber } from 'antd';
import { useStores } from '@/store';
import { observer } from 'mobx-react';
import { updateCourse } from '@/api/course';
import { VideoItem } from '@/api/video';
import { getVideoList } from '@/api/video';

const { Option } = Select;
const { TextArea } = Input;

interface IProps {
  visible: boolean;
  isEdit: boolean;
  currentId: number;
  onSuccess: (isSuccess: number) => void;
  onChangeVisible: (visible: boolean) => void;
}

const AddCourse: React.FC<IProps> = (props) => {
  const [form] = Form.useForm();
  const store = useStores();
  const { courseStore } = store;
  const { getCourseDetail, addCourse } = courseStore;
  const { visible, isEdit, currentId, onSuccess, onChangeVisible } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [videoList, setVideoList] = useState<VideoItem[]>([]);

  const fetchVideoList = async () => {
    const { data } = await getVideoList();
    setVideoList(data);
  };

  useEffect(() => {
    if (visible) {
      fetchVideoList()
    }
  }, [visible])

  useEffect(() => {
    if (visible && isEdit) {
      getCourseDetail(currentId).then((res) => {
        const videoIdList = res.videoList.map((item: VideoItem) => item.id)
        form.setFieldsValue({ ...res, videoIdList, price: res.price / 100 })
      })
    }
  }, [visible]);

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  }

  const handleAdd = (values: any) => {
    setConfirmLoading(true)
    addCourse({ ...values, price: values.price * 100 }).then((res) => {
      if (res) {
        message.success('新建成功');
        form.resetFields();
        onSuccess(Math.random());
        onChangeVisible(false);
      }
      setConfirmLoading(false)
    }).catch(() => {
      setConfirmLoading(false)
    })
  }

  const handleUpdate = (values: any) => {
    setConfirmLoading(true)
    updateCourse(currentId, { ...values, price: values.price * 100 }).then((res) => {
      if (res) {
        message.success('更新成功');
        form.resetFields();
        onSuccess(Math.random());
        onChangeVisible(false);
      }
      setConfirmLoading(false)
    }).catch(() => {
      setConfirmLoading(false)
    })
  }

  const onFinish = (values: any) => {
    if (isEdit) {
      handleUpdate(values)
    } else {
      handleAdd(values)
    }
  };

  const handleCancel = () => {
    onChangeVisible(false);
    form.resetFields()
  };

  return (
    <Modal
      title={isEdit ? '更新课程' : '新建课程'}
      visible={visible}
      onCancel={handleCancel}
      footer={null}
      maskClosable={false}
      width={700}
    >
      <Form
        name="addCourse"
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="课程名称"
          name="name"
          rules={[{ required: true, message: '请输入课程名称!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="课程简介"
          name="description"
          rules={[{ required: true, message: '请输入课程简介!' }]}
        >
          <TextArea autoSize />
        </Form.Item>
        <Form.Item
          label="教师姓名"
          name="teacherName"
          rules={[{ required: true, message: '请输入老师姓名!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="教师简介"
          name="teacherDescription"
          rules={[{ required: true, message: '请输入教师简介!' }]}
        >
          <TextArea autoSize />
        </Form.Item>
        <Form.Item
          label="价格"
          name="price"
          rules={[{ required: true, message: '请输入价格!' }]}
        >
          <InputNumber style={{ width: '100%' }} addonAfter="元" />
        </Form.Item>
        <Form.Item
          label="视频"
          name="videoIdList"
          rules={[{ required: true, message: '请选择视频!' }]}
        >
          <Select
            mode="multiple"
            placeholder="请选择视频"
          >
            {videoList.map((item: any) => <Option key={item.id} value={item.id}>{item.name}</Option>)}
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button style={{ marginRight: 16 }} onClick={handleCancel}>
            取消
          </Button>
          <Button type="primary" htmlType="submit" loading={confirmLoading}>
            确定
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default observer(AddCourse);