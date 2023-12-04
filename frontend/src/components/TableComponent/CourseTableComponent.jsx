import React, {useRef, useState, useEffect } from "react";
import { deleteCourse } from "../../actions/posts";

import { Layout, Menu, Space, Input, Card, Col, Row, Divider, Button, message, Upload, Table, Modal, Form, Popconfirm, Spin } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { createCourse, updateCourse } from "../../actions/posts";
import { BookOutlined, AuditOutlined, ReadOutlined, SoundOutlined, UploadOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

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


const TableComponent = (props) => {
  const {studies = [], currentId, setCurrentId} = props;
  console.log(props)
  const [postData, setPostData] = useState({ title: '', desc: ''})
  // const [postDataDetail, setPostDatail] = useState({ name: '', topic: '', time: '', part: '', question: '' })

  const courseaa = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
  // const courses = useSelector((state) => state.posts);

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
    setPostData({ title: '', desc: '' });
  }


  const [data, setData] = [
    studies?.length &&
    studies?.map((study) => {
      return { ...study, key: study._id };
    })
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false)
  const [rowSelected, setRowSelected] = useState('');
  const [form] = Form.useForm();

  const showModal = () => {
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
    setIsModalVisible(false);
    form.resetFields();
  };

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
  
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });


  const columns = [
    // { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Title', dataIndex: 'title', key: 'title', sorter:(a,b) =>a.name.length - b.name.length,
      ...getColumnSearchProps('name') },
    { title: 'Desc', dataIndex: 'desc', key: 'desc' },
    { title: 'Video',
    dataIndex: 'videos',
    key: 'video',
    render: (videos, record) => (
      <span>
        {videos.map((video, index) => (
          <div key={`${record.key}-video-${index}`}>
            <h3>{video.videotitle}</h3>
            <p>{video.videodesc}</p>
            <p>{video.videoSchema}</p>

          </div>
        ))}
      </span>
    ),},
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        
        <span>    
          <Button icon={<EditOutlined />}  onClick={()=>{setCurrentId(record._id);showModal()}}>
            Edit
          </Button>

          <Popconfirm
            title="Bạn có chắc chắn muốn xóa bài học này?"
            onConfirm={() => dispatch(deleteCourse(record._id))}
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

        <Form style={{ display: 'flex', flexDirection: 'column' }} form={form}>
          <MyFormItem {...formItemLayout} name="name" label="Name" value={postData.name} onChange={(e) => setPostData({ ...postData, name: e.target.value })} >
            <Input style={{}} />
          </MyFormItem >
          <MyFormItem {...formItemLayout} name="topic" label="Topic" value={postData.topic} onChange={(e) => setPostData({ ...postData, topic: e.target.value })} >
            <Input />
          </MyFormItem>
          <MyFormItem {...formItemLayout} name="time" label="Time" value={postData.time} onChange={(e) => setPostData({ ...postData, time: e.target.value })} >
            <Input />
          </MyFormItem>

        </Form>
      </Modal>

    </div>
  )
}
export default TableComponent