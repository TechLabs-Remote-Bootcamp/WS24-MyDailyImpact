import { useState } from "react";
import "./App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import About from "./components/pages/About";
import Community from "./components/pages/Community";

function App() {
  // I didn't delete this code yet because of orientation in the framework.
  // It's a main way to learn coding by reading and - more from time to time -
  // urderstanding other code
  return (
    <>
      <Header />
      <div>
        Hello world
        <Routes>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/community" element={<Community />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
