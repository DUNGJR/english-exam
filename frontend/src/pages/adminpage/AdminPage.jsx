import React, { useState, useEffect } from "react";
import { ClockCircleOutlined } from "@ant-design/icons";
import { deleteCourse } from "../../actions/posts";

import { Layout, Menu, Input, Card, Col, Row, Divider, Button, message, Upload, Table, Modal, Form, Popconfirm, Spin } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { createCourse, updateCourse } from "../../actions/posts";
import "./adminpage.css";
import { BookOutlined, AuditOutlined, ReadOutlined, SoundOutlined, UploadOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import AdminUser from "../../components/adminuser/AdminUser"
import AdminCourse from "../../components/admincourse/AdminCourse"

const { Header, Content, Sider } = Layout;
const { Search } = Input;
const { Meta } = Card;



function getItem(label, key, icon, children, type) {
  return {
    label, key, icon, children, type
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

  const items = [
    getItem('Quản lý đề thi', 'course', <BookOutlined />),
    getItem('Quản lý tài khoản', 'user', <AuditOutlined />)
  ]
  const [keySelected, setKeySelected] = useState('course')
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

    courses?.length &&
    courses?.map((course) => {
      return { ...course, key: course._id };
    })


  ]);
  const handleOnClick = ({ key }) => {
    console.log('OnClick', key);
    setKeySelected(key);
  }

  return (
    <div>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={["course"]}
            items={items}
            // defaultOpenKeys={["sub1", "sub2"]}
            style={{ height: "100%", borderRight: 0 }}
            onClick={handleOnClick}
          >
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          {renderPage(keySelected)}

        </Layout>
      </Layout>
    </div>
  );
};
export default AdminPage;
