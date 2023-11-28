import { Content, Course, Footer } from "../../components"
import SliderComponent from "../../components/slider/SliderComponent"
import slider1 from "../../assets/slider1.webp"
import slider2 from "../../assets/slider2.webp"
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";


const HomePage = () => {
  const courses = useSelector((state) => state.posts);
  const [currentId, setCurrentId] = useState(null);


  return (
    <div>
      <SliderComponent arrImages={[slider1, slider2]}></SliderComponent>
      <div style={{ marginTop: 60 }}>
        <Content setCurrentId={setCurrentId}></Content>
      </div>
      <div style={{ marginTop: 60 }}>
        <Course></Course>
      </div>
      <Footer></Footer>
    </div>
  )
}
export default HomePage