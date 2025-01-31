import ColoredContainers from "./Colored-Containers";
import styles from "./RC_mealLog.module.scss";
import Form, {
  CheckboxList,
  Input,
  Radio,
  TextArea,
  Select,
  SubmitButton,
} from "react-form-component";
import "../styles/libForms.scss";

export default function RC_MealLog() {
  return (
    <>
      <ColoredContainers
        h2Text="What are you eating today?"
        h3Text="Choose the right input and save."
      >
        <Form
          // className={styles.formContainer}
          fields={["mealName", ["daytimeRadio"], "comment"]}
          mandatory={["mealName", "daytime"]}
        >
          <Input
            name="mealName"
            type="text"
            label="Meal name"
            placeholder="Type in the name of your meal"
            className="input"
          />
          <Radio
            className={styles.radiobuttons}
            name="daytimeRadio"
            label="Meal of the day"
            initialValue={["Breakfast"]}
            options={[
              {
                label: "Breakfast",
                value: "breakfast",
              },
              {
                label: "Lunch",
                value: "lunch",
              },
              {
                label: "Dinner",
                value: "dinner",
              },
            ]}
          />
          <TextArea
            className=""
            label="Your comment"
            min={5}
            name="comment"
            placeholder="Write a comment ..."
            prefix=""
            rows={5}
            suffix=""
          />
          <SubmitButton onClick={(fields) => console.log(fields)}>
            Save
          </SubmitButton>
        </Form>
      </ColoredContainers>
    </>
  );
}
