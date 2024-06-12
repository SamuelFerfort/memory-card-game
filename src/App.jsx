import { useEffect, useState } from "react";
import "./App.css";
import { shuffle } from "./helper/helper";
import confetti from "canvas-confetti";
import song from "./assets/littleroot.mp3";
import playIcon from "./assets/soundOn.svg";
import pauseIcon from "./assets/soundOff.svg";
import Card from "./components/Card";
import Header from "./components/header";
import { fetchPokemonCards } from "./components/fetch";
function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [score, setScore] = useState(0);
  const [clickedPokemon, setClickedPokemon] = useState([]);
  const [highestScore, setHighestScore] = useState(0);
  const [startGame, setStartGame] = useState(false);
  const [win, setWin] = useState(false);
  const [littleRoot] = useState(new Audio(song));
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
    littleRoot.currentTime = 0;
    littleRoot.loop = true;
    littleRoot.volume = 0.2;
    littleRoot.play();
    setIsSongPlaying(!isSongPlaying);
  };

  const handleReset = () => {
    setWin(!win);
    setScore(0);
    setClickedPokemon([]);
  };

  const toggleSong = () => {
    if (isSongPlaying) {
      littleRoot.pause();
    } else {
      littleRoot.play();
    }
    setIsSongPlaying(!isSongPlaying);
  };

  const songIcon = isSongPlaying ? pauseIcon : playIcon;

  if (win) {
    return (
      <div className="resetScreen">
        <h1>You Win!</h1>
        <button className="reset" onClick={handleReset}>
          Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <button className="sound" onClick={toggleSong}>
        <img src={songIcon} alt="song toggle button" />
      </button>
      <Header score={score} highestScore={highestScore} />
      {startGame ? (
        <main>
          {pokemonData.map((pokemon) => (
            <Card key={pokemon.name} {...pokemon} handleClick={handleClick} />
          ))}
        </main>
      ) : (
        <div className="start-container">
          <button className="reset" onClick={handleStartClick}>
            Start Game
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
