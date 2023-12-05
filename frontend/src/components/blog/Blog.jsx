import React, { useState } from 'react';
import { Layout, Menu, Input, Card, Col, Row, Divider } from 'antd';
import { BookOutlined, AuditOutlined, ReadOutlined, SoundOutlined } from '@ant-design/icons';
const { Header, Content, Sider } = Layout;
const { Search } = Input;
const { Meta } = Card;

const articleData = [
  {
    title: "Cách viết CV xin việc bằng tiếng Anh mới nhất (2023)",
    description: "Cách nào để viết CV xin việc bằng tiếng Anh ấn tượng với nhà tuyển dụng? Hãy cùng nhau tìm hiểu cách viết CV tiếng Anh ngay dưới đây.",
    image: "https://i.redd.it/nhk8jg3psng71.jpg",
    category: "Tiếng Anh cơ bản"
  },
  {
    title: "Làm thế nào để tự học IELTS hiệu quả?",
    description: "Muốn tự học IELTS mà không cần thầy giáo? Đọc bài viết này để biết cách tự học IELTS hiệu quả từ những người đã thành công!",
    image: "https://i.redd.it/nhk8jg3psng71.jpg",
    category: "Luyện thi IELTS"
  },
  {
    title: "10 Bí quyết luyện thi TOEIC hiệu quả",
    description: "Muốn đạt điểm cao khi thi TOEIC? Hãy áp dụng 10 bí quyết luyện thi TOEIC hiệu quả từ những người đã thành công!",
    image: "https://i.redd.it/nhk8jg3psng71.jpg",
    category: "Luyện thi TOEIC"
  },
  {
    title: "Luyện nghe IELTS: Cách học hiệu quả từ những người thành công",
    description: "Muốn nâng cao kỹ năng luyện nghe IELTS? Hãy thử áp dụng những cách học hiệu quả từ những người đã đạt điểm cao!",
    image: "https://i.redd.it/nhk8jg3psng71.jpg",
    category: "Luyện thi IELTS"
  },
  {
    title: "Tổng hợp bài nghe TOEIC mới nhất 2023",
    description: "Chia sẻ danh sách bài nghe TOEIC mới nhất năm 2023 giúp bạn chuẩn bị tốt nhất cho kỳ thi TOEIC sắp tới.",
    image: "https://i.redd.it/nhk8jg3psng71.jpg",
    category: "Luyện thi TOEIC"
  },
  {
    title: "Cách học nghe tiếng Anh hiệu quả cho người mới học",
    description: "Hướng dẫn cách học nghe tiếng Anh từ cơ bản đến nâng cao, đặc biệt dành cho những người mới học tiếng Anh.",
    image: "https://i.redd.it/nhk8jg3psng71.jpg",
    category: "Tiếng Anh cơ bản"
  },
];

const App = () => {
  const [currentCategory, setCurrentCategory] = useState("Tiếng Anh cơ bản");

  const filteredArticles = articleData.filter(article => article.category === currentCategory);

  return (
    <Layout>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1', 'sub2']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <Menu.Item key="1" icon={<BookOutlined />} onClick={() => setCurrentCategory("Tiếng Anh cơ bản")}>
            Tiếng Anh cơ bản
          </Menu.Item>
          <Menu.SubMenu key="sub1" icon={<SoundOutlined />} title="Luyện thi IELTS">
            <Menu.Item key="2" onClick={() => setCurrentCategory("Luyện thi IELTS")}>IELTS Listening</Menu.Item>
            <Menu.Item key="3" onClick={() => setCurrentCategory("Luyện thi IELTS")}>IELTS Reading</Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu key="sub2" icon={<ReadOutlined />} title="Luyện thi TOEIC">
            <Menu.Item key="4" onClick={() => setCurrentCategory("Luyện thi TOEIC")}>TOEIC Listening</Menu.Item>
            <Menu.Item key="5" onClick={() => setCurrentCategory("Luyện thi TOEIC")}>TOEIC Reading</Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Sider>
      <Layout>
        <h2>BÀI VIẾT</h2>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          <Row gutter={16}>
            <Col span={16}>
              {filteredArticles.map((article, index) => (
                <Card key={index} style={{ marginBottom: 16, display: 'flex', alignItems: 'center' }}>
                  <Row wrap={false}>
                    <Col flex="200px">
                      <img
                        alt="example"
                        src={article.image}
                        style={{ width: '100%', height: 'auto' }}
                      />
                    </Col>
                    <Col flex="auto" style={{ padding: '0 20px' }}>
                      <h3>{article.title}</h3>
                      <Divider style={{ margin: '10px 0' }} />
                      <p>{article.description}</p>
                    </Col>
                  </Row>
                </Card>
              ))}
            </Col>
            <Col span={8}>
              <Search placeholder="Tìm kiếm tin tức" style={{ marginBottom: 16 }} />
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
