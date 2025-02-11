import { useAuth } from "../../../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import { jwt } from "../../../utils/jwt";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import ColoredContainers from "../../core/ColoredContainers/Colored-Containers";
import Button from "../../core/Button/Button";
import { ApiError, api } from "../../../utils/api";
import form from "../../../styles/forms.module.scss";

export default function RC_MealLog() {
  const location = useLocation();
  const user = location.state.userId.userId || "";
  const navigate = useNavigate();
  //const { isAuthenticated, user, logout, loading, initializeAuth } = useAuth();
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      user: user,
      meal: "",
      //mealType: "Breakfast",
      date: new Date(),
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

  const onSubmit = (data) => {
    const dataToSend = {
      ...data,
      user: user,
    };

    console.log(data);
    const token = jwt.getToken();
    console.log(token);
    //try {
    //setValue(dataToSend.date, now);

    //   fetch("http://localhost:5001/api/meal-logs", {
    //     method: "POST",
    //     credentials: "include",
    //     headers: {
    //       Authorization: token ? `Bearer ${token}` : "",
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(dataToSend),
    //   }).then(() => {
    //     console.log("Meal data successful transferred");
    //     navigate("/dashboard");
    //   });
    // };

    //   dataToSend
    // );
    // if (response) {
    //   console.log("Meal data successful transferred");
    // }
    //   } catch (error) {
    //     console.error("Error:", error);
    //     if (error instanceof ApiError) {
    //       console.error("API Error Status:", error.status);
    //       console.error("API Error Message:", error.message);
    //     }
    //   }
    // };

    // useEffect(() => {
    //   if (formState.isSubmitSuccessful) {
    //     reset();
    //   }
    // }, [formState, submittedData, reset]);

    return (
      <>
        <ColoredContainers
          // h2Text="What are you eating today?"
          // h3Text="Choose the right input and save."
          h2Text={user}
          h3Text="Hallo"
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
                  name="meal"
                  {...register("meal", { required: true, maxLength: 50 })}
                ></input>
              </div>
              <div className={form.inputSection}>
                <label className={form.label}>Meal of the day:</label>
                <div className={form.radioGroup}>
                  {mealTypes.map((meal) => (
                    <label key={meal} className={form.radioLabel}>
                      <input
                        type="radio"
                        name="mealType"
                        value={meal}
                        // {...register("mealType", { required: true })}
                        // style={{
                        //   height: "1.2rem",
                        //   width: "1.2rem",
                        // }}
                      />
                      {meal}
                    </label>
                  ))}
                </div>
              </div>
              <div className={form.inputSection}>
                <label className={form.label}>Comment:</label>
                <textarea
                  className={form.input}
                  style={{ height: "unset" }}
                  maxLength={500}
                  rows={5}
                  name="notes"
                  {...register("notes", { required: false, maxLength: 150 })}
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
            </section>
          </form>
        </ColoredContainers>
      </>
    );
  };
}
