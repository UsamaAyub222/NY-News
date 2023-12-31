import "./App.css";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import News from "./components/News";
import LoadingBar from "react-top-loading-bar";
import Login from "./components/Login";
import Register from "./components/Register";

const App = () => {
  const [progress, setprogress] = useState(0);
  const [localStorage, setLocalStorage] = useState(" ");

  const setProgress = (progress) => {
    setprogress(progress);
  };
  const getStorage = (storage) => {
    setLocalStorage(storage);
  };

  useEffect(() => {}, [localStorage]);

  return (
    <>
      <Router>
        {localStorage === undefined || localStorage === " " ? (
          ""
        ) : (
          <Navbar getStorage={getStorage} />
        )}
        <LoadingBar height={3} color="#f11946" progress={progress} />
        <Routes>
          <Route
            exact
            path="/news"
            element={
              <ProtectedRoutes>
                <News
                  setProgress={setProgress}
                  key="entertainment"
                  pageSize={9}
                  category=""
                />
              </ProtectedRoutes>
            }
          />
          <Route exact path="/" element={<Login getStorage={getStorage} />} />
          <Route exact path="/signup" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
};

export function ProtectedRoutes(props) {
  if (localStorage.getItem("Authorization")) {
    return props.children;
  } else {
    return <Navigate to="/" />;
  }
}

export default App;
