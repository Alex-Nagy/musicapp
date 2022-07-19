import { useState, useEffect } from "react";
import useAuth from "./hooks/useAuth";
import Player from "./components/Player";
import TrackSearchResult from "./components/TrackSearchResult";
import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import axios from "axios";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile";
import Lyrics from "./pages/Lyrics";
import Users from "./pages/Users";
import Contacts from "./pages/Contacts";
import FavLyrics from "./pages/FavLyrics";
import Login from "./components/Login";
import "./Dashboard.scss";

const spotifyApi = new SpotifyWebApi({
  clientId: "d4057ca6c39b408496e9a83ecabe4b4a",
});

export default function Dashboard({ code }) {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  const [lyrics, setLyrics] = useState("");
  const [spotID, setSpotID] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");

  function chooseTrack(track) {
    setPlayingTrack(track);
    setSearch("");
    setLyrics("");
  }

  useEffect(() => {
    if (!playingTrack) return;

    axios
      .get("http://localhost:8080/lyrics", {
        params: {
          track: playingTrack.title,
          artist: playingTrack.artist,
        },
      })
      .then((res) => {
        setLyrics(res.data.lyrics);
      });
  }, [playingTrack]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
    // getMe();
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;
    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      setSearchResults(
        res.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    });

    return () => (cancel = true);
  }, [search, accessToken]);

  useEffect(() => {
    const getMe = async () => {
      const meData = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      });
      setSpotID(meData.data.id);
      setName(meData.data.display_name);
      setEmail(meData.data.email);
      setCountry(meData.data.country);
      console.log(meData.data);
      console.log("getme");
      // create in DB 🔻
      await axios.post("http://localhost:8080/api/profile/create", {
        userID: meData.data.id,
        artistName: meData.data.display_name,
        email: meData.data.email,
        country: meData.data.country,
      });
      console.log("createme");
    };
    getMe();
  }, [accessToken]);

  return (
    <div className="base">
      <Container
        className="d-flex flex-column py-2"
        style={{ height: "100vh" }}
      >
        {/* css  */}
        <div id="man" />
        <div id="stars" />
        <div id="stars2" />
        <div id="stars3" />
        <Navbar email={email} />
        <Form.Control
          type="search"
          placeholder="Search Songs/Artists"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
          {searchResults.map((track) => (
            <TrackSearchResult
              track={track}
              key={track.uri}
              chooseTrack={chooseTrack}
            />
          ))}

          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <h3 className="text-center">Search for a song</h3>
                  <h4 className="text-center">Or collaborate with others</h4>
                </div>
              }
            />
            <Route
              path="/lyrics"
              element={
                <Lyrics
                  searchResults={searchResults}
                  lyrics={lyrics}
                  playingTrack={playingTrack}
                />
              }
            />
            <Route path="/favlyrics" element={<FavLyrics />} />
            <Route path="/contacts" element={<Contacts spotID={spotID} />} />
            <Route
              path="/profile"
              element={
                <Profile
                  spotID={spotID}
                  myemail={email}
                  name={name}
                  mycountry={country}
                />
              }
            />
            <Route path="/users" element={<Users spotID={spotID} />} />
          </Routes>
        </div>

        <div>
          <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
        </div>
      </Container>
    </div>
  );
}
