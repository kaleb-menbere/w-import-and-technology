import './Header.css';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext.jsx';
import { useState } from 'react';

function Header() {
  const { t, toggleLanguage, currentLang } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleMobileDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  };

  return (
    <header className="header">
      <div className="nav-shell">
        {/* Left logo */}
        <div className="cap left-cap">
          <img src="/images/ethio_telecom_logo.svg" alt="Ethio Telecom" />
        </div>

        {/* Hamburger Menu Button */}
        <button 
          className="hamburger-menu" 
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Center navigation - Desktop */}
        <nav className="green-bar">
          <Link className="active links home" to="/">{t('home')}</Link>

          <div className="dropdown">
            <span className="dropbtn links">{t('gameCategory')} ▾</span>
            <div className="dropdown-content">
              <Link className="categorys" to="/category/action">{t('actionGames')}</Link>
              <Link className="categorys" to="/category/adventure">{t('adventureGames')}</Link>
              <Link className="categorys" to="/category/arcade">{t('arcadeGames')}</Link>
              <Link className="categorys" to="/category/sports">{t('sportsGames')}</Link>
              <Link className="categorys" to="/category/puzzle">{t('puzzleGames')}</Link>
            </div>
          </div>

          <Link className="my-account links" to="/">{t('myAccount')}</Link>
          
          <button 
            className="toggle-lang links" 
            onClick={toggleLanguage}
            style={{ 
              background: 'none', 
              color: 'white',
              border: 'none',  
              cursor: 'pointer',
              fontSize: '23px',
              padding: 0
            }}
          >
            {currentLang === 'en' ? 'አማርኛ|English' : 'English|አማርኛ'}
          </button>
        </nav>

        {/* Right logo */}
        <div className="cap right-cap">
          <img className="kidopia" src="/images/kidopia-logo.png" alt="KIDOPIA" />
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
        <Link className="links home" to="/" onClick={closeMobileMenu}>{t('home')}</Link>
        
        {/* Mobile Dropdown Container */}
        <div className="mobile-dropdown-container">
          <button className="mobile-dropdown-btn" onClick={toggleMobileDropdown}>
            {t('gameCategory')} {isDropdownOpen ? '▴' : '▾'}
          </button>
          
          {/* Dropdown content now appears right below the button */}
          <div className={`mobile-dropdown-content ${isDropdownOpen ? 'open' : ''}`}>
            <Link className="categorys" to="/category/action" onClick={closeMobileMenu}>{t('actionGames')}</Link>
            <Link className="categorys" to="/category/adventure" onClick={closeMobileMenu}>{t('adventureGames')}</Link>
            <Link className="categorys" to="/category/arcade" onClick={closeMobileMenu}>{t('arcadeGames')}</Link>
            <Link className="categorys" to="/category/sports" onClick={closeMobileMenu}>{t('sportsGames')}</Link>
            <Link className="categorys" to="/category/puzzle" onClick={closeMobileMenu}>{t('puzzleGames')}</Link>
          </div>
        </div>

        <Link className="links my-account" to="/" onClick={closeMobileMenu}>{t('myAccount')}</Link>
        
        <button 
          className="links toggle-lang-mobile" 
          onClick={() => {
            toggleLanguage();
            closeMobileMenu();
          }}
          style={{ 
            background: 'none', 
            color: 'white',
            border: 'none',  
            cursor: 'pointer',
            fontSize: '18px',
            padding: '15px 20px',
            textAlign: 'left',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          {currentLang === 'en' ? 'አማርኛ|English' : 'English|አማርኛ'}
        </button>
      </nav>
    </header>
  );
}

export default Header;