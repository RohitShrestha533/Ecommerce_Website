import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { setAuthState } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlelogin = async (e) => {
    e.preventDefault();
    setError("");

    // Validate if password and confirm password match
    if (formData.password === "" || formData.confirmPassword === "") {
      setError("Please enter email and password.");
      return;
    }

    const adminData = formData;

    try {
      const response = await axios.post(
        "http://localhost:5000/admin/adminLogin",
        adminData
      );
      const { status, message, token } = response.data;

      if (status === 200) {
        localStorage.setItem("admintoken", token);
        alert("Login successful");
        setAuthState({ token });
        navigate("/Dashboard");
      } else {
        setError(message);
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Something went wrong, please try again."
      );
    }
  };

  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#e7e3ed",
      }}
    >
      <div
        className="card shadow-lg p-4 mb-5 bg-white rounded"
        style={{ width: "400px" }}
      >
        <h2 className="text-center mb-4">Admin Login</h2>
        <form onSubmit={handlelogin}>
          {error && <div className="alert alert-danger">{error}</div>}

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
