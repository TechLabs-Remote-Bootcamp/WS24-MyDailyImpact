import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { jwt } from "../../../utils/jwt";
import { useForm, Controller } from "react-hook-form";
import { ApiError, api } from "../../../utils/api";
import ColoredContainers from "../../core/ColoredContainers/Colored-Containers";
import Button from "../../core/Button/Button";
import DatePicker from "react-datepicker";
import form from "../../../styles/forms.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import "./RC_mealLog.scss";

export default function RC_MealLog() {
  const location = useLocation();
  const user = location.state.userId.userId || "123456789";
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date(Date.now()));

  const {
    register,
    control,
    formState,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      userId: "", // actually getting from the dashboard via <Link>
      mealName: "",
      category: "Breakfast",
      date: date,
      notes: "",
    },
  });

  // useEffect(() => {
  //   console.log(
  //     "Dashboard useEffect - isAuthenticated:",
  //     isAuthenticated,
  //     "user:",
  //     user,
  //     "loading:",
  //     loading
  //   );
  //   if (!isAuthenticated && !loading) {
  //     initializeAuth();
  //   }
  // }, [isAuthenticated, loading, initializeAuth, user]);

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  // if (!isAuthenticated) {
  //   navigate("/login");
  // }

  const mealTypes = ["Breakfast", "Lunch", "Dinner"];
  //const now = new Date();

  const handleChange = (dateChange) => {
    // read in the react-form docs to avoid setValue -> have to ask AI for other solution
    setDate(dateChange);
    console.log(dateChange);
  };

  const onSubmit = async (data) => {
    try {
      const dataToSend = {
        ...data,
        userId: user,
        date: date,
      };

      console.log(dataToSend);

      const response = await api.post("/meal-logs", dataToSend);
      if (response) {
        console.log("Meal created");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error instanceof ApiError) {
        console.error("API Error Status:", error.status);
        console.error("API Error Message:", error.message);
      }
    }
  };

  // just for testing the get request
  const onSubmit2 = async () => {
    try {
      const response = await api.get("/meal-logs");
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
      if (error instanceof ApiError) {
        console.error("API Error Status:", error.status);
        console.error("API Error Message:", error.message);
      }
    }
  };

  //   const token = jwt.getToken();
  //   console.log(token);

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  return (
    <>
      <ColoredContainers
        h2Text="What are you eating today?"
        h3Text="Choose the right input and save."
      >
        <form
          className={form["formpage-grid"]}
          onSubmit={handleSubmit(onSubmit)}
        >
          <section className={form.formSection}>
            <div className={form.inputSection}>
              <label className={form.label}>Meal name:</label>
              <input
                className={form.input}
                name="mealName"
                {...register("mealName", { required: true, maxLength: 50 })}
              ></input>
            </div>
            <div className={form.inputSection}>
              <label className={form.label}>Date:</label>
              <Controller
                name="date"
                control={control}
                defaultValue={date}
                render={() => (
                  <DatePicker
                    portalId="calendar-root"
                    showIcon
                    toggleCalendarOnIconClick
                    popperPlacement="bottom"
                    style={{ padding: "0", margin: "0" }}
                    selected={date}
                    dateFormat="dd.MM.yyyy"
                    placeholderText="Select date"
                    onChange={handleChange}
                  />
                )}
              />
            </div>
            <div className={form.inputSection}>
              <label className={form.label}>Meal of the day:</label>
              <div className={form.radioGroup}>
                {mealTypes.map((meal) => (
                  <label key={meal} className={form.radioLabel}>
                    <input
                      type="radio"
                      name="category"
                      value={meal}
                      {...register("category", { required: true })}
                      style={{
                        height: "1.2rem",
                        width: "1.2rem",
                      }}
                    />
                    {meal}
                  </label>
                ))}
              </div>
            </div>
            <div className={form.inputSection}>
              <label className={form.label}>Some notes:</label>
              <textarea
                className={form.input}
                placeholder="(This is optional)"
                style={{ height: "unset" }}
                maxLength={500}
                rows={5}
                name="notes"
                {...register("notes", {
                  required: false,
                  maxLength: 150,
                })}
              ></textarea>
            </div>
          </section>
          <section className={form.buttonSection}>
            <Button
              type="submit"
              onClick={() => {
                reset((formValues) => ({
                  ...formValues,
                }));
              }}
            >
              Save
            </Button>
            <Button onClick={onSubmit2}>Get log data and print</Button>
          </section>
        </form>
      </ColoredContainers>
    </>
  );
}
