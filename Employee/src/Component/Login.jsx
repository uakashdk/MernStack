import React, { useState } from 'react';
import './login.css';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { handleError, handleSuccess } from '../utils';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    // Correcting from setSignupInfo to setLoginInfo
    setLoginInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    if (!email || !password) {
      return handleError("All fields are required");
    }

    try {
      const url = "http://localhost:8080/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });

      const result = await response.json();
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate('/'); // Consider navigating to a different page on success, like '/dashboard'
        }, 1000);
      } else if (error) {
        const details = error?.details?.[0]?.message || "An error occurred";
        handleError(details);
      } else {
        handleError(message);
      }
    } catch (err) {
      handleError(err.message || "An error occurred");
    }
  };

  return (
    <div className='registerPage'>
      <form onSubmit={handleSubmit}>
        <div className="email-section">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder='Enter Your Email'
            onChange={handleChange}
            value={loginInfo.email}
          />
        </div>
        <div className="password-section">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder='Enter your password'
            onChange={handleChange}
            value={loginInfo.password}
          />
        </div>
        <div className="button-section">
          <button type="submit">Login</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
