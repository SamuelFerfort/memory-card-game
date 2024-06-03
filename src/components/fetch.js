import { capitalizeFirstLetter } from "../helper/helper";

export const fetchPokemonCards = async () => {
  const localData = localStorage.getItem("hoenn");
  let pokemonDetails;
  if (localData) {
    pokemonDetails = JSON.parse(localData);
  } else {
    const url = "https://pokeapi.co/api/v2/pokemon/";

    try {
      pokemonDetails = await Promise.all(
        IDs.map(async (id) => {
          const response = await fetch(`${url}${id}/`);

          const json = await response.json();

          return {
            name: capitalizeFirstLetter(json.name),
            sprite: json.sprites.other["official-artwork"].front_default,
          };
        })
      );
      localStorage.setItem("hoenn", JSON.stringify(pokemonDetails));
    } catch (err) {
      console.error("Error fetching Pokemon data", err);
    }
  }
  return pokemonDetails;
};

const IDs = [
  "257",
  "282",
  "306",
  "330",
  "334",
  "350",
  "359",
  "373",
  "376",
  "380",
  "381",
  "384",
];
