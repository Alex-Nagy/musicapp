import React, { useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

const Profile = () => {
  const [artistName, setArtistName] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [languages, setLanguages] = useState([]);
  const [genres, setGenres] = useState([]);

  const postProfile = async () => {
    const resp = await axios.post("http://localhost:8080/api/profile", {
      artistName,
      country,
      email,
      languages,
      genres,
    });
    console.log(resp)
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <h1>My Profile</h1>
      <Avatar />
      <TextField
        size="small"
        label="My Artist Name"
        color="secondary"
        onChange={(e) => setArtistName(e.target.value)}
        value={artistName}
      />
      <TextField
        size="small"
        label="Country"
        onChange={(e) => setCountry(e.target.value)}
      />
      <TextField
        size="small"
        label="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        size="small"
        label="Languages"
        onChange={(e) => setLanguages(e.target.value)}
      />
      <TextField
        size="small"
        label="Genres"
        onChange={(e) => setGenres(e.target.value)}
      />
      <br />
      <Button
        size="small"
        variant="contained"
        color="success"
        onClick={postProfile}
      >
        Save
      </Button>
      <Button size="small" variant="outlined" color="error">
        Cancel
      </Button>
    </Box>
  );
};

export default Profile;
