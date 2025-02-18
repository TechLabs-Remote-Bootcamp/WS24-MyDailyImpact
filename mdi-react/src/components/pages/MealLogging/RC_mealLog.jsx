import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
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
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date(Date.now()));
  const [userIdent, setUserIdent] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const mealTypes = ["Breakfast", "Lunch", "Dinner"];

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
      userId: "12", // actually getting from the dashboard via <Link>
      mealName: "",
      category: "Breakfast",
      date: date,
      notes: "",
    },
  });

  useEffect(() => {
    try {
      const id = getId();
      setUserIdent(id);
    } catch (error) {
      console.error("Error:", error);
      navigate("/login");
    }
  }, []); // Running once at the mount of the component

  function getId() {
    const jwt =
      localStorage.getItem("auth_token") ||
      sessionStorage.getItem("auth_token");
    if (!jwt) {
      throw new Error("No auth token found");
    }
    const token = jwtDecode(jwt, { header: false });

    if (!token.id) {
      throw new Error("No user ID found in token");
    }
    console.log(token.id);
    return token.id;
  }

  const onSubmit = async (data) => {
    try {
      const dataToSend = {
        ...data,
        userId: userIdent,
      };
      console.log(dataToSend);

      const response = await api.post("/meal-logs", dataToSend);
      if (response) {
        console.log(response);
        console.log("Meal successfully logged");
        reset({
          mealName: "",
          category: "Breakfast",
          date: new Date(Date.now()),
          notes: "",
        });
        setDate(new Date(Date.now()));
      }
    } catch (error) {
      console.error("Error:", error);
      if (error instanceof ApiError) {
        console.error("API Error Status:", error.status);
        console.error("API Error Message:", error.message);
      }
    }
  };

  const saveAndBackToDashboard = async (event) => {
    event.preventDefault();
    await handleSubmit(onSubmit)();
    reset();
    navigate("/dashboard");
  };

  const saveAndToNextLog = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    await handleSubmit(onSubmit)();
    // short delay before resetting to avoid jerking of the page load
    setTimeout(() => {
      reset();
    }, 300); // 300ms delay
    setIsSubmitting(false);
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

  // useEffect(() => {
  //   if (formState.isSubmitSuccessful) {
  //     reset();
  //   }
  // }, [formState, reset]);
  // useEffect(() => {
  //   if (formState.isSubmitSuccessful) {
  //     reset({
  //       mealName: "",
  //       category: "Breakfast",
  //       date: new Date(),
  //       notes: "",
  //     });
  //   }
  // }, [formState, reset]);

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
                defaultValue=""
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
                render={({ field }) => (
                  <DatePicker
                    portalId="calendar-root"
                    showIcon
                    toggleCalendarOnIconClick
                    popperPlacement="bottom"
                    style={{ padding: "0", margin: "0" }}
                    selected={field.value}
                    dateFormat="dd.MM.yyyy"
                    placeholderText="Select date"
                    onChange={(date) => field.onChange(date)}
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
                      defaultValue="Breakfast"
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
                defaultValue=""
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
            <Button type="button" onClick={saveAndBackToDashboard}>
              Save meal
            </Button>
            <Button
              type="button"
              onClick={saveAndToNextLog}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving ..." : "Save and log next meal"}
            </Button>
            <input
              type="button"
              style={{ margin: "0 0 0 20px" }}
              onClick={onSubmit2}
              value="Get log data and print"
            ></input>
          </section>
        </form>
      </ColoredContainers>
    </>
  );
}
