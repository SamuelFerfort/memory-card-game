import Card from "./Card";
import PropTypes from "prop-types";

PokemonCards.propTypes = {
  pokemonData: PropTypes.array,
  handleClick: PropTypes.func,
};

export default function PokemonCards({ pokemonData, handleClick }) {
  return (
    <main>
      {pokemonData.map((pokemon) => (
        <Card key={pokemon.name} {...pokemon} handleClick={handleClick} />
      ))}
    </main>
  );
}
