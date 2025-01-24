import React from "react";
import ColoredContainers from "./Colored-Containers";
import Button from "./Button";
import { Link } from "react-router-dom";

export default function RC_Home() {
  return (
    <div className="home">
      <ColoredContainers
        h2Text="Get ready for your impact journey"
        h3Text="Every plant-based meal counts"
      >
        <div className="home-text">
          <p>Did you know that:</p>
          <ul className="home-list">
            <li>
              by switching out meat-based meals with plant-based ones, you can
              have a positive impact on the environment and animals’ lives?
            </li>
            <li>
              you don’t have to be fully plant-based or vegan to make a positive
              difference?
            </li>
            <li>every meal you eat counts?</li>
          </ul>
          <p>
            Join us at MyDailyImpact, where you can track how many animals’
            lives and how much forest land, CO2 emission, and water you save by
            swapping out meat- for plant-based meals!
          </p>
        </div>
        <div className="primary-button">
          <Link to="/sign-up">
            <Button>Join us!</Button>
          </Link>
        </div>
      </ColoredContainers>
    </div>
  );
}
