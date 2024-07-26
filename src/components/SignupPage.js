import React, { useState } from "react";
import axios from "axios";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://taskmanagerapi-jxf0.onrender.com/api/signup", {
        username,
        password,
      });
      console.log(response.data);
      // Redirect to login page
      window.location.href = "/login";
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className="container">
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
       
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Signup
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button className="btn btn-secondary" onClick={() => window.location.href = "/login"}>
          Already have an account? Login
        </button>
      </form>
    </div>
  );
};

export default SignupPage;