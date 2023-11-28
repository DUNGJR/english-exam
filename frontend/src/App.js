import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components";
import "./App.css";
import "./index.css";
import { routes } from "./routes";
import { getCourse } from "./actions/posts.js";

import { useDispatch, useSelector } from "react-redux";

const App = () => {
  // const courses = useSelector((state) => state.posts);
  // console.log(course);
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCourse());
  }, [currentId, dispatch]);

  return (
    <div className="App">
      <Navbar></Navbar>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page;
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <Page currentId={currentId} setCurrentId={setCurrentId} />
                }
              ></Route>
            );
          })}
        </Routes>
      </Router>
    </div>
  );
};
export default App;
