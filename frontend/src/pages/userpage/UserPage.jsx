import React, { useState, useEffect } from 'react';
import { Layout, Card, Typography, Avatar, Button, Tabs } from 'antd';
import './userpage.css';

const { Content } = Layout;
const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;

function UserProfileView() {
  const [userData, setUserData] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch('http://localhost:3001/users', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setUserData(data))
      .catch((error) => console.error(error));
  }, [token]);

  if (!userData) {
    return <p>Loading...</p>;
  }

  const firstLetter = userData.name ? userData.name.charAt(0).toUpperCase() : '';
  const dateOfBirth = userData.dob ? new Date(userData.dob) : null;
  const formattedDateOfBirth = dateOfBirth ? `${dateOfBirth.getDate()}/${dateOfBirth.getMonth() + 1}/${dateOfBirth.getFullYear()}` : '';

  return (
    <div>
      <Layout>
        <Content className="card-container" style={{ width: 800, marginBottom: '20px'}}>
          <Card style={{ boxShadow: '5px 5px 5px #ccc' }}>
            {userData.avata ? (
              <Avatar
                className="avatar"
                size={128}
                src={userData.avata}
              />
            ) : (
              <Avatar
                className="avatar"
                size={128}
                style={{ backgroundColor: 'blue' }}
              >
                {firstLetter}
              </Avatar>
            )}
            <div className="profile-info">
              <Title level={3}>Tài khoản: {userData.name}</Title>
              <Paragraph className="paragraph">Tuổi: {userData.age}</Paragraph>
              <Paragraph className="paragraph">Sinh nhật: {formattedDateOfBirth}</Paragraph>
              <Paragraph className="paragraph">Giới tính: {userData.gender}</Paragraph>
              <Paragraph className="paragraph">Giới thiệu: {userData.bio}</Paragraph>
              <div className="editBtn">
                <Button href="/edituser" type="primary">
                    Cập Nhật Thông Tin
                </Button>
              </div>
            </div>
          </Card>
        </Content>
      </Layout>
      <Tabs defaultActiveKey="1" style={{ margin: '20px',width: 1600 }}>
            <TabPane tab="Khóa Học" key="1">
              Bạn Chưa Đăng Ký Khóa Học Nào
            </TabPane>
            <TabPane tab="Kết Quả Luyện Thi" key="2">
              Bạn Chưa Có Bài Kiểm Tra Nào
            </TabPane>
            <TabPane tab="Thảo Luận" key="3">
              
            </TabPane>
          </Tabs>
    </div>
  );
}

export default UserProfileView;
