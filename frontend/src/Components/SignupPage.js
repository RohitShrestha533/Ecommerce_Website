import { motion } from "framer-motion";
import { Loader, Lock, Mail, ContactRound, KeyRound } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

const BASE_URL = "http://localhost:5000";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const resetError = () => setError("");
  const resetForm = () => {
    setOtp("");
    setIsOtpSent(false);
    setError("");
    setMessage("");
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const validateInputs = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return false;
    }
    if (!emailPattern.test(email)) {
      setError("Enter a valid email address.");
      return false;
    }
    console.log(password, confirmPassword);
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return false;
    }
    return true;
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    resetError();
    setIsLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/forgot-password`, {
        email,
      });
      if (response.data) {
        setIsOtpSent(true);
        setMessage("OTP sent to your email.");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Error sending OTP.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtpAndRegister = async (e) => {
    e.preventDefault();
    if (!otp) {
      setError("OTP is required.");
      return;
    }

    setError("");
    setMessage("");
    setIsLoading(true);

    try {
      const otpResponse = await axios.post(`${BASE_URL}/verify-otp`, {
        email: email,
        otp,
      });

      if (otpResponse.data) {
        const registerResponse = await axios.post(
          `${BASE_URL}/user/userRegister`,
          { name, email, password }
        );

        if (
          registerResponse.data.status === 400 ||
          registerResponse.data.status === 500 ||
          registerResponse.data.status === "error"
        ) {
          // Reset the form and notify the user about the issue
          resetForm();
          setError(
            registerResponse.data.message ||
              "Registration failed. Please try again."
          );
        } else if (registerResponse.data.status === "ok") {
          alert("Sign-up successful!");
          navigate("/login", { replace: true });
        } else {
          resetForm();
          navigate("/login", { replace: true });
          setError(
            registerResponse.data.message || "Unexpected error occurred."
          );
        }
      }
    } catch (error) {
      if (error.response?.data?.message === "user already exist") {
        navigate("/login", { replace: true });
      }
      setError(error.response?.data?.message || "Invalid OTP.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="d-flex justify-content-center align-items-center min-vh-100"
    >
      <div className="card shadow-lg p-4 w-100" style={{ maxWidth: "450px" }}>
        <h2
          className="text-center mb-4 text-gradient"
          style={{
            background: "linear-gradient(to right, #38a169, #2e8b57)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Create Account
        </h2>
        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={isOtpSent ? handleVerifyOtpAndRegister : handleSendOtp}>
          {!isOtpSent && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <div className="input-group">
                  <span className="input-group-text">
                    <ContactRound />
                  </span>
                  <Form.Control
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <div className="input-group">
                  <span className="input-group-text">
                    <Mail />
                  </span>
                  <Form.Control
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <div className="input-group">
                  <span className="input-group-text">
                    <Lock />
                  </span>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <div className="input-group">
                  <span className="input-group-text">
                    <Lock />
                  </span>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </Form.Group>
            </>
          )}
          {isOtpSent && (
            <Form.Group className="mb-3">
              <Form.Label>OTP Code</Form.Label>
              <div className="input-group">
                <span className="input-group-text">
                  <KeyRound />
                </span>
                <Form.Control
                  type="text"
                  placeholder="Enter OTP Code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>
            </Form.Group>
          )}
          <Button
            variant="success"
            className="mt-4 w-100"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className="animate-spin mx-auto" size={24} />
            ) : isOtpSent ? (
              "Register"
            ) : (
              "Send OTP"
            )}
          </Button>
        </Form>
        <div className="mt-4 text-center">
          <p className="text-muted">
            Already have an account?{" "}
            <Link to="/login" className="text-success text-decoration-none">
              Login
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default SignupPage;
