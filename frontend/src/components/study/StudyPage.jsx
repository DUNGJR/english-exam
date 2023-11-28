import React, { useState } from 'react';
import { Layout, Menu, Modal, Form, Input, Button } from 'antd';

const { Header, Content, Sider } = Layout;

const Video = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [currentTitle, setCurrentTitle] = useState('');
  const [currentDescription, setCurrentDescription] = useState('');
  const [videoList, setVideoList] = useState([
    { title: 'Bài học 1:', url: 'https://www.youtube.com/embed/MwLB1u-4ogw?si=8NtVkfLE5SJSLQSX', description: 'TỰ HỌC TOEIC READING MỤC TIÊU 500 TOEIC: Unit 1| Ms Hoa TOEIC' },
    { title: 'Bài học 2:', url: 'https://www.youtube.com/embed/1JFTaaatqVo?si=e1thRomd83mqCojR', description: 'TỰ HỌC TOEIC READING MỤC TIÊU 500 TOEIC: Unit 2| Ms Hoa TOEIC' },
    { title: 'Bài học 3:', url: 'https://www.youtube.com/embed/q_6oYvTkDJI?si=79ILWI5jFStehPrM', description: 'TỰ HỌC TOEIC READING MỤC TIÊU 500 TOEIC: Unit 2| Ms Hoa TOEIC' },
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        setVideoList([...videoList, values]);
        setIsModalVisible(false);
        form.resetFields();
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const handleMenuClick = (video) => {
    setVideoUrl(video.url);
    setCurrentTitle(video.title);
    setCurrentDescription(video.description);
  };

  return (
    <Layout>
      <Header style={{ color: 'white', textAlign: 'center', fontSize: '20px' }}>
        Video Viewer
      </Header>

      <Modal title="Add New Video" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical">
          <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please input the title!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="url" label="URL" rules={[{ required: true, message: 'Please input the URL!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
      <Layout>
        <Sider width={200}>
          <Menu
            mode="inline"
            style={{ height: '100%', borderRight: 0 }}
          >
            {videoList.map((item, index) => (
              <Menu.Item key={index} onClick={() => handleMenuClick(item)}>
                <div style={{ alignItems: 'center', justifyContent: 'center' }}>
                  {item.title}
                </div>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout style={{ paddingLeft: '10px', paddingBottom: '10px' }}>
          <Content style={{
            background: '#fff',
            padding: 50,
            margin: 0,
            minHeight: 280,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          >
            <div style={{ width: '1280px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {videoUrl && <iframe width="1280" height="720" src={videoUrl} title="Video Player" frameBorder="0" allowFullScreen></iframe>}
              <h2>{currentTitle}</h2>
              <p>{currentDescription}</p>
            </div>
          </Content>
        </Layout>
      </Layout>
      {/* <Button type="primary" onClick={showModal} style={{ margin: '10px' }}>
        Add Video
      </Button> */}
    </Layout>
  );
};

export default Video;
