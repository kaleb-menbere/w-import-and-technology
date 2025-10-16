import React, { useState, useEffect } from "react";
import "./Login.css";
import { useAuth } from "../../contexts/AuthContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage() {
  const { sendOtp, verifyOtp, sendingOtp, checkingOtp } = useAuth();
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");

  const [messages, setMessages] = useState({ error: "", success: "" });
  const [agreeTnc, setAgreeTnc] = useState(false);

  const { t, currentLang } = useLanguage();
  useEffect(() => {
    sessionStorage.setItem("lang", currentLang);
  }, [currentLang]);
  const [localLoading, setLocalLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const validatePhone = (phone) => {
    // Remove any non-digit characters and check if it's a valid phone number
    const cleanPhone = phone.replace(/\D/g, '');
    return cleanPhone.length >= 9 && cleanPhone.length <= 15;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log('Login form submitted with:', { phone, pin: pin ? '***' : 'empty' });

    if (!phone || !pin) {
      setMessages({
        error: !phone ? t.invalid_phone : t.pin_required,
        success: ""
      });
      return;
    }

    if (!validatePhone(phone)) {
      setMessages({
        error: t.invalid_phone,
        success: ""
      });
      return;
    }

    if (!agreeTnc) {
      setMessages({
        error: "Please agree to terms and conditions",
        success: ""
      });
      return;
    }

    // Verify OTP (PIN)
    setLocalLoading(true);
    const result = await verifyOtp('251' + phone, pin);
    setLocalLoading(false);
    console.log('OTP verify result:', result);

    if (result.success) {
      setMessages({ error: "", success: t("login_success") });
      setTimeout(() => navigate("/"), 1500);
    } else {
      if (result.error?.toLowerCase().includes("not found") || result.error?.toLowerCase().includes("unregistered")) {
        setMessages({ error: t("please_register"), success: "" }); // use t() here
      } else {
        setMessages({ error: result.error|| t("login_error"), success: "" });
      }
    }
       
  };

  const handleSendOtp = async () => {
    if (!phone) {
      setMessages({ error: t('invalid_phone'), success: '' });
      return;
    }
    if (!validatePhone(phone)) {
      setMessages({ error: t('invalid_phone'), success: '' });
      return;
    }
    setMessages({ error: '', success: '' });
    const res = await sendOtp('251' + phone);
    if (res.success) {
      setOtpSent(true);
      setMessages({ error: '', success: t('send_code') || 'Code sent' });
    } else {
      setMessages({ error: res.error || 'Failed to send code', success: '' });
    }
  };



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
              {t('welcome')}
            </div>
            <div className="kidopia-card-inner">
              <div className="kidopia-login-container">
                <h2>{t('login')}</h2>
                <p>{t('description')}</p>
                <ul className="subscription-list">
                  <li>{t('daily')}</li>
                  <li>{t('weekly')}</li>
                  <li>{t('monthly')}</li>
                </ul>
                {/* Display Error Message */}
                {messages.error && (
                  <div className="kidopia-message kidopia-error">
                    {messages.error}
                  </div>
                )}
                {/* Phone Input */}
                <div className="kidopia-input-group">
                  <span>+251</span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder={t('phone_placeholder')}
                    maxLength="15"
                    required
                  />
                </div>

                {/* PIN / OTP Input */}
                <div className="kidopia-input-group">
                  <input
                    type="password"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder={t('pin_placeholder')}
                    required
                  />
                </div>

                {/* Send OTP Button */}
                <div className="kidopia-otp-actions">
                  <button
                    type="button"
                    className="kidopia-btn-send-otp"
                    onClick={handleSendOtp}
                    disabled={sendingOtp || !phone || !validatePhone(phone)}
                  >
                    {sendingOtp ? (t('sending') || 'Sending...') : (t('send_code') || 'Send Code')}
                  </button>
                  {otpSent && (
                    <span className="otp-sent-note">{t('code_sent') || 'Code sent to your phone'}</span>
                  )}
                </div>

                {/* Consent */}
                <div className="kidopia-consent-line">
                  <input
                    type="checkbox"
                    id="kidopia-tnc-checkbox"
                    checked={agreeTnc}
                    onChange={(e) => setAgreeTnc(e.target.checked)}
                  />
                  <label htmlFor="kidopia-tnc-checkbox">
                    {t('consent')}{" "}
                    <Link to="/terms" className="consent" target="_blank" rel="noopener noreferrer">
                      {t('terms')}
                    </Link>
                  </label>
                </div>

                {/* Verify OTP Button */}
                <button
                  className="kidopia-btn-login"
                  onClick={handleLogin}
                  disabled={localLoading || checkingOtp || !phone || !pin || !agreeTnc}
                >
                  {localLoading || checkingOtp ? <span className="loading-text">{t('verifying') || 'Verifying...'}</span> : (t('login_btn') || 'Verify OTP')}
                </button>



                <p className="kidopia-freeTrial">
                  {t('trial')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}