import React, { useState, useEffect } from "react";
import { ClockCircleOutlined } from "@ant-design/icons";
import { deleteCourse } from "../../actions/posts";

import { Layout, Menu, Input, Card, Col, Row, Divider, Button, message, Upload, Table, Modal, Form, Popconfirm,Spin } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { createCourse, updateCourse } from "../../actions/posts";
import "./adminpage.css";
import { BookOutlined, AuditOutlined, ReadOutlined, SoundOutlined, UploadOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import AdminUser from "../../components/adminuser/AdminUser"
import AdminCourse from "../../components/admincourse/AdminCourse"

const { Header, Content, Sider } = Layout;
const { Search } = Input;
const { Meta } = Card;
const props = {
  name: 'file',
  action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
  headers: {
    authorization: 'authorization-text',
  },
};



function getItem(label,key,icon,children,type) {
  return {
    label,key,icon,children,type
  };
};

const AdminPage = ({ currentId, setCurrentId }) => {

  const [postData, setPostData] = useState({ name: '', topic: '', time: '', part: '', question: '' })
  const course = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
  const courses = useSelector((state) => state.posts);
  // console.log(courses);

  
  const dispatch = useDispatch();

  useEffect(() => {
    if (course) setPostData(course);
  }, [course])

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
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
 
  const items = [
    getItem('Quản lý đề thi','course',<BookOutlined />),
    getItem('Quản lý tài khoản','user',<AuditOutlined />)

  ]

  const [keySelected, setKeySelected ] = useState('')

  const renderPage = (key) => {
    switch (key) {
    case 'user': 
    return (
      <AdminUser></AdminUser>
    )
    case 'course': 
    return (
      <AdminCourse></AdminCourse>
    )

    default:
      return <></>
    }
  }

  const [data, setData] = useState([
    // <>{courses.map((course) =>))}
    // { id:1, name: 'Product 1', price: 20 },
    // </>
    courses?.length && 
    courses?.map((course) =>
    {
      return {...course, key: course._id};
    })
    
    
  ]);
  // console.log(data)

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

  const handleOnClick = ({key}) => {
    console.log('OnClick', key);
    setKeySelected(key);
  }


  return (
    <div>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={["user"]}
            items={items}
            // defaultOpenKeys={["sub1", "sub2"]}
            style={{ height: "100%", borderRight: 0 }}
            onClick={handleOnClick}
          >
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
            {renderPage(keySelected)}
          {/* <Upload {...props}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload> */}
        </Layout>

      </Layout>
    </div>
  );
};
export default AdminPage;
