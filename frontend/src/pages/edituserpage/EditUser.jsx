import React, { useState } from 'react';
import { Form, Input, Button, Radio, DatePicker, message } from 'antd';
import moment from 'moment'; 
import './EditUser.css';
import { useNavigate } from 'react-router-dom';

const EditUserProfile = () => {

  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [userData, setUserData] = useState({
    email: '',
    name: '',
    dob: null,
    gender: '',
    bio: '',
    age: ''
  });

  const onFinish = async (values) => {
    // Chuyển đổi "Date of Birth" sang định dạng phù hợp
    const dob = values.dob ? values.dob.format('YYYY-MM-DD') : null;

    // Tính toán "Age" dựa trên "Date of Birth"
    const age = dob ? moment().diff(dob, 'years') : null;

    try {
      // Gửi yêu cầu cập nhật người dùng
      const response = await fetch('http://localhost:3001/edituser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...values, dob, age }), // Thêm "dob" và "age" vào values
      });

      if (response.ok) {
        // Xử lý khi cập nhật thành công
        message.success('User updated successfully');
        navigate('/user')
      } else {
        // Xử lý khi có lỗi từ server
        message.error('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      // Hiển thị thông báo khi có lỗi không mong muốn
      message.error('Unexpected error occurred');
    }
  };

  const onChange = (e) => {
    console.log(`radio checked: ${e.target.value}`);
    setUserData({ ...userData, gender: e.target.value });
  };

  return (
    <div>
      <h3>Hello, {userData.name}!</h3>
      <p>This is your user profile page. You can customize it as needed.</p>
      <Form
        form={form}
        onFinish={onFinish}
        initialValues={userData}
        className="edit-user-form"
      >
        <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter your name' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Date of Birth" name="dob">
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="Gender" name="gender" rules={[{ required: true, message: 'Please select your gender' }]}>
          <Radio.Group onChange={onChange}>
            <Radio value="male">Male</Radio>
            <Radio value="female">Female</Radio>
            <Radio value="other">Other</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Bio" name="bio">
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>        
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditUserProfile;
