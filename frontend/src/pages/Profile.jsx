import React, { useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Alert from "@mui/material/Alert";
import axios from "axios";

const Profile = ({ spotID, myemail, name, mycountry }) => {
  const [artistName, setArtistName] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [languages, setLanguages] = useState([]);
  const [genres, setGenres] = useState([]);
  const [collab, setCollab] = useState(false);
  const [loading, setLoading] = useState(false);
  const [succes, setSucces] = useState(false);
  // const [regDate, setRegDate] = useState(null)

  const saveProfile = async () => {
    try {
      setLoading(true);
      await axios
        .post("http://localhost:8080/api/profile", {
          artistName,
          country,
          email,
          languages,
          genres,
          collab,
        })
        .then(() => {
          //succes alert
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        })
        .then(() =>
          setTimeout(() => {
            setSucces(true);
          }, 1000)
        )
        .then(() =>
          setTimeout(() => {
            setSucces(false);
          }, 3000)
        );
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
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
        id="outlined-read-only-input"
        label="User ID"
        defaultValue={spotID}
        InputProps={{
          readOnly: true,
        }}
        size="small"
        disabled
      />
      <TextField
        size="small"
        label="My Artist Name"
        defaultValue={name}
        onChange={(e) => setArtistName(e.target.value)}
      />
      <TextField
        size="small"
        label="Country"
        defaultValue={mycountry}
        onChange={(e) => setCountry(e.target.value)}
      />
      <TextField
        size="small"
        label="Email"
        defaultValue={myemail}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        size="small"
        label="Languages"
        onChange={(e) => setLanguages(e.target.value.split(", "))}
      />
      <TextField
        size="small"
        label="Genres"
        onChange={(e) => setGenres(e.target.value.split(", "))}
      />
      <FormControlLabel
        control={
          <Checkbox color="success" onChange={() => setCollab(!collab)} />
        }
        label="Open to collaborate"
      />
      <br />
      <LoadingButton
        size="small"
        color="success"
        onClick={saveProfile}
        loading={loading}
        loadingPosition="start"
        startIcon={<SaveIcon />}
        variant="contained"
      >
        Save
      </LoadingButton>
      <Button
        size="small"
        variant="outlined"
        color="error"
        onClick={() => setLoading(false)}
      >
        Cancel
      </Button>
      <br />
      {succes && (
        <Alert variant="filled" severity="success">
          Profile Saved!
        </Alert>
      )}
    </Box>
  );
};

export default Profile;
