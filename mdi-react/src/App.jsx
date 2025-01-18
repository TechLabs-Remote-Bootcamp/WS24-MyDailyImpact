import { useState } from "react";
import "./App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Community from "./components/pages/Community";
import Login from "./components/pages/Login";
import SignUp from "./components/pages/SignUp";

function App() {
  // I didn't delete this code yet because of orientation in the framework.
  // It's a main way to learn coding by reading and - more from time to time -
  // urderstanding other code
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/community" element={<Community />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
