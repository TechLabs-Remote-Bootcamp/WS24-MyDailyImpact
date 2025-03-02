import { useState } from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../src/components/core/Header/Header";
import Footer from "../src/components/core/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import Home from "../src/components/pages/Home/Home";
import About from "../src/components/pages/About/About";
import RecipeBot from "../src/components/pages/RecipeBot/RecipeBot";
import Login from "../src/components/pages/Login/Login";
import SignUp from "../src/components/pages/SignUp/SignUp";
import ContactUs from "./components/pages/ContactUs/ContactUs";
import Imprint from "../src/components/pages/Imprint/Imprint";
import Privacy from "../src/components/pages/Privacy/Privacy";
import MealLogging from "./components/pages/MealLogging/MealLogging";
import Dashboard from "../src/components/pages/Dashboard/Dashboard";
import MealHistory from "../src/components/pages/MealHistory/MealHistory";
import Profile from "../src/components/pages/Profile/Profile";
import { ImpactMetricsProvider } from "./context/ImpactMetricsContext";

export default function App() {
  return (
    <ImpactMetricsProvider>
      <div className="head">
        <Header />
      </div>
      <div className="content">
        <Routes className="content">
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/contact-us" element={<ContactUs />}></Route>
          <Route path="/imprint" element={<Imprint />}></Route>
          <Route path="/privacy" element={<Privacy />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/recipeBot" element={<RecipeBot />}></Route>
          <Route path="/meal-logging" element={<MealLogging />}></Route>
          <Route path="/meal-history" element={<MealHistory />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
      </div>
      <div className="foot">
        {/* <div>hello</div> */}
        <Footer />
      </div>
    </ImpactMetricsProvider>
  );
}
