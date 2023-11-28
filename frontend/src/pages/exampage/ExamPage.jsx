import React, { useState, useEffect } from "react";
import { Quiz } from "../../components"
import { useSelector, useDispatch } from 'react-redux'
import { MoveNextQuestion } from "../../hooks/FetchQuestion";
import { MovePrevQuestion } from "../../hooks/FetchQuestion";
import { PushAnswer } from "../../hooks/setResult";
import { Button } from "antd";
import { Navigate } from "react-router-dom";
import './exam.css'

const ExamPage = () => {
  const [check, setChecked] = useState(undefined)
  const result = useSelector(state => state.result.result);
  const { queue, trace } = useSelector(state => state.questions);
  const dispatch = useDispatch();


  function onNext() {
    if (trace < queue.length) {

      dispatch(MoveNextQuestion());

      if (result.length <= trace) {
        dispatch(PushAnswer(check))
      }
    }

    /** reset the value of the checked variable */
    setChecked(undefined)
  }
  function onPrev() {
    // console.log("FD")
    if (trace > 0) {
      dispatch(MovePrevQuestion())
    }
  }
  useEffect(() => {
    // console.log(state);

  })
  function onChecked(check) {
    setChecked(check)
  }
  if (result.length && result.length >= queue.length) {
    return <Navigate to={'/result'} replace={true}></Navigate>
  }
  return (
    <div className="exam">

      <Quiz onChecked={onChecked}></Quiz>
      <div className='exam_btn'>
        {trace > 0 ? <Button className='btn prev' onClick={onPrev}>Prev</Button> : <div></div>}
        <Button className='btn next' onClick={onNext}>Next</Button>
      </div>
    </div>
  )
}
export default ExamPage