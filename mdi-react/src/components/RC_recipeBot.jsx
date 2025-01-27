import React, { useState } from "react";
import ColoredContainers from "./Colored-Containers";
import styles from "./pages/RecipeBot.module.scss";
import plantyImage from "../images/RecipeBotPlanty.png";
import Button from "./Button.jsx";

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
    <>
      <ColoredContainers
        h2Text="Let me help you find a recipe!"
        h3Text="Planty is here to answer your plant-based recipe questions"
      >
          <div className={styles.messages}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`${styles.message} ${
                  msg.sender === "planty"
                    ? styles.plantyMessage
                    : styles.userMessage
                }`}
              >
                {msg.sender === "planty" && (
                  <img
                    src={plantyImage}
                    alt="Planty"
                    className={styles.plantyImage}
                  />
                )}
                <p>{msg.text}</p>
              </div>
            ))}
          </div>
          <div className={styles.inputContainer}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tell Planty what ingredients you have and he'll help suggest a recipe!"
            />
            <Button onClick={handleSend}>Send</Button>
          </div>
      </ColoredContainers>
    </>
  );
}
