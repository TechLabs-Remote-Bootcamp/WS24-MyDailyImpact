import { useState } from "react";
import "./App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import RecipeBot from "./components/pages/RecipeBot";
import Login from "./components/pages/Login";
import SignUp from "./components/pages/SignUp";
import Navbar from "./components/Navbar";
import ContactUs from "./components/pages/ContactUs";
import Imprint from "./components/pages/Imprint";
import Privacy from "./components/pages/Privacy";
import Dashboard from "./components/pages/Dashboard";
import ForgotPassword from "./components/pages/ForgotPassword";
import MealLogging from "./components/pages/MealLogging";

export default function App() {
  return (
    <>
      <div className="head">
        <Header />
      </div>
      <div className="navbarFlower">
        <Navbar />
      </div>
      <div className="content">
        <Routes className="content">
          <Route path="/" element={<Home />}></Route>
          {/* <Route path="/about" element={<About />}></Route> */}
          <Route path="/meal-logging" element={<MealLogging />}></Route>
          <Route path="/recipeBot" element={<RecipeBot />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/contact-us" element={<ContactUs />}></Route>
          <Route path="/imprint" element={<Imprint />}></Route>
          <Route path="/privacy" element={<Privacy />}></Route>
          <Route path="/recipeBot" element={<RecipeBot />}></Route>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Routes>
      </div>
      <div className="foot">
        {/* <div>hello</div> */}
        <Footer />
      </div>
    </>
  );
}
