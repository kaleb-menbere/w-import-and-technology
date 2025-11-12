import './Header.css';
import { Link, NavLink, useNavigate } from 'react-router-dom';
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

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Desktop Header */}
      <header className="header desktop-header">
        <div className="nav-shell">
          {/* Left logo */}
          <div className="cap left-cap">
            <img src="/images/w.jpg" className="logo-img" alt="Daily Blog" />
          </div>

          {/* Center navigation - Desktop */}
          <nav className="green-bar">
            <NavLink
              to="/"
              end
              className={({ isActive }) => `links home ${isActive ? 'active' : ''}`}
            >
              {t('home')}
            </NavLink>
            
            {/* Categories Dropdown - ONLY PLACE FOR CATEGORIES */}
            <div className="dropdown">
              <span className="dropbtn links">{t('categories')} ▾</span>
              <div className="dropdown-content">
                <NavLink className={({ isActive }) => `categorys ${isActive ? 'active' : ''}`} to="/category/health-tips">
                  {t('healthTips')}
                </NavLink>
                <NavLink className={({ isActive }) => `categorys ${isActive ? 'active' : ''}`} to="/category/sport-news">
                  {t('sportNews')}
                </NavLink>
                <NavLink className={({ isActive }) => `categorys ${isActive ? 'active' : ''}`} to="/category/food-preparation">
                  {t('foodPreparation')}
                </NavLink>
              </div>
            </div>

            <NavLink
              to="/my-account"
              className={({ isActive }) => `my-account links ${isActive ? 'active' : ''}`}
            >
              {t('myAccount')}
            </NavLink>
            <button className="links logout-btn" onClick={handleLogout}>{t('logout')}</button>
            <button
              className="toggle-lang links lang-btn"
              onClick={toggleLanguage}
            >
              {currentLang === 'en' ? 'አማርኛ' : 'English'}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="mobile-header">
        <div className="mobile-header-row">
          <div className="mobile-logo-container">
            <img src="/images/w.jpg" className="mobile-logo-img" alt="Daily Blog" />
          </div>
          
          <div className="mobile-hamburger-container">
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
          </div>
        </div>
      </header>

      {/* Mobile Navigation - Full Screen Overlay */}
      <nav
        ref={mobileNavRef}
        className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}
      >
        <div className="mobile-nav-header">
          <img src="/images/w.jpg" className="mobile-logo" alt="Daily Blog" />
          <button className="mobile-close-btn" onClick={closeMobileMenu}>
            ✕
          </button>
        </div>

        <div className="mobile-nav-content">
          {/* Home Link */}
          <NavLink 
            className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`} 
            to="/" 
            onClick={closeMobileMenu}
          >
            {t('home')}
          </NavLink>

          {/* Categories Section - ONLY IN MOBILE DROPDOWN */}
          <div className="mobile-category-section">
            <div className="mobile-category-header">
              <h3>{t('categories')}</h3>
            </div>
            
            <NavLink 
              className={({ isActive }) => `mobile-nav-item category-item ${isActive ? 'active' : ''}`} 
              to="/category/health-tips" 
              onClick={closeMobileMenu}
            >
              <span className="category-icon">💄</span>
              {t('healthTips')}
            </NavLink>

            <NavLink 
              className={({ isActive }) => `mobile-nav-item category-item ${isActive ? 'active' : ''}`} 
              to="/category/sport-news" 
              onClick={closeMobileMenu}
            >
              <span className="category-icon">⚽</span>
              {t('sportNews')}
            </NavLink>

            <NavLink 
              className={({ isActive }) => `mobile-nav-item category-item ${isActive ? 'active' : ''}`} 
              to="/category/food-preparation" 
              onClick={closeMobileMenu}
            >
              <span className="category-icon">🍴</span>
              {t('foodPreparation')}
            </NavLink>
          </div>

          {/* Account & Other Links */}
          <div className="mobile-account-section">
            <NavLink 
              className={({ isActive }) => `mobile-nav-item account-item ${isActive ? 'active' : ''}`} 
              to="/my-account" 
              onClick={closeMobileMenu}
            >
              <span className="account-icon">👤</span>
              {t('myAccount')}
            </NavLink>
          </div>

          {/* Action Buttons */}
          <div className="mobile-actions-section">
            <button 
              className="mobile-nav-item language-btn" 
              onClick={() => {
                toggleLanguage();
                closeMobileMenu();
              }}
            >
              <span className="action-icon">🌐</span>
              {currentLang === 'en' ? 'Switch to Amharic' : 'Switch to English'}
            </button>

            <button 
              className="mobile-nav-item logout-btn" 
              onClick={() => {
                handleLogout();
                closeMobileMenu();
              }}
            >
              <span className="action-icon">🚪</span>
              {t('logout')}
            </button>
          </div>

          {/* Subscription Info */}
          <div className="mobile-subscription-info">
            <div className="subscription-badge">
              <span className="badge-icon">⭐</span>
              Daily Subscription Blog
            </div>
            <p className="subscription-text">
              Get fresh content every day!
            </p>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;