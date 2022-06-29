import React, { useEffect } from "react";
import { useAuth } from "../providers/auth";


const Profile = () => {
  const { token } = useAuth();

  return (
    <div>
      <p>{token ? "Logged in" : "Anonymous"}</p>
    </div>
  );
};

export default Profile;

