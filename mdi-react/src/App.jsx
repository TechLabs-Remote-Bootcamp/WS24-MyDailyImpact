import { useState } from "react";
import "./App.scss";
import Header from "../src/components/core/Header/Header";
import Footer from "../src/components/core/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import Home from "../src/components/pages/Home/Home";
import About from "../src/components/pages/About/About";
import RecipeBot from "../src/components/pages/RecipeBot/RecipeBot";
import Login from "../src/components/pages/Login/Login";
import SignUp from "../src/components/pages/SignUp/SignUp";
// import Navbar from "../src/components/core/Navbar/Navbar";
import ContactUs from "./components/pages/ContactUs/ContactUs";
import Imprint from "../src/components/pages/Imprint/Imprint";
import Privacy from "../src/components/pages/Privacy/Privacy";
import Dashboard from "../src/components/pages/Dashboard/Dashboard";
import ForgotPassword from "../src/components/pages/ForgotPassword/ForgotPassword";

export default function App() {
  return (
    <>
      <div className="head">
        <Header />
      </div>
      {/* <div className="navbarFlower">
        <Navbar /> */}
      {/* </div> */}
      <div className="content">
        <Routes className="content">
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
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
