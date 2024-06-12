// SongToggleButton.js
import { useState, useEffect } from "react";
import playIcon from "../assets/soundOn.svg";
import pauseIcon from "../assets/soundOff.svg";
import song from "../assets/littleroot.mp3";
import PropTypes from "prop-types";

SongToggleButton.propTypes = {
  startGame: PropTypes.bool,
};

const littleRoot = new Audio(song);
littleRoot.loop = true;
littleRoot.volume = 0.2;

function SongToggleButton({ startGame }) {
  const [isSongPlaying, setIsSongPlaying] = useState(false);

  useEffect(() => {
    if (startGame && littleRoot.paused) {
      littleRoot.play();
      setIsSongPlaying((prev) => !prev);
    }
  }, [startGame]);

  const toggleSong = () => {
    if (littleRoot.paused) {
      littleRoot.play();
    } else {
      littleRoot.pause();
    }
    setIsSongPlaying(!littleRoot.paused);
  };

  const songIcon = isSongPlaying ? pauseIcon : playIcon;

  return (
    <button className="sound" onClick={toggleSong}>
      <img src={songIcon} alt="song toggle button" />
    </button>
  );
}

export default SongToggleButton;
