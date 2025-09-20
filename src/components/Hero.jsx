    import './Hero.css';

    function Hero() {
    return ( 
    <section className="hero">
        <div className="container hero-inner">
        <div className="hero-copy">
            <h1
            data-en="Your Ultimate Destination for Online Gaming"
            data-am="ለኦንላይን ጨዋታዎች የመጨረሻ መድረሻዎ"
            >
            YOUR ULTIMATE DESTINATION FOR ONLINE GAMING
            </h1>
            <p
            data-en="Experience the ultimate gaming universe with KIDOPIA, featuring 100+ high quality, premium HTML5 games featuring Action, Arcade, Sports and Adventure Enthusiasts."
            data-am="ከ 100 በላይ የ Android እና HTML አስደሳች እና አስቂኝ ጨዋታዎች በአንድ ቦታ በ Kidopia የጨዋታ አለም ያግኙ።"
            >
            Experience the ultimate gaming universe with KIDOPIA, featuring 100+ high quality, premium HTML5 games featuring Action, Arcade, Sports and Adventure Enthusiasts.
            </p>
            <div className="hero-cta">
            <a
                className="btn"
                href="https://www.kidopia.et/Drr/ethtelco/kidopia_home.php#"
                data-en="Play Now"
                data-am="አሁኑኑ ይጫወቱ"
            >
                Play Now
                <i className="fa-solid fa-play" style={{ marginRight: "8px" }}></i>
            </a>
            {/* <a class="btn alt" href="#">Browse Games</a> */}
            </div>
        </div>


        
        <div className="hero-art">
            {/* Replace with your artwork */}
            <img
            src="/images/images.svg"
            alt="Characters"
            />
        </div>
        </div>
    </section>

    );
    }

    export default Hero;

