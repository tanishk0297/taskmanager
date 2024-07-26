import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskList from "./components/TaskList";
import SignupPage from "./components/SignupPage";
import LoginPage from "./components/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import loadingGif from './components/loading-gif.gif'; // Make sure to replace this with the actual path to your loading GIF

const App = () => {
 

 
  return (

    
    <div className="container">
      <h1>Task Management App</h1>
      
        <BrowserRouter>
        <Routes>
          
          
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/task" element={<TaskList />} />
            <Route path="*" element={<LoginPage />} />
          
        </Routes>
      </BrowserRouter>
      
    </div>
  );
};

export default App;
