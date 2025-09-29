import React from "react";
import { FaHiking, FaPuzzlePiece, FaFootballBall, FaGamepad, FaFistRaised } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import GameCard from "./GameCard/Gamecard";
import "./Box.css";

// Category configuration - titles and metadata
const categoryConfig = {
  action: {
    name: "Action",
    title: "ACTION PACKED –----",
    icon: FaFistRaised,
    iconColor: "#ff8c42",
    backgroundColor : "#000"
  },
  adventure: {
    name: "Adventure",
    title: "CHASE THE QUEST –----",
    icon: FaHiking,
    iconColor: "#85c443",
    backgroundColor : "#000",
  },
  puzzle: {
    name: "Puzzle",
    title: "CRACK THE CODE –----",
    icon: FaPuzzlePiece,
    iconColor: "#ff6b6b",
    backgroundColor : "#85c443",
    textColor : "#000"
  },
  sports: {
    name: "Sports",
    title: "SPORTS CHALLENGE –----",
    icon: FaFootballBall,
    iconColor: "#4ecdc4",
    backgroundColor : "#000",
  },
  arcade: {
    name: "Arcade",
    title: "ARCADE FUN –----",
    icon: FaGamepad,
    iconColor: "#ffd93d",
    backgroundColor : "#85c443",
    textColor : "#000"
  }
};

// Game data for each category
const gameData = {
  action: [
    { name: "Potty Plan", img: "/images/gpotty_plan.jpg", link: "https://www.kidopia.et/esportsmix/content/Action/game1.html" },
    { name: "Turtules", img: "/images/gturtles.jpg", link: "https://www.kidopia.et/esportsmix/content/Action/game2.html" },
    { name: "Mighty Raju", img: "/images/gmighty_raju.png", link: "https://www.kidopia.et/esportsmix/content/Action/game3.html" },
  ],
  adventure: [
    { name: "Avalaunch", img: "/images/gava_launch.png", link: "https://www.kidopia.et/esportsmix/content/Adventure/Avalaunch/index.html" },
    { name: "A Dungeon Adventure for Brave", img: "/images/logo.jpg", link: "https://www.kidopia.et/esportsmix/content/Adventure/ADungeonAdventurefortheBrave/index.html" },
    { name: "Alien Rivals", img: "/images/logo(1).png", link: "https://www.kidopia.et/esportsmix/content/Adventure/AlienRivals/index.html" },
    { name: "Angry Betty", img: "/images/logo(2).png", link: "https://www.kidopia.et/esportsmix/content/Adventure/AngryBetty/index.html" },
  ],
  puzzle: [
    { name: "Lung Defender", img: "/images/logo(3).png", link: "#" },
    { name: "Water Sons", img: "/images/gwater_sons.png", link: "#" },
  ],
  sports: [
    { name: "Maighty Raju", img: "/images/gmighty_raju.png", link: "#" },
    { name: "Bouncy Cubs", img: "/images/gbouncy_cubs.png", link: "#" },
  ],
  arcade: [
    { name: "Beary Rapids", img: "/images/gbeary_rapids.png", link: "#" },
    { name: "44 Chats", img: "/images/g44chats.png", link: "#" },
  ]
};

function Box({ categoryName, showAllGames = false }) {
  const navigate = useNavigate();

  console.log("Box received categoryName:", categoryName);

  // Use lowercase for consistency
  const categoryKey = categoryName?.toLowerCase() || "action";

  // Get category configuration
  const category = categoryConfig[categoryKey] || {
    name: categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1),
    title: `${categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1)} –----`,
    icon: FaGamepad,
    color: "#ff8c42"
  };

  const { name, title, icon: IconComponent, iconColor, backgroundColor, textColor } = category;

  // If showAllGames is true (category page), show all games. If false (homepage), show limited games.
  const allGames = gameData[categoryKey] || [];
  const games = showAllGames ? allGames : allGames.slice(0, 4);

  const handleSeeAllClick = (e) => {
    e.preventDefault();
    navigate(`/category/${categoryKey}`);
  };

  return (
    <section className="games" style={{ backgroundColor: backgroundColor }}>
      <h2 className="section-title" style={{ color: textColor }}>{title}</h2>

      <div className="section-header" >
        <h2 className="section-title-h2" style={{ color: textColor }}>
          <IconComponent className="clr" style={{ color: iconColor, marginRight: "8px" }} />
          {name}
        </h2>

        {/* Show "See All" link that navigates to internal category page */}
        {!showAllGames && (
          <a
            className="see-all"
            href={`/category/${categoryKey}`}
            onClick={handleSeeAllClick}
          >
            See All
          </a>
        )}
      </div>

      <div className="game-grid">
        {games.map((game, index) => (
          <GameCard key={index} {...game} />
        ))}
      </div>
    </section>
  );
}

export default Box;