import React from "react";
import "./exam.css";
import { Button, Spin } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { deleteCourse } from "../../actions/posts";
import { useNavigate } from "react-router-dom";
import { Row, Col } from 'antd';

const Exam = ({ setCurrentId }) => {
  const courses = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleExamClick = () => {
    const token = localStorage.getItem('token');

    if (token) {
      // Nếu có token, cho phép chuyển hướng đến trang thi ngay
      navigate('/exam-reading');
    } else {
      // Nếu không có token, hiển thị thông báo và chuyển hướng đến trang đăng nhập
      alert('Vui lòng đăng nhập để tham gia thi.');
      navigate('/login');
    }
  };

  return (
    !courses.length ? <Spin /> : (
      <div className="content">
        <div className="grid">
          <h2 className="course_title">DANH SÁCH ĐỀ THI</h2>
          <div className="grid__row">

          <Row>
            {courses.map((course) => (
                <Col xs={24} sm={12} md={8} lg={6}>

              <div className="course_list" key={course._id}>
                <div className="card">
                  <span className="course_name">{course.name}</span>
                  <p className="course_topic">Bộ đề: {course.topic}</p>
                  <p className="course_time">
                    <ClockCircleOutlined style={{}} /> {course.time}
                  </p>
                  <p className="course_detail">{course.part} phần thi | {course.question} câu hỏi</p>
                  <Button type="dashed" className="course_button" onClick={handleExamClick}>Thi ngay</Button>
                    {/* <Button onClick={()=>setCurrentId(course._id)}>update</Button>
                <Button onClick={()=>dispatch(deleteCourse(course._id))}>delete</Button> */}
                </div>
              </div>
              </Col>
            ))}
            </Row>

             {/* <div className="course_list col-md-3">
              <div className="card">
                <p className="course_name">Đề Listening Part 1</p>
                <p className="course_topic">TOEIC</p>
                <p className="course_time">
                  <ClockCircleOutlined style={{}} /> 6 phút
                </p>
                <p className="course_detail">1 phần, 6 câu hỏi</p>
                <a href="/exam-listen" className="course_button"><Button type="primary" className="course_button">Vào phòng thi</Button></a>
              </div>
              </div> */}
          </div>
        </div>
      </div>
    )
  );
};

export default Exam;





      
             