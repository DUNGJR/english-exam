import React, { useState } from "react";
import "./course.css";
import { Button, Card, Avatar } from "antd";
import { useNavigate } from 'react-router-dom';
import AddCourse from "../../components/course/addCourse";
const { Meta } = Card;

const Course = () => {
  const isAdmin = localStorage.getItem('admin');
  const navigate = useNavigate();

  const handleAddVideo = () => {
    // Navigate to the addCourse page
    navigate('/addCourse');
  };



  return (
    <div className="course">
      <div className="grid">
        <h2 className="course_title">DANH SÁCH KHÓA HỌC</h2>
        <div className="grid__row">
          {isAdmin && (
             <>
             <Button type="primary" className="add-video-button" onClick={handleAddVideo}>
               Add Course
             </Button>
           </>
          )}

          <a href="/course/detail" className="col-md-3">
            <Card
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
                avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
                title="Khóa học Toiec 500"
                description="Hướng dẫn học từ cơ bản đến 500 toeic"
              />
            </Card>
          </a>

          
          {/* Thêm thẻ Card và các nút Add Video khác ở đây */}

        </div>
      </div>
    </div>
  );
};

export default Course;
