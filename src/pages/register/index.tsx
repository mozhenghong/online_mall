import React, { useState } from 'react';
import { useStores } from '@/store';
import { observer } from 'mobx-react';
import './index.scss';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const navigate = useNavigate()
  let store = useStores();
  const { userStore } = store;
  const { register } = userStore;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true)
    register(values).then((res) => {
      if (res) {
        message.success('注册成功！')
        navigate('/login');
      }
      setLoading(false)
    }).catch(() => {
      setLoading(false)
    })
  };

  return (
    <div className="register_wrap">
      <div className="form_wrap">
        <Form
          form={form}
          name="normal_register"
          className="register_form"
          onFinish={onFinish}
          layout="vertical"
          requiredMark={false}
        >
          <div className="register_title">注册</div>
          <Form.Item
            name="username"
            label="账号"
            rules={[{ required: true, message: '请输入账号' }, { min: 6, message: '请输入至少6个字符' }]}
          >
            <Input placeholder="请输入账号" />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码!' }, { min: 6, message: '请输入至少6个字符' }]}
          >
            <Input.Password placeholder="请输入密码" />
          </Form.Item>
          <Form.Item
            label="密码确认"
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              {
                required: true,
                message: '请确认密码!',
              },
              { min: 6, message: '请输入至少6个字符' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次密码输入不一致!'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="请确认密码" />
          </Form.Item>
          <Form.Item style={{ marginBottom: 0 }}>
            <Form.Item
              style={{ display: 'inline-block', width: 'calc(50% - 16px)' }}
            >
              <Button
                style={{ width: '100%' }}
                onClick={() => {
                  navigate('/login')
                }}
              >
                取消
              </Button>
            </Form.Item>
            <Form.Item
              style={{
                display: 'inline-block',
                width: 'calc(50% - 16px)',
                marginLeft: '32px',
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: '100%' }}
                loading={loading}
              >
                注册
              </Button>
            </Form.Item>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default observer(Register);

