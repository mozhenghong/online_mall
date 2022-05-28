import React, { useState, useEffect } from 'react';
import { Modal, Form, Select, Button, message } from 'antd';
import { useStores } from '@/store';
import { observer } from 'mobx-react';

const { Option } = Select;

interface IProps {
  visible: boolean;
  currentId: number;
  onSuccess: (isSuccess: number) => void;
  onChangeVisible: (visible: boolean) => void;
}

const UpdateUser: React.FC<IProps> = (props) => {
  const [form] = Form.useForm();
  const store = useStores();
  const { userStore } = store;
  const { getUserDetail, updateUser } = userStore;
  const { visible, currentId, onSuccess, onChangeVisible } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);

  const roles = [
    { id: 1, name: 'student' },
    { id: 2, name: 'teacher' },
    { id: 3, name: 'admin' }
  ]

  useEffect(() => {
    if (visible) {
      getUserDetail(currentId).then((res) => {
        form.setFieldsValue({ role: res.rolesId })
      })
    }
  }, [visible]);

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  }

  const onFinish = (values: any) => {
    const { role } = values;
    let arr: any = []
    role.map((item: string) => {
      arr.push({ name: item })
    })
    setConfirmLoading(true)
    updateUser({ id: currentId, roles: arr }).then((res) => {
      if (res) {
        message.success('更新成功');
        onSuccess(Math.random());
        onChangeVisible(false);
      }
      setConfirmLoading(false)
    }).catch(() => {
      setConfirmLoading(false)
    })

  };

  const handleCancel = () => {
    onChangeVisible(false);
    form.resetFields()
  };

  return (
    <Modal
      title="Title"
      visible={visible}
      onCancel={handleCancel}
      footer={null}
      maskClosable={false}
    >
      <Form
        name="basic"
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="角色"
          name="role"
          rules={[{ required: true, message: '请选择角色!' }]}
        >
          <Select
            mode="multiple"
            placeholder="请选择角色"
          >
            {roles.map((item: any) => <Option key={item.id} value={item.name}>{item.name}</Option>)}
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
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

export default observer(UpdateUser);