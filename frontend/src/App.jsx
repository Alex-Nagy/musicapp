import { React, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import Callback from "./pages/Callback";
import Protected from "./components/Protected";
import Register from "./pages/Register";

import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
  // spotifyApi
  const code = new URLSearchParams(window.location.search).get("code");

  return (
    <div className="App">
      {code ? <Dashboard code={code} /> : <Login />}  {/* spotify login */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/profile"
          element={
            <Protected>
              <Profile />
            </Protected>
          }
        />
        <Route path="/callback/:provider" element={<Callback />} />
        <Route
          path="/register"
          element={
            <Protected>
              <Register />
            </Protected>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

/*
The Riddle:
hint: context
1db useCounter hook!!!
home-ba
profile-ba
sajat, de megorzi a sajatjat re-render eseten
es nem local/session storage
*/
