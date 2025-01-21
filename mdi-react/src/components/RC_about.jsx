import React from "react";
import { Link } from "react-router-dom";
import ColoredContainers from "./Colored-Containers";
import "./Colored-Containers.scss";

export default function RC_about() {
  return (
    <div>
      <ColoredContainers h2Text="About Us" h3Text="Using tech for good">
        <div className="about-text">
          <p>
            MyDailyImpact is a calculator and tracking app that shows users the
            impact they have on animals and the environment when they switch
            each meat-based meal for a plant-based one.
          </p>
          <p className="primary">
            The purpose of this app is to{" "}
            <span className="bold">
              encourage people to incorporate more plant-based meals into their
              day by displaying the number of animals and amount of CO2, forest
              land, and water they have saved over the course of their impact
              journey
            </span>
            . Our aim is to make people feel inspired to make more sustainable,
            compassionate changes–whether they plan to go fully plant-based or
            simply aim to reduce their meat consumption.
          </p>
          <p>
            This app was developed by a team of
            <Link to="https://www.techlabs.org/"> TechLabs </Link>
            bootcamp students for the winter 2024/2025 semester. The team
            comprises of data science, artificial intelligence/deep learning,
            front-end web development, and back-end web development students.
          </p>
        </div>
      </ColoredContainers>
    </div>
  );
}
