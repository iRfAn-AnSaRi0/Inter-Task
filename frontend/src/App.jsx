import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Create from "./pages/Create";
import Viewall from "./pages/Viewall";
import View from "./pages/View";
import Edit from "./pages/Edit";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {


  return (
    <>
    <Router>
    <ToastContainer />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/createQuiz" element={<Create />} />
        <Route path="/Viewall" element={<Viewall />} />
        <Route path="/view/:quizId" element={<View />} />
        <Route path="/edit/:quizId" element={<Edit />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
