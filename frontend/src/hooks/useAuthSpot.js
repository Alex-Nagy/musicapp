import React, { useEffect, useState } from "react";
import axios from "axios";

const useAuthSpot = (code) => {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    axios
      .post("http://localhost:8080/login", {
        code,
      })
      .then((res) => {
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.accessToken);
        setExpiresIn(res.data.accessToken);
        window.history.pushState({}, null, "/");
      })
      .catch(() => {
        window.location = "/";
      });
  }, [code]);

  useEffect(() => {
    axios
      .post("http://localhost:8080/refresh", {
        refreshToken,
      })
      .then((res) => {
        // setAccessToken(res.data.accessToken);
        // setRefreshToken(res.data.accessToken);
        // setExpiresIn(res.data.accessToken);
        // window.history.pushState({}, null, "/");
      })
      .catch(() => {
        window.location = "/";
      });
  }, [refreshToken, expiresIn]);

  return accessToken;
};

export default useAuthSpot;
