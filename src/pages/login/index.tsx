import React, { useState, useEffect } from 'react';
import { useStores } from '@/store';
import { observer } from 'mobx-react';
import './index.scss';
import { Form, Input, Button } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';

const Login: React.FC = () => {
    const navigate = useNavigate();
    let store = useStores();
    const { userStore } = store;
    const { login } = userStore;
    const [ form ] = Form.useForm();
    const [ loading, setLoading ] = useState(false);

    const onFinish = async (values: any) => {
        setLoading(true);
        login(values).then((res) => {
            if (res) {
                navigate('/UserManagement');
            }
            setLoading(false);
        }).catch(() => {
            setLoading(false);
        });
    };

    return (
        <div className="login_wrap">
            <div className="form_wrap">
                <Form
                    form={form}
                    name="normal_login"
                    className="login_form"
                    onFinish={onFinish}
                    layout="vertical"
                    requiredMark={false}
                >
                    <div className="login_title">欢迎使用系统</div>
                    <Form.Item
                        name="username"
                        label="登录账号"
                        rules={[ { required: true, message: '请输入登录账号' } ]}
                    >
                        <Input placeholder="请输入登录账号"/>
                    </Form.Item>
                    <Form.Item
                        label="登录密码"
                        name="password"
                        rules={[ { required: true, message: '请输入密码' } ]}
                    >
                        <Input type="password" placeholder="请输入密码"/>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login_button"
                            loading={loading}
                        >
                            登录
                        </Button>
                    </Form.Item>
                    <div className="register">
                        <span className="notes">没有账号？</span>
                        <span
                            className="go_register"
                            onClick={() => {
                                navigate('/register');
                            }}
                            style={{ cursor: 'pointer' }}
                        >
              立即注册
            </span>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default observer(Login);

