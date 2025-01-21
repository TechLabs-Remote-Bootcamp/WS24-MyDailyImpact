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

function App() {
  // I didn't delete this code yet because of orientation in the framework.
  // It's a main way to learn coding by reading and - more from time to time -
  // urderstanding other code
  return (
    <>
      <Header className="header" />
      <Navbar className="navbar-flower" />
      <Routes className="content">
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/recipeBot" element={<RecipeBot />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
      <Footer className="footer" />
    </>
  );
}

export default App;
