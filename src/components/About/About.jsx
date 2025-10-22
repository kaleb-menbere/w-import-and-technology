import React from "react";
import "./About.css";
import { useLanguage } from '../../contexts/LanguageContext.jsx'; // Adjust path as needed

function About() {
  const { t } = useLanguage();

  return (
    <dev>
    <section className="about">
      <img src="/images/exact_embed.png" alt="Character" />
      <div className="about-text">
        <p className="about-kidopia">{t('aboutKidopia')}</p>
        <h2>
          {t('aboutTitle')}
        </h2>
        <p>
          {t('aboutDescription')}
        </p>
      </div>
    </section>
    </dev>
  );
}

export default About;