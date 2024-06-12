import PropTypes from "prop-types";


Header.propTypes = {
    name: PropTypes.string,
    handleClick: PropTypes.func,
    sprite: PropTypes.string,
  };



export default function Header({score, highestScore}) {
    
  
    return (
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
  );
}
