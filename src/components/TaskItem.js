import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const DeleteConfirm = ({ showModal, handleClose, handleDelete }) => {
  return (
    <div
      className={`modal ${showModal ? "show" : ""}`}
      style={{ display: showModal ? "block" : "none" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirm Delete</h5>
            <button type="button" className="btn-close" onClick={handleClose} />
          </div>
          <div className="modal-body">Are you sure you want to delete this task?</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const TaskItem = ({ task, fetchTasks, downloadUrl }) => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const updateStatus = async (status) => {
    setLoading(true);
    try {
      await axios.put(
        `https://taskmanagerapi-jxf0.onrender.com/api/tasks/${task.id}`,
        { status }
      );
      fetchTasks();
      toast.success(`Task marked as ${status} successfully!`);
    } catch (error) {
      console.error("Error updating task status:", error);
      toast.error("Error updating task status!");
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async () => {
    setLoading(true);
    try {
      await axios.delete(
        `https://taskmanagerapi-jxf0.onrender.com/api/tasks/${task.id}`
      );
      fetchTasks();
      toast.success("Task deleted successfully!");
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Error deleting task!");
    } finally {
      setLoading(false);
    }
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDelete = async () => {
    await deleteTask();
    setShowModal(false);
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h4 className="card-title">{task.title}</h4>
        <p className="card-text">{task.description}</p>
        <p className="card-text">
          <strong>Status:</strong> {task.status}
        </p>
        <a href={downloadUrl} download>
          <button className="btn btn-primary">Download File</button>
        </a>
        <button
          className="btn btn-info ms-2"
          onClick={() => updateStatus("in_progress")}
          disabled={loading}
        >
          {loading ? "Updating..." : "Mark as In Progress"}
        </button>
        <button
          className="btn btn-success ms-2"
          onClick={() => updateStatus("done")}
          disabled={loading}
        >
          {loading ? "Updating..." : "Mark as Done"}
        </button>
        <button
          className="btn btn-danger ms-2"
          onClick={handleShowModal}
          disabled={loading}
        >
          {loading ? "Deleting..." : "Delete"}
        </button>
        <DeleteConfirm
          showModal={showModal}
          handleClose={handleCloseModal}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default TaskItem;