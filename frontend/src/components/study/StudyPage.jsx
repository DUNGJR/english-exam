import React, { useState } from 'react';
import { Layout, Menu, Modal, Form, Input, Button } from 'antd';

const { Header, Content, Sider } = Layout;

const Video = () => {
  const [Url, setUrl] = useState('');
  const [Title, setTitle] = useState('');
  const [Description, setDescription] = useState('');
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
    setUrl(video.url);
    setTitle(video.title);
    setDescription(video.description);
  };


  async function uploadVideo(event){
    event.preventDefault();

    const response = await fetch('http://localhost:3001/course/detail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Url,
        Title,
        Description
      }),
    });
    const data = await response.json();
    if (data.status === 'ok') {
      alert('Up Video Thành Công!');
    } else {
      // Đăng ký không thành công
      alert(`Up Video Thất Bại: ${data.error}`);
      console.error(data.error);
    }
  }


  return (
    <Layout>
      <Modal title="Add New Video" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <form onSubmit={uploadVideo} layout="vertical">
          <Form.Item name="Title" label="Title" rules={[{ required: true, message: 'Please input the title!' }]}>
            <Input 
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Video's Title"
            />
          </Form.Item>
          <Form.Item name="videoUrl" label="URL" rules={[{ required: true, message: 'Please input the URL!' }]}>
            <Input
            value={Url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter Video's URL"
            />
          </Form.Item>
          <Form.Item name="Description" label="Description">
            <Input.TextArea 
            value={Description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter Video's Description"
            />
          </Form.Item>
        </form>
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
              {Url && <iframe width="1280" height="720" src={Url} title="Video Player" frameBorder="0" allowFullScreen></iframe>}
              <h2>{Title}</h2>
              <p>{Description}</p>
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
