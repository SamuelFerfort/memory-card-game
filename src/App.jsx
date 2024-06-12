import { useEffect, useState } from "react";
import "./App.css";
import { shuffle } from "./helper/helper";
import confetti from "canvas-confetti";
import PokemonCards from "./components/PokemonCards";
import Header from "./components/header";
import { fetchPokemonCards } from "./components/fetch";
import WinScreen from "./components/WinScreen";
import StartScreen from "./components/StartScreen";
import SongToggleButton from "./components/SongToggleButton";

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [score, setScore] = useState(0);
  const [clickedPokemon, setClickedPokemon] = useState([]);
  const [highestScore, setHighestScore] = useState(0);
  const [startGame, setStartGame] = useState(false);
  const [win, setWin] = useState(false);
  
  
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
  };

  const handleReset = () => {
    setWin(!win);
    setScore(0);
    setClickedPokemon([]);
  };

  if (win) return <WinScreen handleReset={handleReset} />;

  return (
    <div className="container">
      <SongToggleButton startGame={startGame} />

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
