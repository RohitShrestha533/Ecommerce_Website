import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const navigation = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Reset previous error messages
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setError("");

    // Basic validations
    if (!email) {
      setEmailError("Email is required");
      return;
    }

    if (!password || !confirmPassword) {
      setPasswordError("Password is required");
      setConfirmPasswordError("Confirm Password is required");
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      setConfirmPasswordError("Passwords do not match");
      return;
    }

    // Clear password mismatch errors if fixed
    if (password === confirmPassword) {
      setPasswordError("");
      setConfirmPasswordError("");
    }

    const userData = { email, password, confirmPassword };

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/user/userRegister",
        userData
      );
      const { status, message } = response.data;

      if (status === 200) {
        alert("Login successful");
        navigation("/", { replace: true });
      } else {
        setError(message);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong, please try again."
      );
    } finally {
      setLoading(false);
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
          Welcome Back
        </h2>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <Mail />
              </span>
              <input
                id="email"
                type="email"
                className="form-control"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Email Address"
              />
            </div>
            {emailError && <div className="text-danger">{emailError}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <Lock />
              </span>
              <input
                id="password"
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-label="Password"
              />
            </div>
            {passwordError && (
              <div className="text-danger">{passwordError}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="confirmpassword" className="form-label">
              Confirm Password
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <Lock />
              </span>
              <input
                id="confirmpassword"
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                aria-label="Confirm Password"
              />
            </div>
            {confirmPasswordError && (
              <div className="text-danger">{confirmPasswordError}</div>
            )}
          </div>

          <div className="mb-3 d-flex justify-content-between">
            <Link
              to="/forgot-password"
              className="text-decoration-none text-success"
            >
              Forgot password?
            </Link>
          </div>

          {error && <p className="text-danger mb-2">{error}</p>}

          <button
            type="submit"
            className="btn btn-success w-100 py-2"
            disabled={loading}
          >
            {loading ? (
              <Loader className="w-6 h-6 mx-auto animate-spin" />
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-muted">
            Don't have an account?{" "}
            <Link to="/signup" className="text-success text-decoration-none">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginPage;
