import PropTypes from "prop-types";

Header.propTypes = {
  score: PropTypes.number,
  highestScore: PropTypes.number,
};

export default function Header({ score, highestScore }) {
  return (
    <header>
      <h1>Pokemon Memory Game</h1>
      <span>
        Get points by clicking a Pokemon but don&#39;t click it more than once!
      </span>
      <div className="score">
        <span>Score:{score}</span>
        <span>Highest Score:{highestScore}</span>
      </div>
    </header>
  );
}
