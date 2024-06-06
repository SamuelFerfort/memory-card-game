import PropTypes from "prop-types";

Card.propTypes = {
  name: PropTypes.string,
  handleClick: PropTypes.func,
  sprite: PropTypes.string,
};

function Card({ name, handleClick, sprite }) {
  return (
    <button key={name} className="card" name={name} onClick={handleClick}>
      <img src={sprite} alt={name} />
      <p>{name}</p>
    </button>
  );
}

export default Card;
