// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   Button,
//   Form,
//   Container,
//   Row,
//   Col,
//   Alert,
//   Spinner,
// } from "react-bootstrap";

// const ForgotPasswordPage = () => {
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [password, setPassword] = useState("");
//   const [isOtpSent, setIsOtpSent] = useState(false);
//   const [isOtpVerified, setIsOtpVerified] = useState(false);
//   const [message, setMessage] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [otpError, setOtpError] = useState("");
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSendOtp = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/forgot-password",
//         { email }
//       );
//       if (response.data) {
//         setIsOtpSent(true);
//         setMessage("OTP sent to your email");
//         setError("");
//       }
//     } catch (error) {
//       setError("Error sending OTP");
//       setMessage("");
//     }
//     setIsLoading(false);
//   };

//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       const response = await axios.post("http://localhost:5000/verify-otp", {
//         email,
//         otp,
//       });
//       setMessage(response.data.message);
//       setError("");
//       setIsOtpVerified(true);
//     } catch (error) {
//       setError("Invalid OTP");
//       setMessage("");
//     }
//     setIsLoading(false);
//   };

//   const handleChangePassword = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/admin/change-password",
//         {
//           email,
//           newPassword,
//         }
//       );
//       if (response.data) {
//         navigate("/navs");
//       }
//     } catch (error) {
//       setError("Error changing password");
//       setMessage("");
//     }
//     setIsLoading(false);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="d-flex justify-content-center align-items-center min-vh-100"
//     >
//       <div className="card shadow-lg p-4 w-100" style={{ maxWidth: "450px" }}>
//         <h2
//           className="text-center mb-4 text-gradient"
//           style={{
//             background: "linear-gradient(to right, #38a169, #2e8b57)",
//             WebkitBackgroundClip: "text",
//             color: "transparent",
//           }}
//         >
//           Welcome Back
//         </h2>
//          {message && <Alert variant="success">{message}</Alert>}
//             {error && <Alert variant="danger">{error}</Alert>}

//             <Form
//               onSubmit={
//                 isOtpVerified
//                   ? handleChangePassword
//                   : isOtpSent
//                   ? handleVerifyOtp
//                   : handleSendOtp
//               }
//             >
//               {/* Email Field */}
//               <div className="mb-3">
//             <label htmlFor="email" className="form-label">
//               Email Address
//             </label>
//             <div className="input-group">
//               <span className="input-group-text">
//                 <Mail />
//               </span>
//               <input
//                 id="email"
//                 type="email"
//                 className="form-control"
//                 placeholder="Email Address"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 aria-label="Email Address"
//               />
//             </div>
//             {emailError && <div className="text-danger">{emailError}</div>}
//           </div>

//               {/* Send OTP Button */}
//               {!isOtpSent && !isOtpVerified && (
//                 <Button
//                   variant="primary"
//                   type="submit"
//                   className="w-100"
//                   disabled={isLoading}
//                 >
//                   {isLoading ? (
//                     <Spinner animation="border" size="sm" />
//                   ) : (
//                     "Send OTP"
//                   )}
//                 </Button>
//               )}

//               {/* OTP Verification */}
//               {isOtpSent && !isOtpVerified && (
//                 <div>
//                   <div className="mb-3">
//             <label htmlFor="otp" className="form-label">
//               OTP Code
//             </label>
//             <div className="input-group">
//               <span className="input-group-text">
//                 <KeyRound />
//               </span>
//               <input
//                 id="otp"
//                 type="otp"
//                 className="form-control"
//                 placeholder="Enter OTP Code"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//                 required
//                 aria-label="OTP Code"
//               />
//             </div>
//             {otpError && <div className="text-danger">{otpError}</div>}

//                   <Button
//                     variant="primary"
//                     type="submit"
//                     className="w-100"
//                     disabled={isLoading}
//                   >
//                     {isLoading ? (
//                       <Spinner animation="border" size="sm" />
//                     ) : (
//                       "Verify OTP"
//                     )}
//                   </Button>
//                   </div>
//                 </>
//               )}

//               {/* New Password */}
//               {isOtpVerified && (
//                 <>
//                 <div>
//                 <div className="mb-3">
//             <label htmlFor="password" className="form-label">
//               Password
//             </label>
//             <div className="input-group">
//               <span className="input-group-text">
//                 <Lock />
//               </span>
//               <input
//                 id="password"
//                 type="password"
//                 className="form-control"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 aria-label="Password"
//               />
//             </div>
//             {passwordError && (
//               <div className="text-danger">{passwordError}</div>
//             )}
//           </div>
//                   <Button
//                     variant="primary"
//                     type="submit"
//                     className="w-100"
//                     disabled={isLoading}
//                   >
//                     {isLoading ? (
//                       <Spinner animation="border" size="sm" />
//                     ) : (
//                       "Change Password"
//                     )}
//                   </Button>
//                   </div>
//                 </>
//               )}
//             </Form>
//           </div>
//           </div>
//     </motion.div>
//   );
// };

// export default ForgotPasswordPage;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Form, Container, Alert, Spinner } from "react-bootstrap";
// import { Mail, Key as KeyRound, Lock } from "react-icons";

import { Mail, Lock, KeyRound } from "lucide-react";
const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/forgot-password",
        { email }
      );
      if (response.data) {
        setIsOtpSent(true);
        setMessage("OTP sent to your email");
        setError("");
      }
    } catch (error) {
      setError("Error sending OTP");
      setMessage("");
    }
    setIsLoading(false);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/verify-otp", {
        email,
        otp,
      });
      setMessage(response.data.message);
      setError("");
      setIsOtpVerified(true);
    } catch (error) {
      setError("Invalid OTP");
      setMessage("");
    }
    setIsLoading(false);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/user/change-password",
        {
          email,
          newPassword: password,
        }
      );
      if (response.data) {
        alert("successfully Forget Password");
        navigate("/");
      }
    } catch (error) {
      setError("Error changing password");
      setMessage("");
    }
    setIsLoading(false);
  };

  return (
    <Container
      fluid
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
          Forgot Password
        </h2>

        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        <Form
          onSubmit={
            isOtpVerified
              ? handleChangePassword
              : isOtpSent
              ? handleVerifyOtp
              : handleSendOtp
          }
        >
          {/* Email Field */}
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

          {/* Send OTP Button */}
          {!isOtpSent && !isOtpVerified && (
            <Button
              variant="primary"
              type="submit"
              className="w-100"
              disabled={isLoading}
            >
              {isLoading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                "Send OTP"
              )}
            </Button>
          )}

          {/* OTP Verification */}
          {isOtpSent && !isOtpVerified && (
            <>
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

              <Button
                variant="primary"
                type="submit"
                className="w-100"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "Verify OTP"
                )}
              </Button>
            </>
          )}

          {/* New Password */}
          {isOtpVerified && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>New Password</Form.Label>
                <div className="input-group">
                  <span className="input-group-text">
                    <Lock />
                  </span>
                  <Form.Control
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="w-100"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "Change Password"
                )}
              </Button>
            </>
          )}
        </Form>
      </div>
    </Container>
  );
};

export default ForgotPasswordPage;
