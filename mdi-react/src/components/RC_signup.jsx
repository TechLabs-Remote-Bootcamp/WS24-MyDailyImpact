import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ColoredContainers from "./Colored-Containers";
import { ApiError, api } from "../utils/api";
import Button from "./Button";
import form from "../styles/forms.module.scss";

export default function RC_signup() {
  const navigate = useNavigate();
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
      console.error("Passwords do not match");
      return;
    }

    try {
      const { confirmPassword, ...dataToSend } = formData;
      dataToSend.birthday = new Date(dataToSend.birthday);

      console.log("Data being sent:", dataToSend); // Add this line

      const response = await api.register(dataToSend);
      if (response) {
        console.log("Signup successful");
        navigate("/login");
      } else {
        console.error("Signup failed");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error instanceof ApiError) {
        console.error("API Error Status:", error.status);
        console.error("API Error Message:", error.message);
      }
    }
  };

  return (
    <>
      <ColoredContainers h2Text="Create your account">
        <div>
          <form className={form["sign-up-form"]} onSubmit={handleSubmit}>
            <label>
              Salutation:
              <select
                className={form.input}
                name="salutation"
                value={formData.salutation}
                onChange={handleChange}
              >
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
              </select>
            </label>
            <label>
              Gender:
              <select
                className={form.input}
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="diverse">Diverse</option>
              </select>
            </label>
            <label>
              First Name:
              <input
                className={form.input}
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
              />
            </label>
            <label>
              Last Name:
              <input
                className={form.input}
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
              />
            </label>
            <label>
              Date of Birth:
              <input
                className={form.input}
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
              <input
                className={form.input}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
              />
            </label>
            <label>
              Password:
              <input
                className={form.input}
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
              />
            </label>
            <label>
              Confirm Password:
              <input
                className={form.input}
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
              />
            </label>
            <Button className={form["button-input"]} type="submit">
              Sign Up
            </Button>
          </form>
        </div>
      </ColoredContainers>
    </>
  );
}
