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
import ContactUs from "./components/pages/ContactUs";
import Imprint from "./components/pages/Imprint";
import Privacy from "./components/pages/Privacy";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/recipeBot" element={<RecipeBot />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/contact-us" element={<ContactUs />}></Route>
        <Route path="/imprint" element={<Imprint />}></Route>
        <Route path="/privacy" element={<Privacy />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
