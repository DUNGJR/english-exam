import React, { useState } from 'react';
import { Form, Button, Checkbox, Card, Input, Tooltip, Space, Radio } from 'antd';
import { UserOutlined, LockOutlined,InfoCircleOutlined, EyeTwoTone, EyeInvisibleOutlined,  GoogleOutlined, FacebookOutlined, TwitterOutlined } from '@ant-design/icons';
import './Res.css'


const RegisterForm = () => {
       
const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')

// async function register(event) {
//   event.preventDefault()
//   const response = await fetch('http://localhost:3001/register', {
//     method:'POST',
//     headers:{
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       name,
//       email,
//       password,
//     }),
//   })
//   if (response.status === 200){
//     alert('register Succes')
//   } else {
//     alert('register Fail')
//   }
// }

async function registerUser(event) {
  event.preventDefault();

  const response = await fetch('http://localhost:3001/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });

  const data = await response.json();

  if (data.status === 'ok') {
    // Đăng ký thành công
    alert('Đăng ký thành công!');
  } else {
    // Đăng ký không thành công
    alert(`Đăng ký thất bại: ${data.error}`);
    console.error(data.error);
  }
}


return (
  <Card title="Welcome To Website" className="login-card">
    <form
      onSubmit={registerUser}
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
            value={name}
            onChange={(e)=> setName(e.target.value)}
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
          name="email"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            placeholder="Enter your email"
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
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            prefix={<LockOutlined />}
            placeholder="Enter Your Password "
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>

        {/* <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please enter your password!' }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Enter Your Password Again"
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item> */}

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
    </form>
  </Card>
);
};

export default RegisterForm;
