import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./App";
import Blog from "./pages/Blog";
import BlogAll from "./pages/BlogsAll";
import Login from "./pages/Login";
import Team from './pages/Team'
import Category from './pages/Category'
import Gallery from './pages/Gallery'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/add-blog" element={<Blog />} />
      <Route path="/blogs" element={<BlogAll />} />
      <Route path="/add-single-team" element={<Team />} />
      <Route path="/add-single-category" element={<Category />} />
      <Route path="/add-gallery" element={<Gallery />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
