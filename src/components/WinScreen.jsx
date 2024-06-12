import PropTypes from "prop-types";

WinScreen.propTypes = {
  handleReset: PropTypes.func,
};

export default function WinScreen({ handleReset }) {
  return (
    <div className="resetScreen">
      <h1>You Win!</h1>
      <button className="reset" onClick={handleReset}>
        Play Again
      </button>
    </div>
  );
}
