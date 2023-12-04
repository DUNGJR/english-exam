import React from 'react';
import { Form, Button, Checkbox, Card, Input, Tooltip, Space, Radio } from 'antd';
import { UserOutlined, LockOutlined,InfoCircleOutlined, EyeTwoTone, EyeInvisibleOutlined  } from '@ant-design/icons';
import './loginpage.css'
import  { useState } from 'react';
import { useNavigate  } from 'react-router-dom'

const LoginPage = () => {
       
const [passwordVisible, setPasswordVisible] = React.useState(false);

const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [redirect, setRedirect] = useState('')
const navigate = useNavigate();

async function login(event) {
  event.preventDefault();

    const response = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json',},
      body: JSON.stringify({email,password,}),
      // credentials:'include'
    });

    const data = await response.json()
    if(data.user){
      localStorage.setItem('token', data.user);
      alert('login succes')
      setRedirect(true);
    } else {
      alert("Login failed")
      console.log(data.user)
    }
  }
  

if (redirect){
  window.location.href = '/';
}



return (
  <Card title="Welcome To Website" className="login-card">
    <form
      name="login_form" onSubmit={login}
      className="login-form"
      initialValues={{ remember: true }}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
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
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
          value={password}
          onChange={(e)=> setPassword(e.target.value)}
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
    </form>
  </Card>
);
};

export default LoginPage;
