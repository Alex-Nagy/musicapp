import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Users.scss";

const Users = ({ spotID }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const usersData = await axios.get("http://localhost:8080/api/users");
      setUsers(usersData.data.users);
      console.log(usersData);
    };
    getUsers();
  }, []);

  const saveContact = async (
    userID,
    artistName,
    country,
    email,
    languages,
    genres,
    collab,
    instruments
  ) => {
    await axios.post("http://localhost:8080/api/contacts", {
      myID: spotID,
      userID,
      artistName,
      country,
      email,
      languages,
      genres,
      collab,
      instruments,
    });
  };

  return (
    <div>
      <h1 className="title-users">Users</h1>
      <button className="onlycollab btn btn-link m-0 p-0 float-right">
        only collaborative
      </button>
      <div className="collab-body">
        <br />
        {users.map((user, i) => (
          <div
            key={i}
            className="user-box"
          >
            <p>
              Artist name: <b>{user.artistName}</b>{" "}
            </p>
              <p className="userid">{user.userID}</p>
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
              Open now to Collaborate:{" "}
              <b>
                {user.collab ? (
                  <i style={{ color: "green" }}>YES✔</i>
                ) : (
                  <i style={{ color: "red" }}>NO❌</i>
                )}
              </b>
            </p>
            <div>
              <Button size="small" variant="outlined" color="secondary">
                Send email
              </Button>
              <Button
                size="small"
                variant="contained"
                color="info"
                onClick={() =>
                  saveContact(
                    user.userID,
                    user.artistName,
                    user.country,
                    user.email,
                    user.languages,
                    user.genres,
                    user.collab,
                    user.instruments
                  )
                }
              >
                Save
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
