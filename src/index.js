import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./App";
import Blog from "./pages/Blog";
import BlogAll from "./pages/BlogsAll";
import Login from "./pages/Login";
import Category from "./pages/Category";
import Gallery from "./pages/Gallery";
import AddTeam from "./pages/AddTeam";
import Teams from "./pages/Teams";
import GalleryAll from "./pages/GalleryAll";
import { CookiesProvider } from "react-cookie";
import AddPlayer from "./pages/AddPlayer";
import AllPlayers from "./pages/Players";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CookiesProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-blog" element={<Blog />} />
        <Route path="/blogs" element={<BlogAll />} />
        <Route path="/add-single-category" element={<Category />} />
        <Route path="/gallery" element={<GalleryAll />} />
        <Route path="/add-gallery" element={<Gallery />} />
        <Route path="/add-player" element={<AddPlayer />} />
        <Route path="/add-team" element={<AddTeam />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/players" element={<AllPlayers />} />
      </Routes>
    </BrowserRouter>
  </CookiesProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
