"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ColoredContainers from "../../core/ColoredContainers/Colored-Containers";
import Button from "../../core/Button/Button";
import styles from "./RC_UpdateProfile.module.scss";
import { api } from "../../../utils/api";

export default function RC_UpdateProfile({ onUpdateComplete }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthday: "",
    gender: "",
    country: "",
    email: "",
    password: "",
  });
  // State for handling update errors
  const [updateError, setUpdateError] = useState(null);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send PUT request to update profile
      const response = await api.put("/auth/update-profile", formData);
      console.log("Profile updated:", response);
      // Navigate back to profile page after successful update
      onUpdateComplete()
    } catch (error) {
      console.error("Error updating profile:", error);
      setUpdateError(error.message);
    }
  };

  return (
    <ColoredContainers h2Text="Update Profile">
      <form onSubmit={handleSubmit} className={styles["update-form"]}>
        {/* Generate form inputs for each field */}
        {[
          "firstName",
          "lastName",
          "birthday",
          "gender",
          "country",
          "email",
          "password",
        ].map((field) => (
          <div key={field} className={styles["form-group"]}>
            <label htmlFor={field}>
              {field.charAt(0).toUpperCase() + field.slice(1)}:
            </label>
            <input
              type={field === "birthday" ? "date" : "text"}
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className={styles["form-input"]}
            />
          </div>
        ))}
        <Button type="submit" className={styles["submit-button"]}>
          Update Profile
        </Button>
      </form>
      {/* Display error message if update fails */}
      {updateError && (
        <div className={styles["error-message"]}>{updateError}</div>
      )}
    </ColoredContainers>
  );
}
