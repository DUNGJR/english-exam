import React, { useState } from "react";
import "./listenquiz.css";
import { Slider, Image, Button, Radio, Space, Statistic } from "antd";
import { CaretRightOutlined } from '@ant-design/icons';
const { Countdown } = Statistic;
const ListenQuiz = () => {

  const onChange = (val) => {
    if (typeof val === 'number' && 4.95 * 1000 < val && val < 5 * 1000) {
      console.log('changed!');
    }
  };
  return (
    <div className="quiz_full">
      <h1 className="quiz_title">ETS 2023 | 120 phút</h1>
      <div className="quiz_content">
        <div className="quiz_left">
          <h3 className="quiz_left_part">PART 1</h3>

          <div className="quiz_left_content">
            <div className="listen">
              <Button className="play_btn">
                <CaretRightOutlined style={{ fontSize: 25 }} /></Button>
              <Slider className="slider" defaultValue={30} />
              <span>00:00</span>
            </div>

            <Image
              width={200}
              src="https://study4.com/media/ets2023/img/1/image3.png"
            />
            <p className="question">
              <Button className="question_btn" shape="circle">
                1
              </Button>
              <Radio.Group name="radiogroup" defaultValue={1}>
                <Space direction="vertical">
                  <Radio value={1}>Option A</Radio>
                  <Radio value={2}>Option B</Radio>
                  <Radio value={3}>Option C</Radio>
                  <Radio value={4}>Option D</Radio>
                </Space>
              </Radio.Group>
            </p>
          </div>
        </div>
        <div className="quiz_right">
          <p>Thời gian còn lại</p>
          <Countdown title="" value={Date.now() + 50 * 1000} onChange={onChange} />
          <Button className="nopbai_btn" type="primary" block>
            NỘP BÀI
          </Button>
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
export default ListenQuiz;
