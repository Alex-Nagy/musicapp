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
import './Profile.scss'

const Profile = ({ spotID, myemail, name, mycountry }) => {
  const userID = spotID;
  const [artistName, setArtistName] = useState(name);
  const [country, setCountry] = useState(mycountry);
  const [email, setEmail] = useState(myemail);
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
        .post("http://localhost:8080/api/profile/update", {
          userID,
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
      className="box"
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <h1>My Profile</h1>
      <Avatar />
      <div className="fields">
      <TextField
        id="outlined-read-only-input"
        label="User ID"
        value={spotID}
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
        className="inputField"
      />
      <TextField
        size="small"
        label="Country"
        defaultValue={mycountry}
        onChange={(e) => setCountry(e.target.value)}
        className="inputField"
      />
      <TextField
        size="small"
        label="Email"
        defaultValue={myemail}
        onChange={(e) => setEmail(e.target.value)}
        className="inputField"
      />
      <TextField
        size="small"
        label="Languages"
        onChange={(e) => setLanguages(e.target.value.split(", "))}
        className="inputField"
      />
      <TextField
        size="small"
        label="Genres"
        onChange={(e) => setGenres(e.target.value.split(", "))}
        className="inputField"
      />
      </div>
      <FormControlLabel
        control={
          <Checkbox color="success" onChange={() => setCollab(!collab)} />
        }
        label="Open to collaborate"
      />
      <br />
      <div className="save-and-cancel">
      <LoadingButton
        size="small"
        color="success"
        onClick={saveProfile}
        loading={loading}
        loadingPosition="start"
        startIcon={<SaveIcon />}
        variant="contained"
        className="btn save"
      >
        Save
      </LoadingButton>
      <Button
        size="small"
        variant="outlined"
        color="error"
        onClick={() => setLoading(false)}
        className="btn cancel"
      >
        Cancel
      </Button>
      </div>
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
