import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ApiError, api } from "../../../utils/api";
import ColoredContainers from "../../core/ColoredContainers/Colored-Containers";
import Button from "../../core/Button/Button";
import styles from "../../../styles/forms.module.scss";
import form from "../../../styles/forms.module.scss";
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
      <form
        className={form["formpage-grid"]}
        //className={styles["sign-up-form"]}
        onSubmit={handleSubmit(onSubmit)}
      >
        <section className={form.formSection}>
          <div className={form.inputSection}>
            <label className={form.label}>First Name:</label>
            <input
              className={`${form.input} ${
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
          </div>
          <div className={form.inputSection}>
            <label className={form.label}>Last Name:</label>
            <input
              className={`${form.input} ${errors.lastName ? styles.error : ""}`}
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
              <span className={form.errorText}>{errors.lastName.message}</span>
            )}
          </div>
          <div className={form.inputSection}>
            <label className={form.label}>Date of Birth:</label>
            <input
              type="date"
              className={`${form.input} ${errors.birthday ? styles.error : ""}`}
              {...register("birthday", {
                required: "Date of birth is required",
              })}
            />
            {errors.birthday && (
              <span className={styles.errorText}>
                {errors.birthday.message}
              </span>
            )}
            <div className={form.inputSection}>
              <label className={form.label}>Gender:</label>
              <select
                className={`${form.input} ${errors.gender ? styles.error : ""}`}
                {...register("gender", { required: "Gender is required" })}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && (
                <span className={styles.errorText}>
                  {errors.gender.message}
                </span>
              )}
            </div>
            <div className={form.inputSection}>
              <label>Country:</label>
              <select
                className={`${styles.input} ${
                  errors.country ? styles.error : ""
                }`}
                {...register("country", { required: "Country is required" })}
              >
                <option value="">Select Country</option>
                {countries
                  .sort((a, b) => a.Country.localeCompare(b.Country))
                  .map((country) => (
                    <option key={country.Code} value={country.Code}>
                      {country.Country}
                    </option>
                  ))}
              </select>
              {errors.country && (
                <span className={styles.errorText}>
                  {errors.country.message}
                </span>
              )}
            </div>
            <div className={form.inputSection}></div>
            <label>Email:</label>
            <input
              className={`${form.input} ${errors.email ? styles.error : ""}`}
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
          </div>
          <div className={form.inputSection}>
            <label className={form.label}>Password:</label>
            <input
              type="password"
              className={`${form.input} ${errors.password ? styles.error : ""}`}
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
          </div>
          <div className={form.inputSection}>
            <label className={form.label}>Confirm Password:</label>
            <input
              type="password"
              className={`${form.input} ${
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
          </div>
        </section>
        <section className={form.buttonSection}>
          <Button className={styles["primary-button"]} type="submit">
            Sign Up
          </Button>
        </section>
      </form>
    </ColoredContainers>
  );
}
