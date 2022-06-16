import React, { useState, useEffect } from 'react';
import { Modal, Form, Select, Button, message } from 'antd';
import { useStores } from '@/store';
import { observer } from 'mobx-react';
import { getRole } from '@/api/user';

const { Option } = Select;

interface IProps {
  visible: boolean;
  currentId: number;
  onSuccess: (successFlag: number) => void;
  onChangeVisible: (visible: boolean) => void;
}

const UpdateUser: React.FC<IProps> = (props) => {
  const [form] = Form.useForm();
  const store = useStores();
  const { userStore } = store;
  const { getUserDetail, updateUser } = userStore;
  const { visible, currentId, onSuccess, onChangeVisible } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [roles, setRoles] = useState([]);

  const getRoleList = async () => {
    const { data } = await getRole();
    setRoles(data);
  };

  useEffect(() => {
    if (visible) {
      getUserDetail(currentId).then((res) => {
        form.setFieldsValue({ role: res.rolesId })
      })
      getRoleList();
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
      title="更新用户角色"
      visible={visible}
      onCancel={handleCancel}
      footer={null}
      maskClosable={false}
    >
      <Form
        name="updateUser"
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
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
            {roles.map((item: any) => <Option key={item.id} value={item.id}>{item.name}</Option>)}
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

export default observer(UpdateUser);