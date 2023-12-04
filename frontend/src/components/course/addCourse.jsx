// import React, { useState } from 'react';

// function AddCourse() {
    
//     const [title, setTitle] = useState('');
//     const [desc, setDesc] = useState('');

//   const handleAddCourse = () => {
//     fetch('http://localhost:3001/course', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ title, decs: desc }), // Chú ý: đã sửa thành "decs" thay vì "description"
//     })
//       .then(response => response.json())
//       .then(data => {
//         console.log(data.status);
//       })
//       .catch(error => {
//         console.error('Error:', error);
//       });
//   };

//   return (
//     <div className="App">
//       <h1>Add Course</h1>
//       <label>
//         Title:
//         <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
//       </label>
//       <label>
//         Description:
//         <textarea value={desc} onChange={(e) => setDesc(e.target.value)} />
//       </label>
      
//       {/* {isAdmin && (
//         <button onClick={handleAddCourse}>Add Course</button>
//       )} */}
//     </div>
//   );
// }

// export default AddCourse;

import React, { useState, useEffect } from "react";
import { ClockCircleOutlined } from "@ant-design/icons";
import { deleteCourse } from "../../actions/posts";

import { Layout, Menu, Input, Card, Col, Row, Divider, Button, message, Upload, Table, Modal, Form, Popconfirm, Spin } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { createCourse, updateCourse } from "../../actions/posts";
import { BookOutlined, AuditOutlined, ReadOutlined, SoundOutlined, UploadOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import UserTableComponent from "../TableComponent/UserTableComponent"
const AdminCourse = () => {
  const [currentId, setCurrentId] = useState(null);
  const users = useSelector((state) => state.users);
  // console.log(users)
  const [userData, setUserData] = useState(null);
  const token = localStorage.getItem('token'); // Lấy token từ local storage
  useEffect(() => {
    if (!token) {
      return;
    }
    fetch('http://localhost:3001/alluser', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setUserData(data))
      .catch((error) => console.error(error));
  }, [token]);

  if (!userData) {
    return <p>Loading...</p>;
  }

  // console.log(userData)

  return (
    <div>
      
      <UserTableComponent userData={userData}></UserTableComponent>
    </div>
  )
}
export default AdminCourse