import React, { useState, useEffect } from 'react';
import { Layout, Card, Typography, Avatar, Button, Tabs } from 'antd';
import './UserInfo.css';

const { Content } = Layout;
const { Title, Paragraph } = Typography;


function UserProfileView() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/user') // Thay thế '/api/get-user' bằng đường dẫn thực tế đến API của bạn
      .then((response) => response.json())
      .then((data) => setUserData(data))
      .catch((error) => console.error(error));
  }, []);

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <Layout>
      <Content className="card-container" style={{ width: 800 }}>
        <Card>
          <Avatar className="avatar" size={128} src={userData.avatarUrl} />
          <div className="profile-info">
            <Title level={3}>User : {userData.data[0].name}</Title>
            <Paragraph className="paragraph">email: {userData.data[0].email}</Paragraph>
            <Paragraph className="paragraph">Age: {userData.age}</Paragraph>
            <Paragraph className="paragraph">Date of Birth: {userData.dob}</Paragraph>
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
  );
}

export default UserProfileView;
