import React, { useState } from "react";
// import TaskList from "./TaskList";
const TaskForm = ({ addTask }) => {
  console.log("addTask function:", addTask);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert("Please enter both title and description");
      return;
    }
    addTask({ title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h3 className="card-title">Add New Task</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <textarea
              className="form-control"
              placeholder="Task Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
