import { useEffect, useState } from "react";
import "./App.css";
import { shuffle } from "./helper/helper";
import confetti from "canvas-confetti";
import song from "./assets/littleroot.mp3";
import playIcon from "./assets/soundOn.svg";
import pauseIcon from "./assets/soundOff.svg";
import PokemonCards from "./components/PokemonCards";
import Header from "./components/header";
import { fetchPokemonCards } from "./components/fetch";
import WinScreen from "./components/WinScreen";
import StartScreen from "./components/StartScreen";

const littleRoot = new Audio(song);
littleRoot.loop = true;
littleRoot.volume = 0.2;

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [score, setScore] = useState(0);
  const [clickedPokemon, setClickedPokemon] = useState([]);
  const [highestScore, setHighestScore] = useState(0);
  const [startGame, setStartGame] = useState(false);
  const [win, setWin] = useState(false);
  const [isSongPlaying, setIsSongPlaying] = useState(false);
  useEffect(() => {
    fetchPokemonCards().then(setPokemonData);
  }, []);

  const handleClick = (e) => {
    const name = e.currentTarget.name;

    const shuffledPokemonData = shuffle(pokemonData);

    // Game Over
    if (clickedPokemon.includes(name)) {
      setScore(0);
      setClickedPokemon([]);
      return;
    }

    // Win
    if (score + 1 === 12) {
      setWin(!win);
      setHighestScore(12);
      confetti();
    }

    // Continue
    if (score + 1 > highestScore) setHighestScore(score + 1);
    setClickedPokemon([...clickedPokemon, name]);
    setScore(score + 1);
    setPokemonData(shuffledPokemonData);
  };

  const handleStartClick = () => {
    setStartGame(!startGame);
    littleRoot.pause();

    littleRoot.play();
    setIsSongPlaying(!isSongPlaying);
  };

  const handleReset = () => {
    setWin(!win);
    setScore(0);
    setClickedPokemon([]);
  };

  const toggleSong = () => {
    littleRoot.paused ? littleRoot.play() : littleRoot.pause();
    setIsSongPlaying(!isSongPlaying);
  };

  const songIcon = isSongPlaying ? pauseIcon : playIcon;

  if (win) return <WinScreen handleReset={handleReset} />;

  return (
    <div className="container">
      <button className="sound" onClick={toggleSong}>
        <img src={songIcon} alt="song toggle button" />
      </button>

      <Header score={score} highestScore={highestScore} />

      {startGame ? (
        <PokemonCards pokemonData={pokemonData} handleClick={handleClick} />
      ) : (
        <StartScreen handleStartClick={handleStartClick} />
      )}
    </div>
  );
}

export default App;
