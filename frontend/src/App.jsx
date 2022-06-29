import { React, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import Callback from "./pages/Callback";
import Protected from "./components/Protected";
import Register from "./pages/Register";
import axios from "axios";

function App() {
  const [username, setUsername] = useState("")
  // log first username in db
  useEffect(() => {
    const getData = async () => {
      const user = await axios.get("http://localhost:8080/api/user")
      setUsername(user)
      console.log(username.data.users[0].username)
    }
    getData()
  }, [])
  
  
  return (
    <div className="App">
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
