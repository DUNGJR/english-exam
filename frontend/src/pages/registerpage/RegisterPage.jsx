import React from 'react';
import { Form, Button, Checkbox, Card, Input, Tooltip, Space, Radio } from 'antd';
import { UserOutlined, LockOutlined,InfoCircleOutlined, EyeTwoTone, EyeInvisibleOutlined,  GoogleOutlined, FacebookOutlined, TwitterOutlined } from '@ant-design/icons';
import './Res.css'


const RegisterForm = () => {
       
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
          rules={[{ required: true, message: 'Please enter your password!' }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Enter Your Password "
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please enter your password!' }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Enter Your Password Again"
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Đăng Ký
          </Button>
        </Form.Item>

      </Space>

      <Space align="center" style={{ justifyContent: 'center', width: '100%', paddingTop: '20px' }}>
          <Button icon={<GoogleOutlined />} shape="circle" />
          <Button icon={<FacebookOutlined />} shape="circle" />
          <Button icon={<TwitterOutlined />} shape="circle" />
        </Space>
    </Form>
  </Card>
);
};

export default RegisterForm;
