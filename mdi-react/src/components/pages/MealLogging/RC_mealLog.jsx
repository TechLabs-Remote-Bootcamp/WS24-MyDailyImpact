import ColoredContainers from "../../core/ColoredContainers/Colored-Containers";
import Button from "../../core/Button/Button";
import CustomSelect from "../../core/CustomSelect/CustomSelect";
import styles from "./RC_mealLog.module.scss";
import form from "../../../styles/forms.module.scss";

export default function RC_MealLog() {
  const handleChange = (selectedOption) => {
    console.log("Selected:", selectedOption);
  };
  return (
    <>
      <ColoredContainers
        h2Text="What are you eating today?"
        h3Text="Choose the right input and save."
      >
        <div className={form["formpage-grid"]}>
          <section className={form.formSection}>
            <div className={form.inputSection}>
              <label className={styles.label}>Meal name</label>
              <input className={form.input}></input>
            </div>
            <div className={form.inputSection}>
              <label className={styles.label}>Meal of the day</label>
              <CustomSelect
                options={["Breakfast", "Lunch", "Dinner"]}
                defaultValue="Breakfast"
                onChange={handleChange}
              ></CustomSelect>
            </div>
            <div className={form.inputSection}>
              <label className={styles.label}>Comment</label>
              <input className={form.input}></input>
            </div>
          </section>
          <section className={form.buttonSection}>
            <Button>Save</Button>
          </section>
        </div>
      </ColoredContainers>
    </>
  );
}
