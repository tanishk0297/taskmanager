import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";
import { toast } from "react-hot-toast";

const TaskList = () => {
  // State to store the list of tasks
  const [tasks, setTasks] = useState([]);
  // State to store the current user
  const [username, setUser] = useState();

  // Fetch tasks from the API when the component mounts
  useEffect(() => {
    fetchTasks();
    fetchUserFromLocalStorage();
  }, []);

  // Function to fetch tasks from the backend API
  const fetchTasks = async () => {
    try {
      const userdata = localStorage.getItem("id");
      const response = await axios.get("https://taskmanagerapi-jxf0.onrender.com/api/tasks/" + userdata);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Error fetching tasks!");
    }
  };

  // Function to fetch the current user from local storage
  const fetchUserFromLocalStorage = () => {
    const userData = localStorage.getItem("username");
    if (userData) {
      setUser(userData);
    }
  };

  // Function to add a new task to the list
  const addTask = async (newTask) => {
    try {
      const response = await axios.post("https://taskmanagerapi-jxf0.onrender.com/api/tasks/", newTask);
      setTasks([...tasks, response.data]);
      toast.success("New task added successfully!");
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("Error adding task!");
    }
  };

  // Function to sort tasks based on status priority
  const sortTasksByPriority = (tasks) => {
    const statusPriority = {
      todo: 1,
      in_progress: 2,
      done: 3,
    };
    return tasks.sort((a, b) => statusPriority[a.status] - statusPriority[b.status]);
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="task-list-container">
      <h2 className="welcome-message">Welcome, {username}!</h2>
      <button className="btn btn-secondary" onClick={handleLogout}>
        Logout
      </button>
      <TaskForm addTask={addTask} />
      <h2 className="task-list-title">Task List</h2>
      <div className="task-items">
        {sortTasksByPriority(tasks).map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            fetchTasks={fetchTasks}
            downloadUrl={`https://taskmanagerapi-jxf0.onrender.com/uploads/${task.filename}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;