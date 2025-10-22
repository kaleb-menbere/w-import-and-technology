import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext.jsx';
import { useAuth } from '../../contexts/AuthContext';
import { useState, useRef, useEffect } from 'react';

function Header() {
  const { t, toggleLanguage, currentLang } = useLanguage();
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
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

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      navigate('/login');
    }
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
    <div className="header-wrapper">
      <header className="header">
        <div className="nav-shell">
          {/* Left logo */}
          <div className="cap left-cap">
            <img src="/images/ethio_telecom_logo.svg" className="" alt="Ethio Telecom" />
          </div>

<div className="mobile-top-bar mobile-top-bar-small">
  <Link className="links home" to="/">{t('home')}</Link>
  <button 
    className="toggle-lang links" 
    onClick={() => {
      toggleLanguage();
      closeMobileMenu();
    }}
  >
    {currentLang === 'en' ? 'አማርኛ' : 'English'}
  </button>
</div>

          {/* Center navigation - Desktop */}
          <nav className="green-bar">
            <Link className="active links home" to="/">{t('home')}</Link>

            <div className="dropdown">
              <span className="dropbtn links">{t('gameCategory')} ▾</span>
              <div className="dropdown-content">
                <Link className="categorys" to="/category/adventure">{t('adventureGames')}</Link>
                <Link className="categorys" to="/category/education">{t('educationGames')}</Link>
                <Link className="categorys" to="/category/puzzle">{t('puzzleGames')}</Link>
                <Link className="categorys" to="/category/reflex">{t('reflexGames')}</Link>
                <Link className="categorys" to="/category/sports">{t('sportsGames')}</Link>
              </div>
            </div>

            <Link className="my-account links" to="/my-account">{t('myAccount')}</Link>
            <Link className='links' to='/about'>{t('about')}</Link>
            <Link className="links logout" onClick={handleLogout}>{t('logout')}</Link>
            
            {/* Simplified Language Toggle Button */}
            <button 
              className="toggle-lang links" 
              onClick={toggleLanguage}
            >
              {currentLang === 'en' ? 'አማርኛ' : 'English'}
            </button>
          </nav>

          {/* Right logo */}
          <div className="cap right-cap">
            <img className="kidopia " src="/images/kidopia-logo.png" alt="KIDOPIA" />
          </div>
        </div>
      </header>

      {/* Hamburger Row - Second Row */}
      <div className="hamburger-row">
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
              {/* Mobile Navigation */}
       <nav 
        ref={mobileNavRef}
        className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}
       >
        
        {/* Mobile Dropdown Container */}
        <div className="mobile-dropdown-container">
          <button className="mobile-dropdown-btn" onClick={toggleMobileDropdown}>
            {t('gameCategory')} {isDropdownOpen ? '▴' : '▾'}
          </button>
          
          {/* Dropdown content now appears right below the button */}
          <div className={`mobile-dropdown-content ${isDropdownOpen ? 'open' : ''}`}>
            
          <Link className="categorys" to="/category/adventure" onClick={closeMobileMenu}>{t('adventureGames')}</Link>
            <Link className="categorys" to="/category/education" onClick={closeMobileMenu}>{t('educationGames')}</Link>
            <Link className="categorys" to="/category/puzzle" onClick={closeMobileMenu}>{t('puzzleGames')}</Link>
            <Link className="categorys" to="/category/reflex" onClick={closeMobileMenu}>{t('reflexGames')}</Link>
            <Link className="categorys" to="/category/sports" onClick={closeMobileMenu}>{t('sportsGames')}</Link>
          </div>
          <Link className="mobile-dropdown-btn links my-account" to="/my-account" onClick={closeMobileMenu}>{t('myAccount')}</Link>
          <Link className="mobile-dropdown-btn links" to="/about" onClick={closeMobileMenu}>{t('about')}</Link>
        <button className="mobile-dropdown-btn active  logout" onClick={() => { handleLogout(); closeMobileMenu(); }}>{t('logout')}</button>
        </div>


       </nav>
      </div>


    </div>
  );
}

export default Header;