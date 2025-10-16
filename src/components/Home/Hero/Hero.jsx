import './Hero.css';
import { FaPlay } from "react-icons/fa";
import { useLanguage } from '../../../contexts/LanguageContext.jsx';

function Hero() {
    const { t } = useLanguage();

    return ( 
    <section className="hero">
        <div className="hero-container">
            <div className="hero-inner">
                <div className="hero-copy">
                    <h1 className="hero-title">
                        {t('heroTitle')}
                    </h1>
                    <p className="hero-description">
                        {t('heroDescription')}
                    </p>
                    <div className="hero-cta">
                    </div>
                </div>

                <div className="hero-art">
                    <img
                    src="/images/images.svg"
                    alt="Characters"
                    />
                </div>
            </div>
        </div>
    </section>
    );
}

export default Hero;