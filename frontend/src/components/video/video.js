import React, { useState } from 'react';
import { Layout, Menu, Modal, Form, Input, Button } from 'antd';

const { Header, Content, Sider } = Layout;

const Video = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [currentTitle, setCurrentTitle] = useState('');
  const [currentDescription, setCurrentDescription] = useState('');
  const [videoList, setVideoList] = useState([
    { title: 'Video 1 Cách để đạt 600 toeic trong vòng 1 tháng', url: 'https://www.youtube.com/embed/hCsxrEYR7yI?si=U231c2ZT84qXEGsu', description: 'Description for Video 1'},
    { title: 'Video 2', url: 'https://www.youtube.com/embed/fJ9rUzIMcZQ?si=nUuz7zxVdnTGLEft', description: 'Sungha http://www.sunghajung.com arranged and played “Bohemian Rhapsody” from Queen Tuning : Half-step Down 2 Capo'},
    { title: 'Video 3', url: 'https://www.youtube.com/embed/U8CjKwYz_Vs?si=ho0mjw158lrVTNTt'},
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
        <Sider width={400}>
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
      <Button type="primary" onClick={showModal} style={{ margin: '10px' }}>
        Add Video
      </Button>
    </Layout>
  );
};

export default Video;
