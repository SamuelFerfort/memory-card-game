import PropTypes from "prop-types";

StartScreen.propTypes = {
  handleStartClick: PropTypes.func,
};

export default function StartScreen({ handleStartClick }) {
  return (
    <div className="start-container">
      <button className="reset" onClick={handleStartClick}>
        Start Game
      </button>
    </div>
  );
}
