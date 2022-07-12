import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

const FavLyrics = () => {
  const [lyrics, setLyrics] = useState([]);

  useEffect(() => {
    const getLyrics = async () => {
      const lyricsData = await axios.get("http://localhost:8080/api/lyrics");
      setLyrics(lyricsData.data.favLyrics);
    };
    getLyrics();
  }, []);

  const deleteLyrics = async (lyrics) => {
    await axios.post("http://localhost:8080/api/lyrics/delete", {
      lyrics: lyrics,
    });
  };

  const deleteItem = (index) => {
    setLyrics((lyrics) => lyrics.filter((item, i) => i !== index));
  };

  return (
    <div>
      <h2>Your favorite lyrics</h2>
      {lyrics.map((e, i) => (
        <div
          key={i}
          style={{
            border: "5px solid black",
            borderRadius: "10px",
            whiteSpace: "pre",
            backgroundColor: "#fffd"
          }}
        >
          <Button
            variant="outlined"
            color="error"
            className="float-right"
            startIcon={<DeleteIcon />}
            onClick={() => {
              deleteLyrics(e.lyrics);
              deleteItem(i);
            }}
          >
            Delete
          </Button>
          {e.lyrics}
        </div>
      ))}
    </div>
  );
};

export default FavLyrics;
