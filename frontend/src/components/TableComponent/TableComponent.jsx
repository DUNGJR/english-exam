import React, { useState, useEffect } from "react";
import { deleteCourse } from "../../actions/posts";

import { Layout, Menu, Input, Card, Col, Row, Divider, Button, message, Upload, Table, Modal, Form, Popconfirm, Spin } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { createCourse, updateCourse } from "../../actions/posts";
import { BookOutlined, AuditOutlined, ReadOutlined, SoundOutlined, UploadOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const MyFormItemContext = React.createContext([]);
function toArr(str) {
  return Array.isArray(str) ? str : [str];
}
const MyFormItem = ({ name, ...props }) => {
  const prefixPath = React.useContext(MyFormItemContext);
  const concatName = name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;
  return <Form.Item name={concatName} {...props} />;
};
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};


const TableComponent = ({course, currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ name: '', topic: '', time: '', part: '', question: '' })
  // const [postDataDetail, setPostDatail] = useState({ name: '', topic: '', time: '', part: '', question: '' })

  const courseaa = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
  const courses = useSelector((state) => state.posts);
  // console.log(courses);
  
  // course = course +1;
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (courseaa) setPostData(courseaa);
  }, [courseaa])
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (currentId) {
      dispatch(updateCourse(currentId, postData));
      
    }
    else {
      
      dispatch(createCourse(postData));
    }
    console.log(currentId)
    clear()
  }
  
  const clear = () => {
    setCurrentId(null);
    setPostData({ name: '', topic: '', time: '', part: '', question: '' });
  }

  
  const [data, setData] = [
    courses?.length &&
    courses?.map((course) => {
      return { ...course, key: course._id };
    })
  ];
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading,setLoading]= useState(false)
  const [rowSelected,setRowSelected] = useState('');
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
  

  const handleEdit = () => {
    form.resetFields();
    // console.log("row",rowSelected)
   
    setCurrentId(course._id)
    setIsModalVisible(true);
  }

  

  const columns = [
    // { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Topic', dataIndex: 'topic', key: 'topic' },
    { title: 'Time', dataIndex: 'time', key: 'time' },
    { title: 'Part', dataIndex: 'part', key: 'part' },
    { title: 'Question', dataIndex: 'question', key: 'question' },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
        
            <Button icon={<EditOutlined />}   onClick={handleEdit}>
              Edit
            </Button>
            {/* {courses.map((course) => ( */}
          
          <Popconfirm
            title="Are you sure delete this product?"
            onConfirm={() => dispatch(deleteCourse(course._id))}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} type="danger" style={{ marginLeft: '8px' }}>
              Delete
            </Button>
          </Popconfirm>
            {/* // ))} */}
        </span>
      ),
    },
  ];

  
  return (
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

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
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
  )
}
export default TableComponent