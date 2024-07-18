import React, { useState } from "react";
import axios from "axios";

const TaskItem = ({ task, fetchTasks }) => {
  const [loading, setLoading] = useState(false);

  const updateStatus = async (status) => {
    setLoading(true);
    try {
      await axios.put(`https://taskmanagerapi-jxf0.onrender.com/api/tasks/${task.id}`, { status });
      fetchTasks();
    } catch (error) {
      console.error("Error updating task status:", error);
      
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async () => {
    setLoading(true);
    try {
      await axios.delete(`https://taskmanagerapi-jxf0.onrender.com/api/tasks/${task.id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{task.title}</h5>
        <p className="card-text">{task.description}</p>
        <p className="card-text">
          <strong>Status:</strong> {task.status}
        </p>
        <button
          className="btn btn-info me-2"
          onClick={() => updateStatus("in_progress")}
          disabled={loading}
        >
          {loading ? "Updating..." : "Mark as In Progress"}
        </button>
        <button
          className="btn btn-success me-2"
          onClick={() => updateStatus("done")}
          disabled={loading}
        >
          {loading ? "Updating..." : "Mark as Done"}
        </button>
        <button
          className="btn btn-danger"
          onClick={deleteTask}
          disabled={loading}
        >
          {loading ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
