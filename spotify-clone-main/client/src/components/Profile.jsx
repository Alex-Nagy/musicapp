import React from "react";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Profile = () => {
  return (
    <form>
      <h1>My Profile</h1>
      <Avatar />
      <TextField label="Email" type="search" />
      <TextField label="Username" type="search" />
      <TextField label="City" type="search" />
      <br />
      <Button variant="contained" color="success">
        Save
      </Button>
      <Button variant="outlined" color="error">
        Cancel
      </Button>
    </form>
  );
};

export default Profile;
