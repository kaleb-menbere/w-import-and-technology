import React, { useState, useEffect } from "react";
import "./Login.css";

export default function LoginPage() {
  const [lang, setLang] = useState(sessionStorage.getItem("lang") || "en");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOTP, setGeneratedOTP] = useState(null);
  const [otpEnabled, setOtpEnabled] = useState(false);
  const [messages, setMessages] = useState({ error: "", success: "", expire: "" });
  const [agreeTnc, setAgreeTnc] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const i18n = {
    en: {
      welcome: "WELCOME TO KIDOPIA",
      login: "Login",
      description: "Verify your phone number by entering the code we sent you via SMS",
      phone_placeholder: "xxxxxxxx",
      pin_placeholder: "PIN",
      invalid_phone: "Please enter a valid phone number",
      otp_mismatch_len: (n) => `PIN must be exactly ${n} digits`,
      otp_mismatch_code: "Please enter a valid PIN",
      login_success: "Login successful! 🎉 Redirecting...",
      resend_in: (s) => `Resend in ${s}s`,
      send_code: "SEND CODE",
      resend_pin: "Resend PIN",
      consent: "By continuing, you agree to Ethio telecom's",
      terms: "terms and conditions",
      login_btn: "LOGIN",
      trial: "Enjoy a 3-day free trial for your first Registration",
      contact: "Contact Us",
      help: "Help Desk : 251 970 305 059"
    },
    am: {
      welcome: "እንኳን ወደ Kidopia በደህና መጡ",
      login: "ለመመዝገብ",
      description: "በSMS የተላከልዎን ኮድ በማስገባት ስልክ ቁጥርዎን ያረጋግጡ",
      phone_placeholder: "xxxxxxxx",
      pin_placeholder: "ፒን",
      invalid_phone: "እባክዎ ትክክለኛ የስልክ ቁጥር ያስገቡ",
      otp_mismatch_len: (n) => `ፒን ትክክለኛ የ ${n} አሃዝ መሆን አለበት`,
      otp_mismatch_code: "እባክዎ ትክክለኛውን ፒን ያስገቡ",
      login_success: "ግባ ተሳክቷል! 🎉 በቅርብ ጊዜ እየተሻገረ ነው...",
      resend_in: (s) => `በ ${s} ሰከንዶች ዳግም ላክ`,
      send_code: "ኮድ ላክ",
      resend_pin: "በድጋሚ ላክ",
      consent: "በመቀጠል፤ የኢትዮ ቴሌኮም ዉሎችን ተስማምተዋል",
      terms: "ደንቦች",
      login_btn: "ግባ",
      trial: "ለመጀመሪያ ምዝገባዎ 3 ቀን በነፃ ይጠቀሙ",
      contact: "ያግኙን",
      help: "Help Desk : 251 970 305 059"
    }
  };

  useEffect(() => {
    sessionStorage.setItem("lang", lang);
  }, [lang]);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleSendCode = () => {
    if (phone.length < 9) {
      setMessages({ error: i18n[lang].invalid_phone, success: "", expire: "" });
      return;
    }

    const otpCode = Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * 10)
    ).join("");
    setGeneratedOTP(otpCode);
    console.log("Simulated OTP:", otpCode);

    setOtpEnabled(true);
    setMessages({ error: "", success: i18n[lang].send_code, expire: "" });
    setCountdown(60);

    setTimeout(() => {
      setGeneratedOTP(null);
      setOtp("");
      setOtpEnabled(false);
      setMessages({ error: "", success: "", expire: i18n[lang].resend_pin });
    }, 60000);
  };

  const handleLogin = () => {
    if (!otpEnabled) return;
    if (!generatedOTP) {
      setMessages({ error: "", success: "", expire: i18n[lang].resend_pin });
      return;
    }
    if (otp.length !== 6) {
      setMessages({ error: i18n[lang].otp_mismatch_len(6), success: "", expire: "" });
      return;
    }
    if (otp !== generatedOTP) {
      setMessages({ error: i18n[lang].otp_mismatch_code, success: "", expire: "" });
      return;
    }

    setMessages({ error: "", success: i18n[lang].login_success, expire: "" });
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 1500);
  };

  const t = i18n[lang];

  return (
    <div className="kidopia-login-page">
      {/* ===== Hero Section ===== */}
      <section className="kidopia-hero">
        <div className="kidopia-container kidopia-hero-inner">
          <div className="kidopia-hero-left">
            <img src="/images/images.svg" alt="Kidopia Characters" />
          </div>
          
          <div className="kidopia-card">
            <div className="kidopia-card-header">
              {t.welcome}
            </div>
            <div className="kidopia-card-inner">
              <div className="kidopia-login-container">
                <h2>{t.login}</h2>
                <p>{t.description}</p>

                {/* Phone Input */}
                <div className="kidopia-input-group">
                  <span>+251</span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder={t.phone_placeholder}
                    maxLength="9"
                  />
                </div>

                {/* OTP Input */}
                <div className="kidopia-otp-wrap">
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    placeholder={t.pin_placeholder}
                    disabled={!otpEnabled}
                    maxLength="6"
                  />
                  <button 
                    onClick={handleSendCode} 
                    disabled={countdown > 0 || phone.length < 9}
                  >
                    {countdown > 0 ? t.resend_in(countdown) : t.send_code}
                  </button>
                </div>

                {/* Messages */}
                {messages.error && <div className="kidopia-message kidopia-error">{messages.error}</div>}
                {messages.success && <div className="kidopia-message kidopia-success">{messages.success}</div>}
                {messages.expire && <div className="kidopia-message kidopia-error">{messages.expire}</div>}

                {/* Consent */}
                <div className="kidopia-consent-line">
                  <input
                    type="checkbox"
                    id="kidopia-tnc-checkbox"
                    checked={agreeTnc}
                    onChange={(e) => setAgreeTnc(e.target.checked)}
                  />
                  <label htmlFor="kidopia-tnc-checkbox">
                    {t.consent}{" "}
                    <a href="/terms" target="_blank" rel="noopener noreferrer">
                      {t.terms}
                    </a>
                  </label>
                </div>

                {/* Login Button */}
                <button
                  className="kidopia-btn-login"
                  onClick={handleLogin}
                  disabled={!otpEnabled || !agreeTnc || otp.length !== 6}
                >
                  {t.login_btn}
                </button>

                <p className="kidopia-freeTrial">
                  {t.trial}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}