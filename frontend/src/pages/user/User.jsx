import React, { useState } from 'react';
import { Layout, Card, Typography, Avatar, Button, Tabs, Menu} from 'antd';
import './UserInfo.css'
import { UserOutlined, CalendarOutlined, InfoCircleOutlined, MehOutlined, NumberOutlined } from '@ant-design/icons';
const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;
const { SubMenu } = Menu; 



function UserProfileView() {

  
  const [courseInfo, setCourseInfo] = useState(['']);
  const [examResults, setExamResults] = useState('Bạn Chưa Thực Hiện Cuộc Thi Nào');
  const [postResults, setPostResults] = useState('Bạn Chưa Đăng Post Nào');

  // Dữ liệu cá nhân (thay thế cho ví dụ)
  const userData = {
    name: 'Elon Musk',
    age: 30,
    dob: '1993-05-15',
    gender: 'male',
    bio: 'Elon Reeve Musk is a businessman and investor. Musk is the founder, chairman, CEO and chief technology officer of SpaceX; angel investor, CEO, product architect and former chairman of Tesla, Inc.; owner,',
    avatarUrl: 'https://cdn.geekwire.com/wp-content/uploads/2014/09/elonmusk.jpeg', // URL hình đại diện
  };

  const handleCourseChange = (value) => {
    if (value.trim() === '') {
      // Nếu giá trị rỗng, in ra thông báo "Bạn Chưa Đăng Ký Khóa học Nào"
      setCourseInfo(['Bạn Chưa Đăng Ký Khóa học Nào']);
    } else {
      // Nếu giá trị không rỗng, thêm khóa học mới vào mảng
      const updatedCourseInfo = [...courseInfo];
      updatedCourseInfo.push(value);
      setCourseInfo(updatedCourseInfo);
    }
  };
  
  const handleExamResultsChange = (value) => {
    setExamResults(value); // Cập nhật thông tin kết quả luyện thi
  };

  const handlepostResultstsChange = (value) => {
    setPostResults(value); // Cập nhật thông tin kết quả luyện thi
  };

  return (
    <Layout>      
      <Content className="card-container" style={{width: 800,}}>
        <Card>
          <Avatar className="avatar" size={128} src={userData.avatarUrl} />
          <div className="profile-info">
            <Title level={3}>{userData.name}</Title>
            <Paragraph className="paragraph"><NumberOutlined /> Age: {userData.age}</Paragraph>
            <Paragraph className="paragraph"><CalendarOutlined/> Date of Birth: {userData.dob}</Paragraph>
            <Paragraph className="paragraph"><MehOutlined /> Gender: {userData.gender}</Paragraph>
            <Paragraph className="paragraph"><InfoCircleOutlined />  Bio: {userData.bio}</Paragraph>
            <div className='editBtn'>
            <Button href="/edituser" type="primary">
                Edit Profile
            </Button>
            </div>
            
          </div>
          
        </Card>
      </Content>

      <Layout>

    <Content className="card-container">
      <Card>
        <Tabs defaultActiveKey="courses" tabBarStyle={{ margin: '0 0 20px 0' }}>
          <TabPane tab="Khóa Học" key="courses">
          {courseInfo.map((course, index) => (
          <p key={index}>Khóa học {index + 1}: {course}</p>
          ))}
            {/* Thêm giao diện và chức năng cho khóa học nếu cần */}
          </TabPane>
          <TabPane tab="Kết Quả Luyện Thi" key="results">
            <p>{examResults}</p>
            {/* Thêm giao diện và chức năng cho kết quả luyện thi nếu cần */}
          </TabPane>
          <TabPane tab="Post" key="posts">
          <p>{postResults}</p>
            {/* Nội dung cho tab "Post" */}
          </TabPane>
        </Tabs>
      </Card>
    </Content>
  </Layout>
    </Layout>
  );
}

export default UserProfileView;
