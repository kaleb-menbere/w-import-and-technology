import React, { useState, useEffect } from "react";
import "./Login.css";
import { useAuth } from "../../contexts/AuthContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage() {
  const { sendOtp, verifyOtp, sendingOtp, checkingOtp } = useAuth();
  const navigate = useNavigate();
  const { t, currentLang } = useLanguage();

  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const [agreeTnc, setAgreeTnc] = useState(false);
  const [messages, setMessages] = useState({ error: "", success: "" });
  const [localLoading, setLocalLoading] = useState(false);

  // OTP state
  const [isSending, setIsSending] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [buttonText, setButtonText] = useState(t("send_code") || "Send OTP");
  const [otpSent, setOtpSent] = useState(false); // ✅ Track if OTP is sent

  useEffect(() => {
    sessionStorage.setItem("lang", currentLang);
  }, [currentLang]);

  // Countdown timer
  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => setSecondsLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  useEffect(() => {
    if (secondsLeft === 0 && isSending) {
      setIsSending(false);
      setButtonText(t("resend_code") || "Re-Send OTP");
    }
  }, [secondsLeft, isSending, t]);

  const validatePhone = (phone) => {
    const cleanPhone = phone.replace(/\D/g, "");
    return cleanPhone.length >= 9 && cleanPhone.length <= 15;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!phone || !pin) {
      setMessages({
        error: !phone ? t("invalid_phone") : t("pin_required"),
        success: "",
      });
      return;
    }

    if (!validatePhone(phone)) {
      setMessages({ error: t("invalid_phone"), success: "" });
      return;
    }

    if (!agreeTnc) {
      setMessages({
        error: "Please agree to terms and conditions",
        success: "",
      });
      return;
    }

    if (!otpSent) {
      setMessages({
        error: "Please request an OTP first",
        success: "",
      });
      return;
    }

    setLocalLoading(true);
    const result = await verifyOtp("251" + phone, pin);
    setLocalLoading(false);

    if (result.success) {
      setMessages({ error: "", success: t("login_success") });
      setTimeout(() => navigate("/"), 1500);
    } else {
      if (
        result.error?.toLowerCase().includes("not found") ||
        result.error?.toLowerCase().includes("unregistered")
      ) {
        setMessages({ error: t("please_register"), success: "" });
      } else {
        setMessages({
          error: result.error || t("login_error"),
          success: "",
        });
      }
    }
  };

  const handleSendOtp = async () => {
    if (!phone || !validatePhone(phone)) {
      setMessages({ error: t("invalid_phone"), success: "" });
      return;
    }

    setMessages({ error: "", success: "" });
    const res = await sendOtp("251" + phone);

    if (res.success) {
      setIsSending(true);
      setSecondsLeft(30);
      setButtonText("Sent!");
      setOtpSent(true); // ✅ enable login
      setMessages({
        error: "",
        success: t("sent_code") || "OTP Sent Successfully",
      });
    } else {
      setMessages({
        error: res.error || "Failed to send code",
        success: "",
      });
    }
  };

  return (
    <div className="kidopia-login-page">
      <section className="kidopia-hero">
        <div className="kidopia-container kidopia-hero-inner">
          <div className="kidopia-hero-left">
            <img src="/images/images.svg" alt="Kidopia Characters" />
          </div>

          <div className="kidopia-card">
            <div className="kidopia-card-header">{t("welcome")}</div>

            <div className="kidopia-card-inner">
              <div className="kidopia-login-container">
                <h2>{t("login")}</h2>
                <p>{t("description")}</p>

                <ul className="subscription-list">
                  <li>{t("daily")}</li>
                  <li>{t("weekly")}</li>
                  <li>{t("monthly")}</li>
                </ul>

                {messages.error && (
                  <div className="kidopia-message kidopia-error">
                    {messages.error}
                  </div>
                )}
                {messages.success && (
                  <div className="kidopia-message kidopia-success">
                    {messages.success}
                  </div>
                )}

                {/* Phone Input */}
                <div className="kidopia-input-group">
                  <span>+251</span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value.replace(/\D/g, ""))
                    }
                    placeholder={t("phone_placeholder")}
                    maxLength="15"
                    required
                  />
                </div>

                {/* OTP Input + Button */}
                <div
                  className="kidopia-input-group otp-field"
                  style={{ position: "relative" }}
                >
                  <input
                    type="password"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder={t("pin_placeholder")}
                    required
                    className="otp-input"
                    style={{ paddingRight: "120px" }}
                  />

                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={isSending || sendingOtp || !validatePhone(phone)}
                    className={`otp-send-btn ${
                      isSending || sendingOtp ? "disabled" : "active"
                    }`}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      padding: "12px 14px",
                      borderRadius: "8px",
                      fontSize: "0.85rem",
                      fontWeight: "600",
                      backgroundColor:
                        isSending || sendingOtp ? "#ccc" : "#8DC63F",
                      color: isSending || sendingOtp ? "#666" : "#fff",
                      cursor:
                        isSending || sendingOtp ? "not-allowed" : "pointer",
                      transition: "0.3s all",
                    }}
                  >
                    {isSending ? `${secondsLeft}s` : buttonText}
                  </button>
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
                    {t("consent")}{" "}
                    <Link
                      to="/terms"
                      className="consent"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t("terms")}
                    </Link>
                  </label>
                </div>

                {/* Verify OTP */}
                <button
                  className="kidopia-btn-login"
                  onClick={handleLogin}
                  disabled={
                    localLoading ||
                    checkingOtp ||
                    !phone ||
                    !pin ||
                    !agreeTnc ||
                    !otpSent // ✅ disable until OTP is sent
                  }
                >
                  {localLoading || checkingOtp
                    ? t("verifying") || "Verifying..."
                    : t("login_btn") || "Verify OTP"}
                </button>

                <p className="kidopia-freeTrial">{t("trial")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
