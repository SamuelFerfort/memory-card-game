import { useEffect, useState } from "react";
import "./App.css";
import { capitalizeFirstLetter, shuffle } from "./helper/helper";
import confetti from "canvas-confetti";
import song from "./assets/littleroot.mp3";

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [score, setScore] = useState(0);
  const [clickedPokemon, setClickedPokemon] = useState([]);
  const [highestScore, setHighestScore] = useState(0);
  const [startGame, setStartGame] = useState(false);
  const [win, setWin] = useState(false);
  const [littleroot] = useState(new Audio(song));
  
  
  useEffect(() => {
    const fetchPokemonCards = async () => {
      const localData = localStorage.getItem("pokemon");
      if (localData) {
        setPokemonData(JSON.parse(localData));
        return;
      }
      const url = "https://pokeapi.co/api/v2/pokemon/?offset=20&limit=12";

      try {
        const res = await fetch(url);
        const data = await res.json();

        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const response = await fetch(pokemon.url);

            const json = await response.json();

            return {
              name: capitalizeFirstLetter(json.name),
              sprite: json.sprites.other["official-artwork"].front_default,
            };
          })
        );
        setPokemonData(pokemonDetails);
        localStorage.setItem("pokemon", JSON.stringify(pokemonDetails));
      } catch (err) {
        console.error("Error fetching Pokemon data", err);
      }
    };

    fetchPokemonCards();
  }, []);

  const handleClick = (e) => {
    const name = e.currentTarget.name;

    // Game Over
    if (clickedPokemon.includes(name)) {
      console.log("game over");
      if (score > highestScore) setHighestScore(score);
      setScore(0);
      setClickedPokemon([]);
      return;
    }

    // Win
    if (score + 1 === 12) {
      console.log("You won");
      setWin(!win);
      setHighestScore(12);
      confetti();
    }

    // Continue
    setClickedPokemon([...clickedPokemon, name]);
    setScore(score + 1);
  };

  const handleStartClick = () => {
    setStartGame(!startGame);
    littleroot.loop = true;
    littleroot.volume = 0.2;
    littleroot.play();
  };

  const handleReset = () => {
    setWin(!win);
    setScore(0);
    setClickedPokemon([]);
  };
  const pokemonCards = shuffle(pokemonData);

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
      <header>
        <h1>Pokemon Memory Game</h1>
        <span>
          Get points by clicking a Pokemon but don't click it more than once!
        </span>
        <div className="score">
          <span>Score:{score}</span>
          <span>Highest Score:{highestScore}</span>
        </div>
      </header>
      {startGame ? (
        <main>
          {pokemonCards.map((pokemon) => (
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

function Card({ name, handleClick, sprite }) {
  return (
    <button key={name} className="card" name={name} onClick={handleClick}>
      <img src={sprite} alt={name} />
      <p>{name}</p>
    </button>
  );
}
