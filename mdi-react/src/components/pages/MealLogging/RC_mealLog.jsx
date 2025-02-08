import ColoredContainers from "../../core/ColoredContainers/Colored-Containers";
import Button from "../../core/Button/Button";

import form from "../../../styles/forms.module.scss";
import { useState, useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function RC_MealLog() {
  const {
    register,
    formState,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      mealName: "",
      mealType: "Breakfast",
      comment: "",
    },
  });

  const mealTypes = ["Breakfast", "Lunch", "Dinner"];

  const onSubmitting = (data) => {
    console.log(data);
  };

  // useEffect(() => {
  //   if (formState.isSubmitSuccessful) {
  //     reset();
  //   }
  // }, [formState, submittedData, reset]);

  return (
    <>
      <ColoredContainers
        h2Text="What are you eating today?"
        h3Text="Choose the right input and save."
      >
        <form
          className={form["formpage-grid"]}
          onSubmit={handleSubmit(onSubmitting)}
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
              <label className={form.label}>Meal of the day:</label>
              <div className={form.radioGroup}>
                {mealTypes.map((meal) => (
                  <label key={meal} className={form.radioLabel}>
                    <input
                      type="radio"
                      name="mealType"
                      value={meal}
                      {...register("mealType", { required: true })}
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
              <label className={form.label}>Comment:</label>
              <textarea
                className={form.input}
                style={{ height: "unset" }}
                maxLength={500}
                rows={5}
                name="comment"
                {...register("comment", { required: false, maxLength: 150 })}
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
}
