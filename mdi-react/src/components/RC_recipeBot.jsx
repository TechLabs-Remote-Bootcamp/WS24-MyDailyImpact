import ColoredContainers from "./Colored-Containers";
import "./RC_recipeBot.module.scss";

export default function RC_recipeBot() {
  return (
    <div className="chatbot-container">
      <ColoredContainers
        h2Text="Let me help you find a recipe!"
        h3Text="Planty is here to answer your plant-based recipe questions"
      >
        <div className="chat">
          <div className="messages"></div>
          <input
            type="text"
            className="input-questions"
            placeholder="Tell Planty what ingredients you have and he'll help suggest a recipe!"
          />
        </div>
      </ColoredContainers>
    </div>
  );
}
