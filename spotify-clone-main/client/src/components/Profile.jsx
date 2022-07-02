import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Profile = () => {
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
      <TextField size="small" label="My Artist Name" color="secondary" />
      <TextField size="small" label="Country" />
      <TextField size="small" label="Email" />
      <TextField size="small" label="Languages" />
      <TextField size="small" label="Genres" />
      <br />
      <Button size="small" variant="contained" color="success">
        Save
      </Button>
      <Button size="small" variant="outlined" color="error">
        Cancel
      </Button>
    </Box>
  );
};

export default Profile;
