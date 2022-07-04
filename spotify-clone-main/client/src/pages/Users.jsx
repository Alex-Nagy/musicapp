import axios from "axios";
import React, { useEffect, useState } from "react";

const Users = () => {
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
      <h1>Users</h1>
      <div>
        {users.map((user) => (
          <div style={{'border': '1px solid black'}}>
            <p>{user.artistName}</p>
            <p>{user.country}</p>
            <p>{user.email}</p>
            <p>{user.languages}</p>
            <p>{user.genres}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
