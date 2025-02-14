import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useForm, Controller } from "react-hook-form";
import { ApiError, api } from "../../../utils/api";
import ColoredContainers from "../../core/ColoredContainers/Colored-Containers";
import Button from "../../core/Button/Button";
import DatePicker from "react-datepicker";
import form from "../../../styles/forms.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import "./RC_mealLog.scss";

export default function RC_MealLog() {
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

  const mealTypes = ["Breakfast", "Lunch", "Dinner"];

  const handleChange = (dateChange) => {
    // read in the react-form docs to avoid setValue -> works fine with 'useState'
    setDate(dateChange);
    console.log(dateChange);
  };

  const onSubmit = async (data) => {
    try {
      const dataToSend = {
        ...data,
        userId: id,
      };
      console.log(dataToSend);

      const response = await api.post("/meal-logs", dataToSend);
      if (response) {
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

  //localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
  const id = () => {
    const jwt =
      localStorage.getItem("auth_token") ||
      sessionStorage.getItem("auth_token");
    const token = jwtDecode(jwt, { header: false });
    console.log(token.id);
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      console.log("Meal successfully logged");
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
                {...register("mealName", {
                  required: "This input is required.",
                  maxLength: 50,
                })}
              ></input>
              {/* empty div to move the error text in the second grid column under the input field */}
              <div></div>
              {errors.mealName && (
                <p className={form.errorText}>{errors.mealName.message}</p>
              )}
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
                style={{ height: "unset", paddingTop: "0.5em" }}
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
            <input
              type="button"
              style={{ margin: "0 0 0 20px" }}
              onClick={id}
              value="Get log data and print"
            ></input>
          </section>
        </form>
      </ColoredContainers>
    </>
  );
}
