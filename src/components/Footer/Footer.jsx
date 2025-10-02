import React from "react";
import "./Footer.css";
import { useLanguage } from '../../contexts/LanguageContext';
import { Link } from "react-router-dom";

function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-links">
          <Link to="/login" className="footer-link">
            Login
          </Link>
          <Link to="/terms" className="footer-link">
            {t('termsConditions')}
          </Link>
          <a href="https://t.me/+uZq8ysM6FWA2ZWVk" className="footer-link">
            {t('contactUs')}
          </a>
          <a href="#" className="footer-link">
            {t('faq')}
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;