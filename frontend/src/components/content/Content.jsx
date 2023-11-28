import React from "react";
import "./content.css";
import { Button, Flex, Spin } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { deleteCourse } from "../../actions/posts";


const Content = ({ setCurrentId }) => {
  const courses = useSelector((state) => state.posts);
  console.log(courses);
  const dispatch = useDispatch();
  return (
    !courses.length ? <Spin /> : (

      <div className="content">
        <div className="grid">
          <h2 className="course_title">DANH SÁCH ĐỀ THI</h2>
          <div className="grid__row">

            {courses.map((course) => (
              <div className="course_list col-md-3">

                <div className="card" key={course._id}>
                  <span className="course_name"> {course.name}</span>
                  <p className="course_topic">Bộ đề: {course.topic}</p>
                  <p className="course_time">
                    <ClockCircleOutlined style={{}} /> {course.time}
                  </p>
                  <p className="course_detail">{course.part} phần thi | {course.question} câu hỏi</p>
                  <a href="/exam-reading">
                    <Button className="course_button">Thi ngay</Button>
                  </a>
                  {/* <Button onClick={()=>setCurrentId(course._id)}>update</Button>
              <Button onClick={()=>dispatch(deleteCourse(course._id))}>delete</Button> */}

                </div>

              </div>
            ))}



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
export default Content;
