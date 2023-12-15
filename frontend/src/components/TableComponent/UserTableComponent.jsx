import React, {useRef, useState, useEffect } from "react";
import { deleteUser } from "../../actions/users";

import { Layout, Menu, Space, Input, DatePicker , Select , Card, Col, Row, Divider, Button, message, Upload, Table, Modal, Form, Popconfirm, Spin } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { createUser, updateUser } from "../../actions/users";
import { BookOutlined, AuditOutlined, ReadOutlined, SoundOutlined, UploadOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import moment from "moment";

const { Option } = Select;


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
  const {userData = [], currentId, setCurrentId} = props;
  console.log(props)
  const [postData, setPostData] = useState({ name: '', email: '', dob: '', admin: ''})

  const courseaa = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (courseaa) setPostData(courseaa);
  }, [courseaa])

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(updateUser(currentId, postData));
    }
    else {
      dispatch(createUser(postData));
    }
    console.log(currentId)
    clear()
  }

  const clear = () => {
    setCurrentId(null);
    setPostData({ name: '', email: '', dob: '', admin: '' });
  }


  const [data, setData] = [
    userData?.length &&
    userData?.map((users) => {
      return { ...users, key: users._id };
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


  // const handleEdit = () => {
  //   setCurrentId(courses._id)
  //   setIsModalVisible(true);
  // }
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
    { title: 'Tên', dataIndex: 'name', key: 'name', sorter:(a,b) =>a.name.length - b.name.length,
      ...getColumnSearchProps('name') },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Ngày Sinh',
      dataIndex: 'dob',
      key: 'dob',
      render: (text) => text ? moment(text).format('YYYY-MM-DD') : '',
    },
    {
      title: 'Admin',
      dataIndex: 'admin',
      key: 'admin',
      render: (admin) => <span>{admin ? 'Yes' : 'No'}</span>,
    },
    {
      title: 'Thực thi',
      key: 'action',
      render: (text, record) => (
        
        <span>    
          <Button icon={<EditOutlined />}  onClick={()=>{setCurrentId(record._id);showModal()}}>
            Sửa
          </Button>

          <Popconfirm
            title="Bạn có chắc chắn muốn xóa bài học này?"
            onConfirm={() => dispatch(deleteUser(record._id))}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} type="danger" style={{ marginLeft: '8px' }}>
              Xóa
            </Button>
          </Popconfirm>
        </span>
      ),
    },
  ];


  


  return (
    <div>
      <Table dataSource={data} columns={columns} rowKey="id" />

      <Modal
        title={currentId ? "Edit User" : "Add User"}
        visible={isModalVisible}
        onOk={handleSubmit}
        onCancel={handleCancel}
      >

        <Form style={{ display: 'flex', flexDirection: 'column' }} form={form}>
          <MyFormItem {...formItemLayout} name="email" label="Email" value={postData.email} onChange={(e) => setPostData({ ...postData, email: e.target.value })} >
            <Input />
          </MyFormItem>
          <MyFormItem {...formItemLayout} name="name" label="Name" value={postData.name} onChange={(e) => setPostData({ ...postData, name: e.target.value })} >
            <Input style={{}} />
          </MyFormItem >
          <MyFormItem {...formItemLayout} name="dob" label="Dob" value={postData.dob ? moment(postData.dob, 'YYYY-MM-DD') : null}>
            <DatePicker
              style={{ width: '100%' }}
              format="YYYY-MM-DD"
              onChange={(date) => setPostData({ ...postData, dob: date })}
            />
          </MyFormItem>
          {/* <MyFormItem {...formItemLayout} name="admin" label="Admin" value={postData.admin} onChange={(value) => setPostData({ ...postData, admin:value.target.value  })}>
            <Select>
              <Option value={true}>True</Option>
              <Option value={false}>False</Option>
            </Select>
          </MyFormItem> */}

          {/* <MyFormItem {...formItemLayout} name="admin" label="Admin" value={postData.admin} onChange={(e) => setPostData({ ...postData, admin: e.target.value })} >
            <Input style={{}} />
          </MyFormItem > */}

        </Form>
      </Modal>

    </div>
  )
}
export default TableComponent