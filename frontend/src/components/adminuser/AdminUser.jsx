import React, { useState, useEffect } from "react";
import { ClockCircleOutlined } from "@ant-design/icons";
import { deleteCourse } from "../../actions/posts";

import { Layout, Menu, Input, Card, Col, Row, Divider, Button, message, Upload, Table, Modal, Form, Popconfirm, Spin } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { createCourse, updateCourse } from "../../actions/posts";
import { BookOutlined, AuditOutlined, ReadOutlined, SoundOutlined, UploadOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import TableComponent from "../TableComponent/TableComponent"

const AdminCourse = () => {
  const [currentId, setCurrentId] = useState(null);
  const courses = useSelector((state) => state.posts);

  return (
    <div>
      {courses.map((course) => (
        <TableComponent course={course} currentId={currentId} setCurrentId={setCurrentId}  ></TableComponent>
      ))}
    </div>
  )
}
export default AdminCourse