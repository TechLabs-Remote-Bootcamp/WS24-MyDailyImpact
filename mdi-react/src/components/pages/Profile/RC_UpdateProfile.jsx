"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { api } from "../../../utils/api";
import ColoredContainers from "../../core/ColoredContainers/Colored-Containers";
import Button from "../../core/Button/Button";
import styles from "../../../styles/forms.module.scss";
import form from "../../../styles/forms.module.scss";
import { countriesApi } from "../../../utils/countriesApi";

export default function RC_UpdateProfile({ onUpdateComplete }) {
  const [countries, setCountries] = useState([]);
  const [updateError, setUpdateError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [originalData, setOriginalData] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    fetchCountries();
    fetchUserProfile();
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

  const fetchUserProfile = async () => {
    try {
      const userProfile = await api.getCurrentUser();
      setOriginalData(userProfile);
      Object.keys(userProfile).forEach((key) => {
        if (key === "birthday") {
          setValue(key, new Date(userProfile[key]).toISOString().split("T")[0]);
        } else {
          setValue(key, userProfile[key]);
        }
      });
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setUpdateError("Failed to load user profile. Please try again.");
    }
  };

  const onSubmit = async (data) => {
    try {
      setUpdateError(null);
      setUpdateSuccess(false);

      // Only include fields that have changed
      const changedData = Object.keys(data).reduce((acc, key) => {
        if (data[key] !== "" && data[key] !== originalData[key]) {
          if (key === "birthday") {
            acc[key] = new Date(data[key]);
          } else {
            acc[key] = data[key];
          }
        }
        return acc;
      }, {});

      console.log("Submitting changed data:", changedData);

      if (Object.keys(changedData).length === 0) {
        setUpdateSuccess(true);
        return;
      }

      const response = await api.updateProfile(changedData);
      console.log("Update response:", response);

      if (response) {
        console.log("Profile update successful");
        setUpdateSuccess(true);
        onUpdateComplete();
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setUpdateError(`Failed to update profile: ${error.message}`);
    }
  };

  return (
    <ColoredContainers h2Text="Update your profile" h3Text="">
      <form className={form["formpage-grid"]} onSubmit={handleSubmit(onSubmit)}>
        <section className={form.formSection}>
          <div className={form.inputSection}>
            <label className={form.label}>First Name:</label>
            <input
              className={`${form.input} ${
                errors.firstName ? styles.error : ""
              }`}
              {...register("firstName", {
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
          </div>
          <div className={form.inputSection}>
            <label className={form.label}>Last Name:</label>
            <input
              className={`${form.input} ${errors.lastName ? styles.error : ""}`}
              {...register("lastName", {
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
          </div>
          <div className={form.inputSection}>
            <label className={form.label}>Date of Birth:</label>
            <input
              type="date"
              className={`${form.input} ${errors.birthday ? styles.error : ""}`}
              {...register("birthday")}
            />
            {errors.birthday && (
              <span className={styles.errorText}>
                {errors.birthday.message}
              </span>
            )}
          </div>
          <div className={form.inputSection}>
            <label className={form.label}>Gender:</label>
            <select
              className={`${form.input} ${errors.gender ? styles.error : ""}`}
              {...register("gender")}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <span className={styles.errorText}>{errors.gender.message}</span>
            )}
          </div>
          <div className={form.inputSection}>
            <label className={form.label}>Country:</label>
            <select
              className={`${styles.input} ${
                errors.country ? styles.error : ""
              }`}
              {...register("country")}
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
          </div>
          <div className={form.inputSection}>
            <label className={form.label}>Email:</label>
            <input
              className={`${form.input} ${errors.email ? styles.error : ""}`}
              {...register("email", {
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
          </div>
        </section>
        <section className={form.buttonSection}>
          <Button type="submit">Update Profile</Button>
        </section>
      </form>
      {updateError && <div className={styles.errorText}>{updateError}</div>}
      {updateSuccess && (
        <div className={styles.successText}>Profile updated successfully!</div>
      )}
    </ColoredContainers>
  );
}
