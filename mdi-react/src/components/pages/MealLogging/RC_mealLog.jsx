import ColoredContainers from "../../core/ColoredContainers/Colored-Containers";
import Button from "../../core/Button/Button";
import CustomSelect from "../../core/CustomSelect/CustomSelect";
import styles from "./RC_mealLog.module.scss";
import form from "../../../styles/forms.module.scss";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function RC_MealLog() {
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState("");

  // const [inputValues, setInputValues] = useState({
  //   mealName: "", // Wert für das erste Input-Feld
  //   comment: "", // Wert für das zweite Input-Feld
  // });
  // //const [mealName, setMealName] = useState("");
  //const [mealOption, setMealOption] = useState("");
  // //const [comment, setComment] = useState("");
  // const [response, setResponse] = useState({});

  const handleSelectChange = (value) => {
    setSelectedValue(value);
  };

  const handleChange = (selectedOption) => {
    setMealOption = selectedOption;
    console.log("Selected:", selectedOption);
    //console.log({ mealName, mealOption, comment });
  };

  // const handleMealChange = (event) => {
  //   const { name, value } = event.target;
  //   setInputValues((prevValues) => ({ ...prevValues, [name]: value }));

  //   updateResponse({ ...inputValues, [name]: value }, mealOption);
  // };

  // const handleChange = (value) => {
  //   setMealOption(value);
  //   updateResponse(inputValues, value);
  // };

  // const updateResponse = (inputVals, mealOptionVal) => {
  //   const newResponse = {
  //     ...inputVals,
  //     mealOption: mealOptionVal,
  //   };
  //   setResponse(newResponse);
  //   console.log("Response:", newResponse); // Optional: Zum Debuggen
  // };

  // const handleSave = async (e) => {
  //   console.log("Response:", e);
  //   //e.preventDefault();
  //   try {
  //const response = await login({ email, password });
  /* if (response && response.token && response.user) {
        const success = await login(response.token, response.user);
        if (success) {
          console.log('Login successful');
        } else {
          console.log('Login failed in useAuth');
        }
      } else {
        console.error("Invalid login response format");
  //     } */
  //   } catch (error) {
  //     console.error("Login failed", error);
  //   }
  // };
  return (
    <>
      <ColoredContainers
        h2Text="What are you eating today?"
        h3Text="Choose the right input and save."
      >
        <div className={form["formpage-grid"]}>
          <form
            className={form.formSection}
            // onSubmit={handleSubmit(onSubmitHandler)}
          >
            <div className={form.inputSection}>
              <label className={form.label}>Meal name</label>

              <input
                className={form.input}
                name="mealName"
                // {...register("mealName")}
                // value={inputValues.mealName}
                // onChange={handleMealChange}
              ></input>
              {/* {errors.mealName && <p>{errors.mealName.message}</p>} */}
            </div>
            <div className={form.inputSection}>
              <label className={form.label}>Meal of the day</label>
              <CustomSelect
                options={["Breakfast", "Lunch", "Dinner"]}
                defaultValue="Breakfast"
                onSelectChange={handleSelectChange}
              ></CustomSelect>
            </div>
            <div className={form.inputSection}>
              <label className={form.label}>Comment</label>
              <input
                className={form.input}
                name="comment"
                // value={inputValues.comment}
                // onChange={handleMealChange}
              ></input>
            </div>
          </form>
          <section className={form.buttonSection}>
            <Button type="submit">Save</Button>
          </section>
        </div>
      </ColoredContainers>
    </>
  );
}
