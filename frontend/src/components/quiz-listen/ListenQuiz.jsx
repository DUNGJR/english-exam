import React, { useState, useEffect } from "react";
import "./listenquiz.css";
import { Slider, Image, Button, Radio, Space, Statistic } from "antd";
import { CaretRightOutlined } from '@ant-design/icons';
const { Countdown } = Statistic;

const ListenQuiz = () => {
  const [Url, setUrl] = useState({
    audio: "https://drive.google.com/uc?id=1DkK_s66npcDXQ0-cN83cB-EW1O0mevec",
  });

  const [questionData, setQuestionData] = useState([
    {
      imageSrc: "https://study4.com/media/ets2023/img/1/image3.png",
      questionNumber: 1,
      options: ["Option A", "Option B", "Option C", "Option D"],
      selectedOption: null,
    },
    {
      imageSrc: "https://example.com/path/to/your/image2.png",
      questionNumber: 2,
      options: ["Option E", "Option F", "Option G", "Option H"],
      selectedOption: null,
    },
    // Add more questions as needed
  ]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    // Gọi API hoặc thực hiện các thao tác cần thiết để lấy thông tin từ backend
    // Ví dụ: fetchAudioData().then((audioUrl) => setUrl(audioUrl));
    // Ví dụ: fetchQuestionData();
  }, []); 

  const onChange = (val) => {
    if (typeof val === 'number' && 4.95 * 1000 < val && val < 5 * 1000) {
      console.log('changed!');
    }
  };

  const handleOptionChange = (value) => {
    const updatedQuestions = [...questionData];
    updatedQuestions[currentQuestionIndex].selectedOption = value;
    setQuestionData(updatedQuestions);
  };

  const handleNextQuestion = () => {
    // Chuyển tới câu hỏi tiếp theo nếu có
    if (currentQuestionIndex < questionData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    // Chuyển về câu hỏi trước đó nếu có
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
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
              <audio controls>
                <source src={Url.audio} type="audio/mp3" />
              </audio>
            </div>

            <Image width={200} src={questionData[currentQuestionIndex].imageSrc} />
            <p className="question">
              <Button className="question_btn" shape="circle">
                {questionData[currentQuestionIndex].questionNumber}
              </Button>
              <Radio.Group
                name="radiogroup"
                value={questionData[currentQuestionIndex].selectedOption}
                onChange={(e) => handleOptionChange(e.target.value)}
              >
                <Space direction="vertical">
                  {questionData[currentQuestionIndex].options.map((option, index) => (
                    <Radio key={index} value={index + 1}>
                      {option}
                    </Radio>
                  ))}
                </Space>
              </Radio.Group>
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px'}}>
              <Button type="primary" onClick={handlePreviousQuestion}>Previous</Button>
              <Button type="primary" onClick={handleNextQuestion}>Next</Button>
            </div>
          </div>
        </div>

        <div className="quiz_right">
          <p>Thời gian còn lại</p>
          <Countdown title="" value={Date.now() + 50 * 1000} onChange={onChange} />
          <Button className="nopbai_btn" type="primary" block>
            NỘP BÀI
          </Button>
          <p className="quiz_right_title">BẢNG CÂU HỎI</p>
          {questionData.map((question, index) => (
            <Button key={index} className="question_btn" shape="circle" onClick={() => setCurrentQuestionIndex(index)}>
              {question.questionNumber}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListenQuiz;