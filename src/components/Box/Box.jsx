import React from "react";
import { FaHiking, FaPuzzlePiece, FaFootballBall, FaGamepad, FaFistRaised } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useLanguage } from '../../contexts/LanguageContext.jsx';
import GameCard from "./GameCard/Gamecard";
import "./Box.css";
import { useFrappeGetDocList } from "frappe-react-sdk";

// Known categories with their specific icons only
const KNOWN_CATEGORIES = {
  education: {
    icon: FaFistRaised,
  },
  adventure: {
    icon: FaHiking,
  },
  puzzle: {
    icon: FaPuzzlePiece,
  },
  sports: {
    icon: FaFootballBall,
  },
  reflex: {
    icon: FaGamepad,
  }
};

// Background colors in sequence: black, green, black, green...
const BACKGROUND_COLORS = ["#000", "#85c443"];

// Text colors that contrast with backgrounds
const TEXT_COLORS = ["#fff", "#fff"];
const HEADER_COLORS = ["#85c443", "#fff"];

// Specific icon colors for known categories
const KNOWN_CATEGORY_COLORS = {
  education: "#ff8c42",
  adventure: "#85c443",
  puzzle: "#ff6b6b",
  sports: "#4ecdc4",
  reflex: "#ffd93d"
};

// Default icon color for unknown categories
const DEFAULT_ICON_COLOR = "#85c443";

// NOTE: Static fallback game data removed per requirement to load from API

function Box({ categoryName, showAllGames = false, categoryData = [], index = 0 }) {
  const navigate = useNavigate();
  const { t } = useLanguage();

  console.log("Box received categoryName:", categoryName, "with data:", categoryData);

  // Use lowercase for consistency
  const categoryKey = categoryName?.toLowerCase() || "education";

  // Get background and text colors based on index (0,1,0,1,0,1...)
  const colorIndex = index % BACKGROUND_COLORS.length;
  const backgroundColor = BACKGROUND_COLORS[colorIndex];
  const textColor = TEXT_COLORS[colorIndex];
  const headerColor = HEADER_COLORS[colorIndex];

  // Check if this is a known category
  const knownCategory = KNOWN_CATEGORIES[categoryKey];

  // Use known category icon or fallback to FaGamepad
  const IconComponent = knownCategory?.icon || FaGamepad;

  // Use known category specific color or fallback to default icon color
  const iconColor = KNOWN_CATEGORY_COLORS[categoryKey] || DEFAULT_ICON_COLOR;

  // Load Category details from Frappe (Game Catagory)
  const {
    data: categoryDocs,
    isLoading: isCategoryLoading,
    error: categoryError,
  } = useFrappeGetDocList('Game Catagory', {
    fields: ['name', 'category_name', 'priority', 'icon', 'icon_color'],
    filters: [['category_name', 'like', `%${categoryKey}%`]],
    limit: 1,
  });

  const categoryDoc = categoryDocs && categoryDocs.length > 0 ? categoryDocs[0] : null;

  // Compute display name/title from category document or language fallback
  const name = (categoryDoc && categoryDoc.category_name) || t(categoryKey + 'Games') || categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1);
  const title = t(categoryKey + 'Title') || `${categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1)} Games`;

  // Load Games from Frappe (Game List) filtered by category
  const {
    data: gameDocs,
    isLoading: isGamesLoading,
    error: gamesError,
  } = useFrappeGetDocList('Game List', {
    fields: ['title', 'image', 'location', 'game_category'],
    // Attempt a case-insensitive filter match on the category name
    filters: [['game_category', 'like', `%${categoryKey}%`]],
    orderBy: { field: 'modified', order: 'desc' },
    limit: showAllGames ? 100 : 4,
  });

  // Map API fields to component props: title->name, image->img, location->link
  const gamesFromApi = (gameDocs || []).map((g) => ({
    name: g.title,
    img: g.image,
    link: g.location,
  }));

  const games = gamesFromApi;

  const handleSeeAllClick = (e) => {
    e.preventDefault();
    navigate(`/category/${categoryKey}`);
  };

  return (
    <section className="games" style={{ backgroundColor: backgroundColor }}>
      {/* Main section title */}
      <h2 className="section-title" style={{ color: headerColor }}>{title}</h2>

      {/* Header with icon, name, and see-all in one line */}
      <div className="section-header">
        <div className="title-container">
          <IconComponent className="clr" style={{ color: iconColor }} size="2em" />
          <h2 className="section-title-h2" style={{ color: textColor }}>
            {name.toUpperCase()}
          </h2>
        </div>
        {/* Show "See All" link that navigates to internal category page */}
        {!showAllGames && (
          <a
            className="see-all"
            href={`/category/${categoryKey}`}
            onClick={handleSeeAllClick}
            style={{ color: textColor }}
          >
            {t('seeAll')}
          </a>
        )}



      </div>

      {/* Loading and error states */}
      {(isCategoryLoading || isGamesLoading) && (
        <div className="loading" style={{ color: textColor }}>
          {t('loading') || 'Loading...'}
        </div>
      )}
      {(categoryError || gamesError) && (
        <div className="error" style={{ color: textColor }}>
          {t('failedToLoad') || 'Failed to load data.'}
        </div>
      )}

      <div className="game-grid">
        {games.map((game, index) => (
          <GameCard key={index} {...game} />
        ))}

        {/* Show message if no games available */}
        {games.length === 0 && (
          <div className="no-games-message" style={{ color: textColor }}>
            {t('noGamesAvailable') || 'No games available yet'}
          </div>
        )}
      </div>
    </section>
  );
}

export default Box;