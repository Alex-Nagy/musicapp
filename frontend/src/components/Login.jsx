import React from "react";
import { Container } from "react-bootstrap";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=d4057ca6c39b408496e9a83ecabe4b4a&response_type=code&redirect_uri=http://localhost:3000/callback/spotify&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

const Login = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center">
      <a className="btn btn-success btn-lg" href={AUTH_URL}>
        Login with Spotify
      </a>
    </Container>
  );
};

export default Login;
