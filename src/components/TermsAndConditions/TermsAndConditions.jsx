import React from "react";
import { useLanguage } from "../../contexts/LanguageContext";  // ✅ use hook, not provider
import './TermsAndConditions.css'



const TermsAndConditions = () => {
  const { t } = useLanguage();  // ✅ correct

  return (
    <div className="terms-page">

      <div className="terms-banner">
        <h1>{t("termsTitle")}</h1>
        <p>{t("termsDescription")}</p>
      </div>

      {/* Section 1 */}
      <div className="section-title2">{t("section1")}</div>
      <div className="section-content">
        <p>{t("section1Content")}</p>
      </div>

      {/* Section 2 */}
      <div className="section-title2">{t("section2")}</div>
      <div className="section-content">
        <p>{t("section2Content")}</p>
      </div>

      {/* Section 3 */}
      <div className="section-title2">{t("section3")}</div>
      <div className="section-content">
        <p>{t("section3Content")}</p>
        <ul>
          <li>{t("restriction1")}</li>
          <li>{t("restriction2")}</li>
          <li>{t("restriction3")}</li>
          <li>{t("restriction4")}</li>
          <li>{t("restriction5")}</li>
          <li>{t("restriction6")}</li>
          <li>{t("restriction7")}</li>
          <li>{t("restriction8")}</li>
        </ul>
      </div>

      {/* Section 4 */}
      <div className="section-title2">{t("section4")}</div>
      <div className="section-content">
        <p>{t("section4Content")}</p>
      </div>

      {/* Section 5 */}
      <div className="section-title2">{t("section5")}</div>
      <div className="section-content">
        <p>{t("section5Content")}</p>
      </div>

      {/* Section 6 */}
      <div className="section-title2">{t("section6")}</div>
      <div className="section-content">
        <p>{t("section6Content")}</p>
      </div>

      {/* Section 7 */}
      <div className="section-title2">{t("section7")}</div>
      <div className="section-content">
        <p>{t("section7Content")}</p>
      </div>

      {/* Section 8 */}
      <div className="section-title2">{t("section8")}</div>
      <div className="section-content">
        <p>{t("section8Content")}</p>
      </div>

    </div>
  );
};

export default TermsAndConditions;
