import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ApiError } from '../utils/api';
import ColoredContainers from "./Colored-Containers";
import { api } from "../utils/api";
import Button from "./Button";
import styles from "./Colored-Containers.module.scss";
import { countriesApi } from "../utils/countriesApi";

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
    country: ""
  });
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    console.log('Countries state updated:', countries);
  }, [countries]);

  const fetchCountries = async () => {
    try {
      console.log('Fetching countries...');
      const data = await countriesApi.getCountries();
      console.log('Raw countries response:', data);
      setCountries(data);
    } catch (error) {
      console.error("Error fetching countries:", error.message);
      setCountries([]); // Set empty array on error
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCountryChange = (e) => {
    setFormData(prevData => ({
      ...prevData,
      country: e.target.value
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

      console.log("Data being sent:", dataToSend);

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
      <ColoredContainers h2Text="Create your account" h3Text="">
        <div>
          <form className={styles["sign-up-form"]} onSubmit={handleSubmit}>
            <label>
              Salutation:
              <select
                className={styles["input"]}
                name="salutation"
                value={formData.salutation}
                onChange={handleChange}
              >
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
              <select
                className={styles["input"]}
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </label>
            <label>
              First Name:
              <input
                className={styles["input"]}
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
                className={styles["input"]}
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
                className={styles["input"]}
                type="date"
                name="birthday"
                value={formData.birthday}
                onChange={handleChange}
                placeholder="Date of Birth"
              />
              <label>
                Country:
                <select
                  className={styles["input"]}
                  name="country"
                  value={formData.country}
                  onChange={handleCountryChange}
                >
                  <option value="">Select Country</option>
                  {countries.map((country) => (
                    <option key={country.Code} value={country.Code}>
                      {country.Country}
                    </option>
                  ))}
                </select>
              </label>

              Email:
              <input
                className={styles["input"]}
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
                className={styles["input"]}
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
                className={styles["input"]}
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
              />
            </label>
            <Button className={styles["button-input"]} type="submit">
              Sign Up
            </Button>
          </form>
        </div>
      </ColoredContainers>
    </>
  );
}
