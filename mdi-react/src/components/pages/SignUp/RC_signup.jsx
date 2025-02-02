import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ApiError, api } from "../../../utils/api";
import ColoredContainers from "../../core/ColoredContainers/Colored-Containers";
import Button from "../../core/Button/Button";
import styles from "../../../styles/forms.module.scss";
import { countriesApi } from "../../../utils/countriesApi";

export default function RC_signup() {
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      birthday: "",
      gender: "",
      country: "",
    },
  });

  const password = watch("password");

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const data = await countriesApi.getCountries();
      setCountries(data);
    } catch (error) {
      console.error("Error fetching countries:", error.message);
      setCountries([]);
    }
  };

  const onSubmit = async (data) => {
    try {
      const { confirmPassword, ...dataToSend } = data;
      dataToSend.birthday = new Date(dataToSend.birthday);

      const response = await api.register(dataToSend);
      if (response) {
        console.log("Signup successful");
        navigate("/login");
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
    <ColoredContainers h2Text="Create your account" h3Text="">
      <div>
        <form
          className={styles["sign-up-form"]}
          onSubmit={handleSubmit(onSubmit)}
        >

          <label>
            Gender:
            <select
              className={`${styles.input} ${errors.gender ? styles.error : ""}`}
              {...register("gender", { required: "Gender is required" })}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <span className={styles.errorText}>{errors.gender.message}</span>
            )}
          </label>

          <label>
            First Name:
            <input
              className={`${styles.input} ${
                errors.firstName ? styles.error : ""
              }`}
              {...register("firstName", {
                required: "First name is required",
                minLength: {
                  value: 2,
                  message: "First name must be at least 2 characters",
                },
              })}
              placeholder="First Name"
            />
            {errors.firstName && (
              <span className={styles.errorText}>
                {errors.firstName.message}
              </span>
            )}
          </label>

          <label>
            Last Name:
            <input
              className={`${styles.input} ${
                errors.lastName ? styles.error : ""
              }`}
              {...register("lastName", {
                required: "Last name is required",
                minLength: {
                  value: 2,
                  message: "Last name must be at least 2 characters",
                },
              })}
              placeholder="Last Name"
            />
            {errors.lastName && (
              <span className={styles.errorText}>
                {errors.lastName.message}
              </span>
            )}
          </label>

          <label>
            Date of Birth:
            <input
              type="date"
              className={`${styles.input} ${
                errors.birthday ? styles.error : ""
              }`}
              {...register("birthday", {
                required: "Date of birth is required",
              })}
            />
            {errors.birthday && (
              <span className={styles.errorText}>
                {errors.birthday.message}
              </span>
            )}
          </label>

          <label>
            Country:
            <select
              className={`${styles.input} ${
                errors.country ? styles.error : ""
              }`}
              {...register("country", { required: "Country is required" })}
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country.Code} value={country.Code}>
                  {country.Country}
                </option>
              ))}
            </select>
            {errors.country && (
              <span className={styles.errorText}>{errors.country.message}</span>
            )}
          </label>

          <label>
            Email:
            <input
              className={`${styles.input} ${errors.email ? styles.error : ""}`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              })}
              placeholder="Email"
            />
            {errors.email && (
              <span className={styles.errorText}>{errors.email.message}</span>
            )}
          </label>

          <label>
            Password:
            <input
              type="password"
              className={`${styles.input} ${
                errors.password ? styles.error : ""
              }`}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[0-9])/,
                  message:
                    "Password must contain at least one uppercase letter and one number",
                },
              })}
              placeholder="Password"
            />
            {errors.password && (
              <span className={styles.errorText}>
                {errors.password.message}
              </span>
            )}
          </label>

          <label>
            Confirm Password:
            <input
              type="password"
              className={`${styles.input} ${
                errors.confirmPassword ? styles.error : ""
              }`}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              placeholder="Confirm Password"
            />
            {errors.confirmPassword && (
              <span className={styles.errorText}>
                {errors.confirmPassword.message}
              </span>
            )}
          </label>

          <Button className={styles["button-input"]} type="submit">
            Sign Up
          </Button>
        </form>
      </div>
    </ColoredContainers>
  );
}
