import React, { useState } from "react";

const TaskForm = ({ addTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert("Please enter both title and description");
      return;
    }

    if (!file) {
      alert("Please select a file to upload");
      return;
    }

    const userdata = parseInt(localStorage.getItem("id"));
    if (userdata) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("userdata", userdata);
      formData.append("uploadfile", file);

      addTask(formData);
    } else {
      alert("User not logged in");
      return;
    }

    setTitle("");
    setDescription("");
    setFile(null);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
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
          <div className="mb-3">
            <input
              type="file"
              className="form-control"
              onChange={handleFileChange}
            />
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
