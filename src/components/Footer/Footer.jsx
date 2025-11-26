import './Footer.css';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

function Footer() {
  const { t, currentLang } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Main Footer Section */}
        <div className="footer-main">
          {/* Brand Section */}
          <div className="footer-brand">
            <div className="footer-logo">
              <img src="/images/w.jpg" alt="W Import and Technology" className="logo-img" />
              <div className="brand-text">
                <span className="brand-name">W-Import and Technology</span>
              </div>
            </div>
            <p className="footer-description">
              {currentLang === 'am' 
                ? 'የጤናና ውበት፣ ስፖርት እና ምግብ አሰራር ብሎግ'
                : 'Health and Beauty, Sports News & Food Preparation Blog'
              }
            </p>
          </div>

          {/* Categories */}
          <div className="footer-links">
            <h3 className="footer-heading">{t('categories')}</h3>
            <ul className="footer-list">
              <li>
                <Link to="/category/health-tips" className="footer-link">
                  <span className="link-icon">💄</span>
                  {t('healthTips')}
                </Link>
              </li>
              <li>
                <Link to="/category/sport-news" className="footer-link">
                  <span className="link-icon">⚽</span>
                  {t('sportNews')}
                </Link>
              </li>
              <li>
                <Link to="/category/food-preparation" className="footer-link">
                  <span className="link-icon">🍴</span>
                  {t('foodPreparation')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h3 className="footer-heading">
              {currentLang === 'am' ? 'ፈጣን አገናኞች' : 'Quick Links'}
            </h3>
            <ul className="footer-list">
              <li>
                <Link to="/" className="footer-link">
                  <span className="link-icon">🏠</span>
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link to="/my-account" className="footer-link">
                  <span className="link-icon">👤</span>
                  {t('myAccount')}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="footer-link">
                  <span className="link-icon">📄</span>
                  {t('termsConditions')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-contact">
            <h3 className="footer-heading">
              {currentLang === 'am' ? 'አግኙን' : 'Contact'}
            </h3>
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <span>0116166969</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">✉️</span>
                <span>amhagroupcontact@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>© {currentYear} W Import and Technology. {t('allRightsReserved')}</p>
          </div>
          
          <div className="footer-legal">
            <Link to="/terms" className="legal-link">
              {t('termsConditions')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;