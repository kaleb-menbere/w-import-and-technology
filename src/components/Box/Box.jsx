import React from "react";
import { FaHiking } from "react-icons/fa";
import GameCard from "./GameCard/Gamecard";
import "./Box.css"; // section/grid styles

const adventureGames = [
  { name: "Avalaunch", img: "/images/logo.png", link: "https://www.kidopia.et/esportsmix/content/Adventure/Avalaunch/index.html" },
  { name: "A Dungeon Adventure for Brave", img: "/images/logo.jpg", link: "https://www.kidopia.et/esportsmix/content/Adventure/ADungeonAdventurefortheBrave/index.html" },
  { name: "Alien Rivals", img: "/images/logo(1).png", link: "https://www.kidopia.et/esportsmix/content/Adventure/AlienRivals/index.html" },
  { name: "Angry Betty", img: "/images/logo(2).png", link: "https://www.kidopia.et/esportsmix/content/Adventure/AngryBetty/index.html" },
];

function Box() {
  return (
    <section className="games">
      <h2 className="section-title">CHASE THE QUEST  –----</h2>

      <div className="section-title">
        <h2 className="section-title-h2">
          <FaHiking className="clr" style={{ color: "#85c443", marginRight: "8px" }} />
          Adventure
        </h2>

        <a className="see-all" href="https://www.kidopia.et/Drr/ethtelco/adventure_games.php">
          See All
        </a>
      </div>

      <div className="game-grid">
        {adventureGames.map((game, index) => (
          <GameCard key={index} {...game} />
        ))}
      </div>
    </section>
  );
}

export default Box;
