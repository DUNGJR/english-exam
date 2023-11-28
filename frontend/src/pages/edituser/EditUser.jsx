import React, { useState } from 'react';
import { Layout, Card, Typography, Form, Input, DatePicker, Radio, Button, Calendar, Upload, message, Col, Divider, Row } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import './EditUser.css'
import '../user/UserInfo.css'

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;
const { Item } = Form;
const { TextArea } = Input;
const { RangePicker } = DatePicker;


function EditUserProfile() {
  const [avatar, setAvatar] = useState(null);


  const [userData, setUserData] = useState({
    name: 'Elon Musk',
    age: '',
    dob: null,
    gender: '',
    bio: '',
  });



  const handleInputChange = (fieldName, value) => {
    setUserData({
      ...userData,
      [fieldName]: value,
    });
  };

  const handleSubmit = () => {
    // Handle form submission here
    console.log('User Data:', userData);
  };

  return (
    <Layout>
      <Content className="card-container">
        <Card>
          <Title level={3}>Hello, {userData.name} !</Title>
          <Paragraph>
            This is your user profile page. You can customize it as needed.
          </Paragraph>
          <Form onFinish={handleSubmit}>
            <Item label="Avatar" name="avatar">
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={(file) => {
                  // Kiểm tra và giới hạn loại file hình ảnh
                  const isImage = file.type.startsWith('image/');
                  if (!isImage) {
                    message.error('You can only upload image files!');
                  }
                  const isLt2M = file.size / 1024 / 1024 < 2; // Giới hạn kích thước file dưới 2MB
                  if (!isLt2M) {
                    message.error('Image must be smaller than 2MB!');
                  }
                  if (isImage && isLt2M) {
                    setAvatar(file);
                  }
                  return false;
                }}
              >
                {avatar ? (
                  <img src={URL.createObjectURL(avatar)} alt="Avatar" style={{ width: '100%', height: '100%' }} />
                ) : (
                  <div>
                    <UploadOutlined />
                    <div className="ant-upload-text">Upload</div>
                  </div>
                )}
              </Upload>
            </Item>

            <Row>

              <Col className="gutter-row" span={24}>
                <Item label="Name" name="name" rules={[{ required: true, message: 'Please enter your name' }]}>
                  <Input value={userData.name} style={{ width: 150, }} onChange={(e) => handleInputChange('name', e.target.value)} />
                </Item>
              </Col>

              <Col className="gutter-row" span={24}>
                <Item label="Age" name="age" rules={[{ required: true, message: 'Please enter your age' }]}>
                  <Input type="number" style={{ width: 150, }} value={userData.age} onChange={(e) => handleInputChange('age', e.target.value)} />
                </Item>
              </Col>
            </Row>
            <Item label="Date of Birth" name="dob">
              <DatePicker value={userData.dob} onChange={(dates) => handleInputChange('dob', dates)} />
            </Item>

            <Item label="Gender" name="gender">
              <Radio.Group value={userData.gender} onChange={(e) => handleInputChange('gender', e.target.value)}>
                <Radio value="male">Male</Radio>
                <Radio value="female">Female</Radio>
                <Radio value="other">Other</Radio>
              </Radio.Group>
            </Item>

            <Item label="Bio" name="bio">
              <TextArea
                value={userData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                autoSize={{ minRows: 3, maxRows: 6 }}
              />
            </Item>
            <Item>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Item>
          </Form>
        </Card>
      </Content>
    </Layout>
  );
}

export default EditUserProfile;
