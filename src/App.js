import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskList from "./components/TaskList";
import 'bootstrap/dist/css/bootstrap.min.css';
import loadingGif from './components/loading-gif.gif'; // Make sure to replace this with the actual path to your loading GIF

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [seconds, setSeconds] = useState(0);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://taskmanagerapi-jxf0.onrender.com/api/tasks");
      setTasks(response.data);
    } catch (err) {
      setError("Failed to load tasks");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    let timer;
    if (loading) {
      timer = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
    } else {
      clearInterval(timer);
      setSeconds(0); // Reset timer when loading is done
    }
    return () => clearInterval(timer);
  }, [loading]);

  return (
    <div className="container">
      <h1>Task Management App</h1>
      
      {loading ? (
        <div className="text-center">
          <img src={loadingGif} alt="Loading..." />
          <p>Loading, The API is hosted over a free tier, you may face 1 min of loading time after a period of inactivity.</p>
          <p>Elapsed time: {seconds} seconds</p>
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <TaskList tasks={tasks} />
      )}
    </div>
  );
};

export default App;
