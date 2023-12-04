
// import React, { useState, useEffect } from "react";
// import { ClockCircleOutlined } from "@ant-design/icons";
// import { deleteCourse } from "../../actions/posts";

// import { Layout, Menu, Input, Card, Col, Row, Divider, Button, message, Upload, Table, Modal, Form, Popconfirm, Spin } from "antd";
// import { useSelector, useDispatch } from "react-redux";
// import { createCourse, updateCourse } from "../../actions/posts";
// import { BookOutlined, AuditOutlined, ReadOutlined, SoundOutlined, UploadOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
// import CourseTableComponent from "../TableComponent/CourseTableComponent"
// const AdminCourse = () => {
//   const [currentId, setCurrentId] = useState(null);
//   const users = useSelector((state) => state.users);
//   // console.log(users)
//   const [userData, setUserData] = useState(null);
//   const token = localStorage.getItem('token'); // Lấy token từ local storage
//   useEffect(() => {
//     if (!token) {
//       return;
//     }
//     fetch('http://localhost:3001/alluser', {
//       method: 'GET',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then((data) => setUserData(data))
//       .catch((error) => console.error(error));
//   }, [token]);

//   if (!userData) {
//     return <p>Loading...</p>;
//   }

//   // console.log(userData)

//   return (
//     <div>
      
//       <CourseTableComponent userData={userData}></CourseTableComponent>
//     </div>
//   )
// }
// export default AdminCourse


import React, { useState, useEffect } from "react";
import { ClockCircleOutlined } from "@ant-design/icons";
import { deleteCourse } from "../../actions/posts";

import { Layout, Menu, Input, Card, Col, Row, Divider, Button, message, Upload, Table, Modal, Form, Popconfirm, Spin } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { createCourse, updateCourse } from "../../actions/posts";
import { BookOutlined, AuditOutlined, ReadOutlined, SoundOutlined, UploadOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import CourseTableComponent from "../TableComponent/CourseTableComponent"
const AdminCourse = () => {
  const [currentId, setCurrentId] = useState(null);
  const [courseData, setCourseData] = useState(null);

  const courses = useSelector((state) => state.posts);
  

  const [studies, setStudies] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetch('http://localhost:3001/study', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setStudies(data))
      .catch((error) => console.error(error));
  }, []);
  

  if (!studies) {
    return <p>Loading...</p>;
  }
  console.log(studies)

  
  return (
    <div>
        <CourseTableComponent studies={studies} ></CourseTableComponent>
    </div>
  )
}
export default AdminCourse