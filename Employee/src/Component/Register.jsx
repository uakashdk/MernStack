import React, { useState } from 'react';
import './register.css';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { handleError, handleSuccess } from '../utils';
import {useNavigate} from "react-router-dom"

const Register = () => {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setSignupInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;

    if (!name || !email || !password) {
        return handleError("All fields are required");
    }

    try {
        const url = "http://localhost:8080/auth/signup";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(signupInfo)
        });

        const result = await response.json();
        const { success, message, error } = result;

        if (success) {
            handleSuccess(message);
            setTimeout(() => {
                navigate('/login');
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
        <div className="name-section">
          <label>Full Name:</label>
          <input
            type="text"
            name="name" // Add name attribute
            placeholder='Enter your Name'
            onChange={handleChange}
            value={signupInfo.name}
          />
        </div>
        <div className="email-section">
          <label>Email:</label>
          <input
            type="email"
            name="email" // Add name attribute
            placeholder='Enter Your Email'
            onChange={handleChange}
            value={signupInfo.email}
          />
        </div>
        <div className="password-section">
          <label>Password:</label>
          <input
            type="password"
            name="password" // Add name attribute
            placeholder='Create your password'
            onChange={handleChange}
            value={signupInfo.password}
          />
        </div>
        <div className="button-section">
          <button type="submit">Register</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Register;
