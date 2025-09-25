import React from "react";
import "./Footer.css";
import { useLanguage } from '../../contexts/LanguageContext'; // Adjust path as needed
import { Link } from "react-router-dom";


function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="foot-links">
          <a href="#">
            {t('privacyPolicy')}
          </a>
          <Link to="terms">
            {t('termsConditions')}
          </Link>
          <a href="https://t.me/+uZq8ysM6FWA2ZWVk">
            {t('contactUs')}
          </a>
          <a href="#">
            {t('faq')}
          </a>
        </div>

        {/* Uncomment if you want the copyright */}
        {/* <div className="copy">
          {t('copyright')}
        </div> */}
      </div>
    </footer>
  );
}

export default Footer;