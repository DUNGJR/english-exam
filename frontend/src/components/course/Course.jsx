import React from "react";
import "./course.css";
import { Button, Flex } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Avatar, Card } from "antd";
const { Meta } = Card;

const Course = () => {
  return (
    <div className="course">
      <div class="grid">
        <h2 className="course_title">DANH SÁCH KHÓA HỌC</h2>
        <div class="grid__row">
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
                avatar={
                  <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
                }
                title="Khóa học Toiec 500"
                description="Hướng dẫn học từ cơ bản đến 500 toeic"
              />
            </Card>
          </a><a href="/course/detail" className="col-md-3">
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
                avatar={
                  <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
                }
                title="Khóa học Toiec 500"
                description="Hướng dẫn học từ cơ bản đến 500 toeic"
              />
            </Card>
          </a><a href="/course/detail" className="col-md-3">
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
                avatar={
                  <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
                }
                title="Khóa học Toiec 500"
                description="Hướng dẫn học từ cơ bản đến 500 toeic"
              />
            </Card>
          </a>

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
                avatar={
                  <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
                }
                title="Khóa học Toiec 500"
                description="Hướng dẫn học từ cơ bản đến 500 toeic"
              />
            </Card>
          </a>



        </div>
      </div>
    </div>
  );
};
export default Course;
