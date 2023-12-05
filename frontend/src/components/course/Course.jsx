import React, { useState,useEffect } from "react";
import "./course.css";
import { Flex, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Avatar } from "antd";
import { useNavigate } from 'react-router-dom';
const { Meta } = Card;


const Course = () => {
  const [studies, setStudies] = useState(null);
  const navigate = useNavigate();

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


  const handleExamClick = (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');

    if (token) {
      // Nếu có token, cho phép chuyển hướng đến trang thi ngay
      navigate('/course/detail');
    } else {
      // Nếu không có token, hiển thị thông báo và chuyển hướng đến trang đăng nhập
      alert('Vui lòng đăng nhập để xem khóa học.');
      navigate('/login');
    }
  };

  return (
  !studies.length ? <Spin /> : (
    <div className="course">
      <div className="grid">
        <h2 className="course_title">DANH SÁCH KHÓA HỌC</h2>
        <div className="grid__row">
          {studies.map((study)=>(
              <a href="/course/detail" className="col-md-3" onClick={handleExamClick}>
              <Card className="card"
                style={{
                  width: 280,
                }}
                cover={
                  <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  />
                }
              >
                <Meta
                  className="Ctitle"
                  avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
                  title={study.title}
                  description={study.desc}
                />
              </Card>
            </a>
          ))}
        </div>
      </div>
    </div>
  ));
};

export default Course;
