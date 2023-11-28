import React, { useState, useEffect } from "react";
import "./quiz.css";
import { Button, Radio, Space, Statistic } from "antd";
import data from "../../data/data";
import { useSelector, useDispatch } from 'react-redux'
import { useFetchQuestion } from '../../hooks/FetchQuestion';
import { updateResult } from "../../hooks/setResult";
const { Countdown } = Statistic;


const Quiz = ({ onChecked }) => {
  const [checked, setChecked] = useState(undefined)
  const { trace } = useSelector(state => state.questions);
  const result = useSelector(state => state.result.result);
  const [{ isLoading, apiData, serverError }] = useFetchQuestion();
  // useSelector(state => console.log(state));

  const questions = useSelector(state => state.questions.queue[state.questions.trace])
  const dispatch = useDispatch()



  useEffect(() => {
    dispatch(updateResult({ trace, checked }))
  }, [checked])

  function onSelect(i) {
    onChecked(i)
    setChecked(i)
    dispatch(updateResult({ trace, checked }))
  }

  const onChange = (val) => {
    if (typeof val === 'number' && 4.95 * 1000 < val && val < 5 * 1000) {
      console.log('changed!');
    }
  };

  if (isLoading) return <h3>Loading...</h3>
  if (serverError) return <h3 className='text-light'>{serverError || "Unknown Error"}</h3>

  return (
    <div className="quiz_full">
      <h1 className="quiz_title">Đề mini-test | 10 phút</h1>
      <div className="quiz_content">
        <div className="quiz_left">
          <h3 className="quiz_left_part">READING</h3>

          <div className="quiz_left_content" >
            <div className='questions'>
              <ul style={{ listStyle: "none" }} key={questions?.id}>
                <p className="question" key={questions?.id}>
                  <Button className="question_btn" shape="circle">{questions?.id}</Button>{questions?.question}
                </p>
                {questions?.options.map((q, i) => (
                  <li style={{ marginLeft: 45 }} key={i}>
                    <input
                      type="radio"
                      value={false}
                      name="options"
                      id={`q${i}-option`}
                      onChange={() => onSelect(i)}
                    />

                    <label className='text-primary' htmlFor={`q${i}-option`}>{q}</label>
                    <div className={`check ${result[trace] == i ? 'checked' : ''}`}></div>
                  </li>
                ))
                }
              </ul>
            </div>

          </div>

        </div>
        <div className="quiz_right">
          <p>Thời gian còn lại</p>
          {/* <span>00:00</span> */}
          <Countdown className="countdown" title="" value={Date.now() + 600 * 1000} onChange={onChange} />

          {/* <a href="/result">
            <Button className="nopbai_btn" type="primary" block>
              NỘP BÀI
            </Button> </a> */}
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

        </div>
      </div>
    </div>
  );
};
export default Quiz;


