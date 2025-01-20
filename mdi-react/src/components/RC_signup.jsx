import React, { useState } from "react";
import ColoredContainers from "./Colored-Containers";
import "../styles/rc_general.scss";
import "./Colored-Containers.scss";
import { api } from "../utils/api";

export default function RC_signup() {
  const [formData, setFormData] = useState({
    salutation: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthday: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }
    
    try {
      const { confirmPassword, ...dataToSend } = formData;
      dataToSend.birthday = new Date(dataToSend.birthday);

      console.log('Data being sent:', dataToSend); // Add this line

      
      const response = await api.register(dataToSend);
      if (response) {
        console.log('Signup successful');
      } else {
        console.error('Signup failed');
      }
    } catch (error) {
      console.error('Error:', error);
      if (error instanceof ApiError) {
        console.error('API Error Status:', error.status);
        console.error('API Error Message:', error.message);
      }
    }
  };

  return (
    <div className="login-container">
      <ColoredContainers h2Text="Create your account" h3Text="">
        <div className="sign-up-form">
          <form className="form sign-up" onSubmit={handleSubmit}>
            <label>
              Salutation:
              <select className="input" name="salutation" value={formData.salutation} onChange={handleChange}>
                <option value="">Salutation</option>
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Ms">Ms</option>
                <option value="Dr">Dr</option>
                <option value="Not Specified">Not Specified</option>
              </select>
            </label>
            <label>
              Gender:
              <select className="input" name="gender" value={formData.gender} onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </label>
            <label>
              First Name:
              <input className="input" type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" />
            </label>
            <label>
              Last Name:
              <input className="input" type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" />
            </label>
            <label>
              Date of Birth:
              <input
                className="input"
                type="date"
                name="birthday"
                value={formData.birthday}
                onChange={handleChange}
                placeholder="Date of Birth"
              />
            </label>
            {/* <label>
              Country:
              <select className="input" name="country" value={formData.country} onChange={handleChange}>
                <option value="">Select Country</option>
                <option value="Country">Country Name</option>
                <option value="Other">Other</option>
              </select>
            </label> */}
            <label>
              Email:
              <input className="input" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
            </label>
            <label>
              Password:
              <input className="input" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
            </label>
            <label>
              Confirm Password:
              <input
                className="input"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
              />
            </label>
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </ColoredContainers>
    </div>
  );
}
