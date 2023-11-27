import React, { useState } from "react";
import "./quiz.css";
import { Button, Radio, Space } from "antd";

const Quiz = () => {
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  return (
    <div className="quiz_full">
      <h1 className="quiz_title">ETS 2023 | 120 phút</h1>
      <div className="quiz_content">
        <div className="quiz_left">
          <h3 className="quiz_left_part">PART 5</h3>
          <div className="quiz_left_content">
            <p className="question">
              <Button className="question_btn" shape="circle">
                1
              </Button>
              Question 1: What do the women's children do all the time?
            </p>

            <Radio.Group style={{marginLeft: 45}} onChange={onChange} value={value}>
              <Space direction="vertical">
                <Radio value={1}>Option A</Radio>
                <Radio value={2}>Option B</Radio>
                <Radio value={3}>Option C</Radio>
                <Radio value={4}>Option D</Radio>
              </Space>
            </Radio.Group>
          
          </div>

          <div className="quiz_left_content">
            <p className="question">
              <Button className="question_btn" shape="circle">
                2
              </Button>
              Question 1: What do the women's children do all the time?
            </p>

            <Radio.Group style={{marginLeft: 45}} name="radiogroup" defaultValue={1}>
              <Space direction="vertical">
                <Radio value={1}>Option A</Radio>
                <Radio value={2}>Option B</Radio>
                <Radio value={3}>Option C</Radio>
                <Radio value={4}>Option D</Radio>
              </Space>
            </Radio.Group>
          
          </div>

          <div className="quiz_left_content">
            <p className="question">
              <Button className="question_btn" shape="circle">
                2
              </Button>
              Question 1: What do the women's children do all the time?
            </p>

            <Radio.Group style={{marginLeft: 45}} name="radiogroup" defaultValue={1}>
              <Space direction="vertical">
                <Radio value={1}>Option A</Radio>
                <Radio value={2}>Option B</Radio>
                <Radio value={3}>Option C</Radio>
                <Radio value={4}>Option D</Radio>
              </Space>
            </Radio.Group>
          
          </div>
          

          
        </div>
        <div className="quiz_right">
          <p>Thời gian còn lại</p>
          <span>00:00</span>
          <a href="/score">
          <Button className="nopbai_btn" type="primary" block>
      NỘP BÀI
    </Button> </a>
             <p className="quiz_right_title">BẢNG CÂU HỎI</p>
          <Button className="question_btn" shape="circle">
                1
              </Button>
              <Button className="question_btn" shape="circle">
                1
              </Button>
              <Button className="question_btn" shape="circle">
                1
              </Button>
              <Button className="question_btn" shape="circle">
                1
              </Button>
              <Button className="question_btn" shape="circle">
                1
              </Button>
              <Button className="question_btn" shape="circle">
                1
              </Button>
              <Button className="question_btn" shape="circle">
                1
              </Button>
              <Button className="question_btn" shape="circle">
                1
              </Button>
        </div>
      </div>
    </div>
  );
};
export default Quiz;
