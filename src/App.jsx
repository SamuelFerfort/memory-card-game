import { useEffect, useState } from "react";
import "./App.css";

let bestScore = 0;

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
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

  if (isLoading) {
    return <div>Loading...</div>;
  }
  const handleClick = () => {};

  return (
    <>
      <h1>Score: {score}</h1>
      <main>
        {pokemonData.map((pokemon) => (
          <Card
            key={pokemon.name}
            name={pokemon.name}
            img={pokemon.sprite}
            onClick={handleClick}
          ></Card>
        ))}
      </main>
    </>
  );
}

export default App;

function Card({ name, img, handleClick }) {
  return (
    <button className="card">
      <img src={img} alt={name} />
      <p>{name}</p>
    </button>
  );
}
