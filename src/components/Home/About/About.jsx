import React from "react";
import "./About.css"; // Optional CSS file for styling

function About() {
  return (
    <section className="about">
      <img src="/images/exact_embed.png" alt="Character" />
      <div className="about-text">
        <p className="about-kidopia">ABOUT KIDOPIA ----</p>
        <h2
          data-en="EXPERIENCE NEXT-LEVEL ENTERTAINMENT WITH KIDOPIA – YOUR ULTIMATE PREMIUM HTML5 GAMING PORTAL."
          data-am="የቀጣይ ደረጃ መዝናኛን ከKIDOPIA ጋር ይለማመዱ - የእርስዎ የመጨረሻው ፕሪሚየም HTML5 ጨዋታ መግቢያ።"
        >
          EXPERIENCE NEXT-LEVEL ENTERTAINMENT WITH KIDOPIA – YOUR ULTIMATE PREMIUM HTML5 GAMING PORTAL.
        </h2>
        <p
          data-en="Play hundreds of high-quality games instantly — no downloads, no waiting, just pure fun. Fast, sleek, and built for any device, KIDOPIA turns every moment into a gaming adventure."
          data-am="በመቶዎች የሚቆጠሩ ከፍተኛ ጥራት ያላቸውን ጨዋታዎችን በቅጽበት ይጫወቱ - ምንም ማውረድ፣ መጠበቅ የለም፣ ንጹህ አዝናኝ ብቻ። ፈጣን፣ ቄንጠኛ እና ለማንኛውም መሳሪያ የተሰራ KIDOPIA እያንዳንዱን አፍታ ወደ የጨዋታ ጀብዱነት ይቀየራል።"
        >
          Play hundreds of high-quality games instantly — no downloads, no waiting, just pure fun. Fast, sleek, and built for any device, KIDOPIA turns every moment into a gaming&nbsp;adventure.
        </p>
      </div>
    </section>
  );
}

export default About;
