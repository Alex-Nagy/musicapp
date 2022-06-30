import React, { useEffect, useState } from "react";
import axios from "axios";

const useAuthSpot = (code) => {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  /* useEffect(() => {
    axios.post("http://localhost:8080/login", {
      code,
    }).then(res => {
        console.log(res.data);
    }).catch(() => {
        window.location = '/'
    })
  }, [code]); */
};

export default useAuthSpot;
