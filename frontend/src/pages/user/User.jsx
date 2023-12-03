import React, { useState, useEffect } from 'react';
import { Layout, Card, Typography, Avatar, Button } from 'antd';
import './UserInfo.css';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

function UserProfileView() {
  const [userData, setUserData] = useState(null);
  const token = localStorage.getItem('token'); // Lấy token từ local storage

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

  // Render dữ liệu người dùng ở đây
  return (
    <div>
      <Layout>
        <Content className="card-container" style={{ width: 800 }}>
          <Card>
            <Avatar
              className="avatar"
              size={128}
              style={{ backgroundColor: 'blue' }} // Màu nền xanh
            >
              {firstLetter}
            </Avatar>
            <div className="profile-info">
              <Title level={3}>User: {userData.name}</Title>
              <Paragraph className="paragraph">Age: {userData.age}</Paragraph>
              <Paragraph className="paragraph">Date of Birth: {formattedDateOfBirth}</Paragraph>
              <Paragraph className="paragraph">Gender: {userData.gender}</Paragraph>
              <Paragraph className="paragraph">Bio: {userData.bio}</Paragraph>
              <div className="editBtn">
                <Button href="/edituser" type="primary">
                  Edit Profile
                </Button>
              </div>
            </div>
          </Card>
        </Content>
      </Layout>
    </div>
  );
}

export default UserProfileView;
