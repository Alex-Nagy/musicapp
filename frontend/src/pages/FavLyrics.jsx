import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const FavLyrics = () => {
  const [lyrics, setLyrics] = useState([]);

  useEffect(() => {
    const getLyrics = async () => {
      const lyricsData = await axios.get("http://localhost:8080/api/lyrics");
      setLyrics(lyricsData.data.favLyrics.map(e => e));
      console.log(lyricsData);
    };
    getLyrics();
  }, []);

  return (
    <div>
      <h2>Your favorite lyrics</h2>
      {/* <div>{lyrics}</div> */}
    </div>
  );
};

export default FavLyrics;
