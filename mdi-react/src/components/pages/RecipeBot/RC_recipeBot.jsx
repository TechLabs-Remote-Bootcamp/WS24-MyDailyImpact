import React, { useState } from "react";
import ColoredContainers from "../../core/ColoredContainers/Colored-Containers";
import Button from "../../core/Button/Button";
import styles from "./RecipeBot.module.scss";
import plantyImage from "../../../images/RecipeBotPlanty.png";

export default function RC_recipeBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { sender: "user", text: input }]);
      setInput("");
      // Simulating Planty's response
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "planty", text: "Here is a recipe suggestion for you!" },
        ]);
      }, 1000);
    }
  };
  return (
    <div className={styles["recipe-bot-container"]}>
      <ColoredContainers
        h2Text="Recipe Bot"
        h3Text="Tell our recipe bot Planty what ingredients you have and they'll send you a plant-based recipe"
      >
        <div className={styles["messages"]}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`${styles["message"]} ${
                msg.sender === "planty"
                  ? styles["plantyMessage"]
                  : styles["userMessage"]
              }`}
            >
              {msg.sender === "planty" && (
                <img
                  src={plantyImage}
                  alt="Planty"
                  className={styles["plantyImage"]}
                />
              )}
              <p>{msg.text}</p>
            </div>
          ))}
        </div>
        <div className={styles["inputContainer"]}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="I have carrots and mushrooms..."
          />
          <Button onClick={handleSend}>Send</Button>
        </div>
      </ColoredContainers>
    </div>
  );
}
