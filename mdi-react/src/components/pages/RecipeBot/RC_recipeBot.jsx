"use client";

import { useState, useEffect, useCallback } from "react";
import ColoredContainers from "../../core/ColoredContainers/Colored-Containers";
import Button from "../../core/Button/Button";
import styles from "./RecipeBot.module.scss";
import plantyImage from "../../../images/RecipeBotPlanty.png";

export default function RC_recipeBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [conversationId, setConversationId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE_URL = "http://localhost:8000";

  // CHANGED: Wrap initializeConversation in useCallback to avoid unnecessary re-renders
  const initializeConversation = useCallback(async () => {
    try {
      // ADDED: Clear any existing errors when retrying
      setError(null);
      const response = await fetch(`${API_BASE_URL}/v1/conversations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // ADDED: Better error handling for non-OK responses
      if (!response.ok)
        throw new Error(
          `Failed to initialize conversation: ${response.status}`
        );

      const data = await response.json();
      setConversationId(data.conversation_id);
      setMessages([
        {
          sender: "planty",
          text: "Hello! I'm Planty, your recipe assistant. Tell me what ingredients you have, and I'll suggest a plant-based recipe for you!",
        },
      ]);
    } catch (error) {
      console.error("Error initializing conversation:", error);
      // ADDED: Set error state for UI feedback
      setError("Failed to connect to the recipe service. Please try again.");
      setMessages([
        {
          sender: "planty",
          text: "Sorry, I'm having trouble connecting. Please try refreshing the page or check if the server is running.",
        },
      ]);
    }
  }, []);

  // Initialize conversation when component mounts
  useEffect(() => {
    initializeConversation();
  }, [initializeConversation]);

  const sendMessage = async (userInput) => {
    if (!conversationId) {
      console.error("No active conversation");
      return null;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/v1/conversations/${conversationId}/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content: userInput }),
        }
      );

      // ADDED: Better error handling
      if (!response.ok) {
        throw new Error(`Failed to send message: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error sending message:", error);
      // ADDED: Set error state for UI feedback
      setError("Failed to send message. Please try again.");
      return null;
    }
  };

  const handleSend = async () => {
    if (input.trim() && !isLoading) {
      const userMessage = { sender: "user", text: input };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setIsLoading(true);
      // ADDED: Clear any existing errors
      setError(null);

      try {
        const response = await sendMessage(input);
        if (response) {
          const plantyMessage = {
            sender: "planty",
            text: response.content,
            metadata: response.metadata,
          };
          setMessages((prev) => [...prev, plantyMessage]);
        } else {
          throw new Error("No response from server");
        }
      } catch (error) {
        console.error("Error:", error);
        const errorMessage = {
          sender: "planty",
          text: "Sorry, I'm having trouble processing your request. Please try again.",
        };
        setMessages((prev) => [...prev, errorMessage]);
        // ADDED: Set error state for UI feedback
        setError("Failed to get a response. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // ADDED: New handler for retry functionality
  const handleRetry = () => {
    initializeConversation();
  };

  return (
    <div className={styles["recipe-bot-container"]}>
      <ColoredContainers
        h2Text="Recipe Bot"
        h3Text="Tell our recipe bot Planty what ingredients you have and they'll send you a plant-based recipe"
      >
        {/* ADDED: Error message and retry button */}
        {error && (
          <div className={styles["error-message"]}>
            <p>{error}</p>
            <Button onClick={handleRetry}>Retry Connection</Button>
          </div>
        )}
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
                  src={plantyImage || "/placeholder.svg"}
                  alt="Planty"
                  className={styles["plantyImage"]}
                />
              )}
              <p>{msg.text}</p>
            </div>
          ))}
          {isLoading && (
            <div className={`${styles["message"]} ${styles["plantyMessage"]}`}>
              <img
                src={plantyImage || "/placeholder.svg"}
                alt="Planty"
                className={styles["plantyImage"]}
              />
              <p>Thinking...</p>
            </div>
          )}
        </div>
        <div className={styles["inputContainer"]}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="I have carrots and mushrooms..."
            disabled={isLoading}
          />
          <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
            {isLoading ? "Sent" : "Send"}
          </Button>
        </div>
      </ColoredContainers>
    </div>
  );
}