import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskList from "./components/TaskList";
// import TaskForm from "./components/TaskForm";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  return (
    <div className="container">
      <h1>Task Management App</h1>
      
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <TaskList tasks={tasks} />
      )}
    </div>
  );
};

export default App;
