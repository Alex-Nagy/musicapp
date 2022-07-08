import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
// import { useAuth } from "../providers/auth";

const Navbar = () => {
  const navigate = useNavigate();
  // const { auth, token, logout } = useAuth();

  const nav = (path) => {
    console.log("rerouting");
    navigate(path);
  };

  return (
    <nav
      className="navbar"
      style={{
        backgroundColor: "gray",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>
        <Button
          onClick={() => nav("/lyrics")}
          variant="contained"
          size="small"
        >
          🎤Lyrics
        </Button>
        <Button className="mr-5" onClick={() => nav("/users")} variant="contained" size="small">
          🎼Collaborate
        </Button>
        <Button className="ml-5" onClick={() => nav("/contacts")} variant="contained" size="small">
          📑Contacts
        </Button>
        <Button
          onClick={() => nav("/favlyrics")}
          variant="contained"
          size="small"
        >
          ⭐Lyrics
        </Button>
        <Button
          onClick={() => nav("/profile")}
          variant="contained"
          size="small"
        >
          👤Profile
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
