import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
// import { useAuth } from "../providers/auth";

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
      style={{
        backgroundColor: "gray",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>
        <Button onClick={() => nav("/lyrics")} variant="contained" size="small">
          🎤Lyrics
        </Button>
        <Button
          className="mr-5"
          onClick={() => nav("/users")}
          variant="contained"
          size="small"
        >
          🎼Collaborate
        </Button>
        <Button
          className="ml-5"
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
      </div>
    </nav>
  );
};

export default Navbar;
