import React from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import "./LoginHeader.css";

function LoginHeader() {
  const { t, currentLang, toggleLanguage } = useLanguage();

  return (
    <header className="login-header">
      <div className="login-header-container">
        {/* Logo on the Left */}
        <div className="login-logo">
          <img src="/images/ethio_logo.svg" alt="Ethio-Tel" className="login-logo-img" />
        </div>
        
        {/* Language Toggle on the Right */}
        <div className="login-language-section">
        <button 
            className="login-lang-btn" 
            onClick={toggleLanguage}
          >
            {currentLang === 'en' ? 'አማርኛ|English' : 'English|አማርኛ'}
          </button>
        </div>
      </div>
    </header>
  );
}

export default LoginHeader;