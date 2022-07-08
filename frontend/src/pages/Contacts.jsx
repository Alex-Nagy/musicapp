import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Contacts = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const usersData = await axios.get("http://localhost:8080/api/users");
      setUsers(usersData.data.users);
      console.log(usersData);
    };
    getUsers();
  }, []);

  return (
    <div>
      <h1>My Contacts</h1>

      {users.map((user, i) => (
        <div key={i} style={{ border: "1px solid black" }}>
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
          <Button size="small" variant="outlined">Send email</Button> 
          <Button size="small" variant="outlined">Save</Button> 
        </div>
      ))}
    </div>
  );
};

export default Contacts;
