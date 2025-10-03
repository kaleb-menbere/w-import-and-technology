import './Header.css';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext.jsx';
import { useState, useRef, useEffect } from 'react';

function Header() {
  const { t, toggleLanguage, currentLang } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const mobileNavRef = useRef(null);
  const hamburgerRef = useRef(null);

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

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside both mobile nav and hamburger button
      if (
        isMobileMenuOpen &&
        mobileNavRef.current &&
        !mobileNavRef.current.contains(event.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target)
      ) {
        closeMobileMenu();
      }
    };

    // Add event listener when mobile menu is open
    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent body scroll when mobile menu is open
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable body scroll when mobile menu is closed
      document.body.style.overflow = 'unset';
    }

    // Cleanup function
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="header">
      <div className="nav-shell">
        {/* Left logo */}
        <div className="cap left-cap">
          <img src="/images/ethio_telecom_logo.svg" className="" alt="Ethio Telecom" />
        </div>

        {/* Hamburger Menu Button */}
        <button 
          ref={hamburgerRef}
          className={`hamburger-menu ${isMobileMenuOpen ? 'open' : ''}`} 
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
          <Link className="links logout" to="/">{t('logout')}</Link>
          
          {/* Simplified Language Toggle Button */}
          <button 
            className="toggle-lang links" 
            onClick={toggleLanguage}
          >
            {currentLang === 'en' ? 'አማርኛ|English' : 'English|አማርኛ'}
          </button>
        </nav>

        {/* Right logo */}
        <div className="cap right-cap">
          <img className="kidopia " src="/images/kidopia-logo.png" alt="KIDOPIA" />
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav 
        ref={mobileNavRef}
        className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}
      >
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
        <Link className="active links logout" to="/" onClick={closeMobileMenu}>{t('logout')}</Link>
        
        {/* Simplified Mobile Language Toggle Button */}
        <button 
          className="toggle-lang links" 
          onClick={() => {
            toggleLanguage();
            closeMobileMenu();
          }}
        >
          {currentLang === 'en' ? 'አማርኛ|English' : 'English|አማርኛ'}
        </button>
      </nav>
    </header>
  );
}

export default Header;