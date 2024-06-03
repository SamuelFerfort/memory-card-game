import { useEffect, useState } from "react";
import "./App.css";
import { capitalizeFirstLetter, shuffle } from "./helper/helper";

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [clickedPokemon, setClickedPokemon] = useState([]);
  const [highestScore, setHighestScore] = useState(0);
  const [startGame, setStartGame] = useState(false);
  useEffect(() => {
    const fetchPokemonCards = async () => {
      const localData = localStorage.getItem("pokemon");
      if (localData) {
        setPokemonData(JSON.parse(localData));
        setIsLoading(false);
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemonCards();
  }, []);

  const handleClick = (e) => {
    const name = e.currentTarget.name;

    if (clickedPokemon.includes(name)) {
      console.log("game over");
      if (score > highestScore) setHighestScore(score);
      setScore(0);
      setClickedPokemon([]);
      return;
    }
    if (score === 12) {
      console.log("You won");
    }
    setClickedPokemon([...clickedPokemon, name]);
    setScore(score + 1);
  };
  const handleStartClick = () => {
    setStartGame(!startGame);
    
  };
  const pokemonCards = shuffle(pokemonData);

  if (isLoading) {
    return <main>Loading...</main>;
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
          <button onClick={handleStartClick}>Start Game</button>
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
