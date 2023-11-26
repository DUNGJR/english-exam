import React, { useState, useEffect } from "react";

import { Layout, Menu, Input, Card, Col, Row, Divider, Button, message, Upload, Table, Modal, Form, Popconfirm } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { createCourse, updateCourse } from "../../actions/posts";
import "./adminpage.css";
import { BookOutlined, AuditOutlined, ReadOutlined, SoundOutlined, UploadOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const { Header, Content, Sider } = Layout;
const { Search } = Input;
const { Meta } = Card;
const props = {
  name: 'file',
  action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
  headers: {
    authorization: 'authorization-text',
  },
  // onChange(info) {
  //   if (info.file.status !== 'uploading') {
  //     console.log(info.file, info.fileList);
  //   }
  //   if (info.file.status === 'done') {
  //     message.success(`${info.file.name} file uploaded successfully`);
  //   } else if (info.file.status === 'error') {
  //     message.error(`${info.file.name} file upload failed.`);
  //   }
  // },
};
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};

const MyFormItemContext = React.createContext([]);
function toArr(str) {
  return Array.isArray(str) ? str : [str];
}
const MyFormItem = ({ name, ...props }) => {
  const prefixPath = React.useContext(MyFormItemContext);
  const concatName = name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;
  return <Form.Item name={concatName} {...props} />;
};

const AdminPage = ({currentId,setCurrentId}) => {
  
  const [postData, setPostData] = useState({ name: '', topic: '', time: '', part: '', question: '' })
  const course = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId):null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (course) setPostData(course);
  },[course])

  const handleSubmit = (e) => {
    e.preventDefault();

    if(currentId) {
    dispatch(updateCourse(currentId, postData));

    }
    else {

      dispatch(createCourse(postData));
    }
    clear()
  }

  const clear = () => {
    setCurrentId(null);
    setPostData({ name: '', topic: '', time: '', part: '', question: '' });
  }

  const posts = useSelector((state) => state.posts);
  console.log(posts);
  const [data, setData] = useState([
    { id: 1, name: 'Product 1', price: 20 },
    { id: 2, name: 'Product 2', price: 30 },
    // Add more initial data as needed
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        setIsModalVisible(false);
        // Add new product to data
        setData([...data, { id: data.length + 1, ...values }]);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };

  const handleDelete = (id) => {
    // Remove product with the given id
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button icon={<EditOutlined />} onClick={showModal}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure delete this product?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} type="danger" style={{ marginLeft: '8px' }}>
              Delete
            </Button>
          </Popconfirm>
        </span>
      ),
    },
  ];
  
 
  return (
    <div>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1", "sub2"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <Menu.Item key="1" icon={<SoundOutlined />}>
              Quản lý bài nghe
            </Menu.Item>

            <Menu.Item key="2" icon={<BookOutlined />}>
              {" "}
              Quản lý bài đọc
            </Menu.Item>

            <Menu.Item key="3" icon={<ReadOutlined />}>
              Quản lý tài khoản
            </Menu.Item>

            <Menu.Item key="4" icon={<AuditOutlined />}>
              Thông tin cá nhân
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
       
          {/* </Col> */}
          {/* <Upload {...props}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload> */}

          <Row gutter={16}>
            <Col className="gutter-row" span={10}>
            </Col>
          </Row>

          <div>
            <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
              Add Product
            </Button>
            <Table dataSource={data} columns={columns} rowKey="id" />

            <Modal
              title={currentId ? "Edit Product" : "Add Product"}
              visible={isModalVisible}
              onOk={handleSubmit}
              onCancel={handleCancel}
            >

              <form  onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                <MyFormItem {...formItemLayout} name="name" label="Name" value={postData.name} onChange={(e) => setPostData({ ...postData, name: e.target.value })} >
                  <Input style={{}} />
                </MyFormItem >
                <MyFormItem {...formItemLayout} name="topic" label="Topic" value={postData.topic} onChange={(e) => setPostData({ ...postData, topic: e.target.value })} >
                  <Input />
                </MyFormItem>
                <MyFormItem {...formItemLayout} name="time" label="Time" value={postData.time} onChange={(e) => setPostData({ ...postData, time: e.target.value })} >
                  <Input />
                </MyFormItem>

                <MyFormItem {...formItemLayout} name="part" label="Part" value={postData.part} onChange={(e) => setPostData({ ...postData, part: e.target.value })} >
                  <Input />
                </MyFormItem>

                <MyFormItem {...formItemLayout} name="question" label="Question" value={postData.question} onChange={(e) => setPostData({ ...postData, question: e.target.value })} >
                  <Input />
                </MyFormItem>

              </form>
            </Modal>

          </div>

        </Layout>

      </Layout>
    </div>
  );
};
export default AdminPage;
