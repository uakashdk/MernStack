import React, { useState } from "react";// Add your CSS file
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './employeeEdit.css'

const EmployeeEdit = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNo: "",
    designation: "",
    gender: "",
    courses: {
      webDevelopment: false,
      dataScience: false,
      appDevelopment: false
    },
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === "checkbox") {
      setFormData((prevState) => ({
        ...prevState,
        courses: { ...prevState.courses, [name]: checked },
      }));
    } else if (type === "file") {
      setFormData((prevState) => ({
        ...prevState,
        image: e.target.files[0],
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("mobileNo", formData.mobileNo);
    formDataToSend.append("designation", formData.designation);
    formDataToSend.append("gender", formData.gender);
    formDataToSend.append("courses", JSON.stringify(formData.courses));
    formDataToSend.append("image", formData.image);

    try {
      const response = await fetch("http://localhost:8080/submit", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      toast.error("An error occurred");
    }
  };

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="form">
        <div className="name-section">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
            className="inputworld"
            id="name"
          />
        </div>

        <div className="email-section">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            className="inputworld"
          />
        </div>

        <div className="mobile-section">
          <label>Mobile No:</label>
          <input
            type="tel"
            name="mobileNo"
            value={formData.mobileNo}
            onChange={handleChange}
            placeholder="Enter your mobile number"
            required
            className="inputworld"
          />
        </div>

        <div className="designation-section">
          <label>Designation:</label>
          <select
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="developer">Developer</option>
            <option value="designer">Designer</option>
            <option value="manager">Manager</option>
          </select>
        </div>

        <div className="genderSection">
          <label>Gender:</label>
          <input
            type="radio"
            name="gender"
            value="male"
            checked={formData.gender === "male"}
            onChange={handleChange}
            required
          /> Male
          <input
            type="radio"
            name="gender"
            value="female"
            checked={formData.gender === "female"}
            onChange={handleChange}
            required
          /> Female
        </div>

        <div className="course-section">
          <label>Courses:</label>
          <input
            type="checkbox"
            name="webDevelopment"
            checked={formData.courses.webDevelopment}
            onChange={handleChange}
          /> Web Development
          <input
            type="checkbox"
            name="dataScience"
            checked={formData.courses.dataScience}
            onChange={handleChange}
          /> Data Science
          <input
            type="checkbox"
            name="appDevelopment"
            checked={formData.courses.appDevelopment}
            onChange={handleChange}
          /> App Development
        </div>

        <div className="image-section">
          <label>Upload Image:</label>
          <input
            type="file"
            name="image"
            accept=".jpg,.png"
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EmployeeEdit;
