import React from "react";

const Lyrics = ({ searchResults, lyrics }) => {
  return (
    <div>
      {" "}
      {searchResults.length === 0 && (
        <div className="text-center" style={{ whiteSpace: "pre" }}>
          {lyrics}
        </div>
      )}
    </div>
  );
};

export default Lyrics;
