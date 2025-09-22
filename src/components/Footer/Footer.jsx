import React from "react";
import "./Footer.css"; // import your styles

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="foot-links">
        <a 
        href="#"
        data-en="Privacy Policy"
        data-am="የግለሰቦች ፖሊሲ"
        >
          Privacy Policy
        </a>
          <a
            href="#"
            data-en="Terms & Conditions"
            data-am="ውሎች እና ሁኔታዎች"
          >
            Terms & Conditions
          </a>
          <a
            href="https://t.me/+uZq8ysM6FWA2ZWVk"
            data-en="Contact Us"
            data-am="ያግኙን"
          >
            Contact Us
          </a>
          <a 
        href="#"
        data-en="FAQ"
        data-am=""
        >
          FAQ
        </a>
        </div>

        {/* Uncomment if you want the copyright */}
        {/* <div
          className="copy"
          data-en="© ETHIO TELECOM KIDOPIA 2025, ALL RIGHTS RESERVED"
          data-am="© ኢትዮ ቴሌኮም KIDOPIA 2025፣ መብቱ በህግ የተጠበቀ ነው።"
        >
          © ETHIO TELECOM KIDOPIA 2025, ALL RIGHTS RESERVED
        </div> */}
      </div>
    </footer>
  );
}

export default Footer;
