import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import Alert from "@mui/material/Alert";
import { useState } from "react";

const StyledRating = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
    color: theme.palette.action.disabled,
  },
}));

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" />,
    label: "Very Dissatisfied",
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" />,
    label: "Dissatisfied",
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" />,
    label: "Neutral",
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" />,
    label: "Satisfied",
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" />,
    label: "Very Satisfied",
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};
//--------------------------------------------------------

const Lyrics = ({ searchResults, lyrics }) => {
  const [succes, setSucces] = useState(false);

  const saveLyrics = async (lyrics) => {
    await axios
      .post("http://localhost:8080/api/lyrics", {
        lyrics,
      })
      .then(() => {
        setSucces(true);
      })
      .then(() =>
        setTimeout(() => {
          setSucces(false);
        }, 3000)
      );
  };

  return (
    <div>
      {succes && (
        <Alert variant="filled" severity="success">
          Lyrics Saved!
        </Alert>
      )}
      <StyledRating
        className="position-absolute"
        name="highlight-selected-only"
        defaultValue={3}
        IconContainerComponent={IconContainer}
        getLabelText={(value) => customIcons[value].label}
        highlightSelectedOnly
      />{" "}
      <br />
      <button
        className="btn btn-link position-absolute"
        onClick={() => saveLyrics(lyrics)}
      >
        Save this lyrics
      </button>
      <div className="lyrics">
        {searchResults.length === 0 && (
          <div className="text-center" style={{ whiteSpace: "pre", backgroundColor: "#fff9" }}>
            {lyrics}
          </div>
        )}
      </div>
    </div>
  );
};

export default Lyrics;
