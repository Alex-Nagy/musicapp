import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

const Contacts = ({ spotID }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      console.log("lets get my contacts " + spotID);
      const usersData = await axios.get("http://localhost:8080/api/contacts", {
        params: { userID: spotID },
      });
      console.log(usersData.data);
      setUsers(usersData.data);
    };
    getUsers();
  }, []);

  const deleteContact = async (contactID) => {
    await axios.post("http://localhost:8080/api/contacts/delete", {
      myID: spotID,
      userID: contactID,
    });
  };

  const deleteItem = (index) => {
    setUsers((user) => user.filter((item, i) => i !== index));
  };

  return (
    <div>
      <h1>My Contacts</h1>
      {users.map((user, i) => (
        <div
          key={i}
          style={{ border: "5px solid black", borderRadius: "10px" }}
        >
          <p className="float-right">{user.userID}</p>
           <p>
            Artist name: <b>{user.artistName}</b>
          </p>
          <p>
            Country: <b>{user.country}</b>
          </p>
          <p>
            Email: <b>{user.email}</b>
          </p>
          <ul>
            Languages:{" "}
            <b>
              {user.languages.map((lang, i) => (
                <li key={i}>{lang}</li>
              ))}
            </b>
          </ul>
          <ul>
            Genres:{" "}
            <b>
              {user.genres.map((genre, i) => (
                <li key={i}>{genre}</li>
              ))}
            </b>
          </ul>
          <p>
            Open to Collaborate:{" "}
            <b>
              {user.collab ? (
                <i style={{ color: "green" }}>YES</i>
              ) : (
                <i style={{ color: "red" }}>NO</i>
              )}
            </b>
          </p>
          <br />
          <Button size="small" variant="outlined">
            Send email
          </Button>
          <Button
            variant="outlined"
            color="error"
            className="float-right"
            startIcon={<DeleteIcon />}
            onClick={() => {
              deleteContact(user.userID);
              deleteItem(i);
            }}
          >
            Delete
          </Button>
        </div>
      ))}
    </div>
  );
};

export default Contacts;
