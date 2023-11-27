import React from 'react';
import { Card, Col, Row, Badge, Progress, Statistic } from 'antd';
import './score.css'
const ScoreCard = () => {
  // Example data, you can replace these with actual data props or state
  const data = {
    nameExam: 2023,
    totalQuestions: 200,
    correct: 123,
    incorrect: 48,
    skipped: 29,
    score: 625,
    listeningScore: 400,
    listeningCorrect: 77,
    readingScore: 225,
    readingCorrect: 46,
    accuracy: (123 / 200) * 100, // Calculated based on correct answers and total questions
    timeTaken: '1:27:28'
  };

  // Calculate the percentage of correct answers
  const correctPercentage = (data.correct / data.totalQuestions) * 100;
  const incorrectPercentage = (data.incorrect / data.totalQuestions) * 100;
  const skippedPercentage = (data.skipped / data.totalQuestions) * 100;
  const scorePercentage = (data.score / 990) * 100; // Assuming 990 is the max score

  

  return (
    
    
        
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50%' }}>
    
    <Card />
        
      <Card  style={{ width: '80%', maxWidth: '1000px',}}>
       
        <Row gutter={24}>
            
          <Col span={8}>
            <div className="centered-content shadow">
            <Statistic title="Completed" value={data.correct} suffix={`/ ${data.totalQuestions}`} />
            <Progress percent={correctPercentage.toFixed(0)} status="active" />
            <Statistic title="Accuracy" value={`${data.accuracy.toFixed(2)}%`} valueStyle={{ color: '#3f8600' }} />
            <Statistic title="Time Taken" value={data.timeTaken} />
            </div>
          </Col> 


          <Col span={16}>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <div  className='total' style={{display: 'flex', justifyContent: 'center', marginBottom: '10px',}}>
                    <div className='shadow'>
                        <Card>
                        <Badge status="processing" text="Total Score" />
                        <Progress type="circle" percent={scorePercentage.toFixed(0)} style={{marginLeft: '10px'}} />
                        <p>Total Score: {data.score}</p>
                        </Card>
                    </div>
                </div>
              </Col>
            </Row>

          
            

            <div className='detail'>
            <Row gutter={[16, 16]}>
              <Col span={8}>
              <div className='shadow'>
                <Card>
                  <Badge status="success" text="Correct Answers" />
                  <Progress type="circle" percent={correctPercentage.toFixed(0)} />
                  <p>{data.correct} out of {data.totalQuestions} </p>
                </Card>
                </div>
              </Col>


              <Col span={8}>
              <div className='shadow'>
                <Card>
                  <Badge status="error" text="Incorrect Answers" />
                  <Progress type="circle" percent={incorrectPercentage.toFixed(0)} status="exception" />
                  <p>{data.incorrect} out of {data.totalQuestions} </p>
                </Card>
                </div>
              </Col>


              <Col span={8}>
              <div className='shadow'>
                <Card>
                  <Badge status="default" text="Skipped Questions" />
                  <Progress type="circle" percent={skippedPercentage.toFixed(0)} />
                  <p>{data.skipped} out of {data.totalQuestions} </p>
                </Card>
                </div>
              </Col>
            </Row>
            </div>
            


          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default ScoreCard;
