import React from 'react';
import { Form, Button, Checkbox, Card, Input, Tooltip, Space, Radio } from 'antd';
import { UserOutlined, LockOutlined,InfoCircleOutlined, EyeTwoTone, EyeInvisibleOutlined  } from '@ant-design/icons';
import './loginpage.css'

const LoginPage = () => {
       
const [passwordVisible, setPasswordVisible] = React.useState(false);

return (
  <Card title="Welcome To Website" className="login-card">
    <Form
      name="login_form"
      className="login-form"
      initialValues={{ remember: true }}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input
            placeholder="Enter your username"
            prefix={<UserOutlined className="site-form-item-icon" />}
            suffix={
              <Tooltip title="Extra information">
                <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }}/>
              </Tooltip>
            }
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Input password"
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Đăng nhập
          </Button>
        </Form.Item>

        <Form.Item>
          <div className='footer_card'>
          <a href="/forgot-password" sty>Quên mật khẩu?</a>
            <a type="link" href="/register">
              Đăng ký tài khoản mới
            </a>
          </div>
          <Space>
            
          </Space>
        </Form.Item>
      </Space>
    </Form>
  </Card>
);
};

export default LoginPage;
