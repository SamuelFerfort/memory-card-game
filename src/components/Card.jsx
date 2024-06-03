export default function Card({ name, handleClick, sprite }) {
    return (
      <button key={name} className="card" name={name} onClick={handleClick}>
        <img src={sprite} alt={name} />
        <p>{name}</p>
      </button>
    );
  }
  