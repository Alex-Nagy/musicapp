import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
// import { useAuth } from "../providers/auth";
import './Navbar.scss'

const Navbar = ({ email }) => {
  const navigate = useNavigate();
  // const { auth, token, logout } = useAuth();

  const nav = (path) => {
    console.log("rerouting");
    navigate(path);
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
}

  return (
    <nav
      className="navbar"
    >
      
        <Button onClick={() => nav("/lyrics")} variant="contained" size="small">
          🎤Lyrics
        </Button>
        <Button
          className="nav-collab"
          onClick={() => nav("/users")}
          variant="contained"
          size="small"
        >
          🎼Collaborate
        </Button>
        <Button
          className="nav-cont"
          onClick={() => nav("/contacts")}
          variant="contained"
          size="small"
        >
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
        <span>
          {email}
        </span>
        <Button
          onClick={() => logout()}
          variant="contained"
          size="small"
          color="error"
        >
          Log out
        </Button>
      
    </nav>
  );
};

export default Navbar;
