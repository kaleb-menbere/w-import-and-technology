import React from "react";
import { FaPlay } from "react-icons/fa"; // <-- import the icon
import "./GameCard.css"; // card styles

function GameCard({ name, img, link }) {
  return (
    <div className="game-card">
      <img src={img} alt={name} />
      <p>{name}</p>
      <button onClick={() => window.open(link, "_blank")}>
        PLAY NOW <FaPlay className="icon" />
      </button>
    </div>
  );
}

export default GameCard;
