import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Images from "./Images";
import ImageDetail from "./ImageDetail";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Images />} />
      <Route path="/api/images/:id" element={<ImageDetail />} />
    </Routes>
  </BrowserRouter>
);
