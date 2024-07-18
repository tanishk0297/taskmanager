import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";

const TaskList = () => {
  // State to store the list of tasks
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from the API when the component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  // Function to fetch tasks from the backend API
  const fetchTasks = async () => {
    try {
      const response = await axios.get("https://taskmanagerapi-jxf0.onrender.com/api/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Function to add a new task to the list
  const addTask = async (newTask) => {
    try {
      const response = await axios.post("https://taskmanagerapi-jxf0.onrender.com/api/tasks", newTask);
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error("Error adding task:", error);
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

  return (
    <div>
      {/* Form to add new tasks */}
      <TaskForm addTask={addTask} />
      {/* Title for the task list */}
      <h2>Task List</h2>
      
      {/* Display sorted tasks */}
      {sortTasksByPriority(tasks).map((task) => (
        <TaskItem key={task.id} task={task} fetchTasks={fetchTasks} />
      ))}
      
    </div>
  );
};

export default TaskList;
