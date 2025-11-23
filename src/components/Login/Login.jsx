import React, { useState, useEffect } from "react";
import "./Login.css";
import { useAuth } from "../../contexts/AuthContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { useNavigate, Link } from "react-router-dom";

export default function WImportAndTechnologyLogin() {
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
  const [buttonText, setButtonText] = useState(t("send_code") || "SEND OTP");
  const [otpSent, setOtpSent] = useState(false);

  // Save current language in session
  useEffect(() => {
    sessionStorage.setItem("lang", currentLang);
  }, [currentLang]);

  // Countdown timer for OTP resend
  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => setSecondsLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  useEffect(() => {
    if (secondsLeft > 0) {
      setButtonText(`${t("resend_code")} ${t("in")} ${secondsLeft}s`);
    } else if (otpSent) {
      setButtonText(t("resend_code") || "Re-Send OTP");
      setIsSending(false);
    } else {
      setButtonText(t("send_code") || "SEND OTP");
    }
  }, [secondsLeft, otpSent, t]);

  const validatePhone = (phone) => {
    const cleanPhone = phone.replace(/\D/g, "");
    return cleanPhone.length >= 9 && cleanPhone.length <= 15;
  };

  // Function to translate common error messages
  const translateErrorMessage = (message) => {
    if (!message) return currentLang === 'am' ? 'ስህተት ተፈጥሯል' : 'An error occurred';

    const lowerMessage = message.toLowerCase();

    // Common error message translations
    const errorTranslations = {
      'en': {
        'invalid otp': 'Invalid OTP. Please check and try again.',
        'wrong otp': 'Wrong OTP. Please check and try again.',
        'incorrect otp': 'Incorrect OTP. Please try again.',
        'otp expired': 'OTP has expired. Please request a new one.',
        'user not found': 'User not found. Please check your phone number.',
        'maximum attempts exceeded': 'Maximum OTP attempts exceeded. Please try again later.',
        'please request an otp first': 'Please request an OTP first.',
        'subscription not found': 'Subscription not found. Please contact support.',
        'network error': 'Network error. Please check your connection.',
        'unexpected error': 'An unexpected error occurred. Please try again.',
        'invalid password': 'Invalid OTP. Please check and try again.',
        'not found': 'User not found. Please check your phone number.',
        'no subscription': 'No active subscription found. Please contact support.',
        'service unavailable': 'Service temporarily unavailable. Please try again later.',
        'server error': 'Server error. Please try again later.',
        'timeout': 'Request timeout. Please check your connection and try again.'
      },
      'am': {
        'invalid otp': 'የተሳሳተ ኦቲፒ። እባክዎ ያረጋግጡ እና እንደገና ይሞክሩ።',
        'wrong otp': 'የተሳሳተ ኦቲፒ። እባክዎ ያረጋግጡ እና እንደገና ይሞክሩ።',
        'incorrect otp': 'የተሳሳተ ኦቲፒ። እባክዎ እንደገና ይሞክሩ።',
        'otp expired': 'ኦቲፒ ጊዜው አልፎበታል። እባክዎ አዲስ ይጠይቁ።',
        'user not found': 'ተጠቃሚ አልተገኘም። እባክዎ ስልክ ቁጥርዎን ያረጋግጡ።',
        'maximum attempts exceeded': 'ከፍተኛው የኦቲፒ ሙከራ ቁጥር ተሻግሯል። እባክዎ ቆይተው እንደገና ይሞክሩ።',
        'please request an otp first': 'እባክዎ መጀመሪያ ኦቲፒ ይጠይቁ።',
        'subscription not found': 'የደንበኝነት ምዝገባ አልተገኘም። እባክዎ ከድጋፍ ቡድናችን ጋር ይገናኙ።',
        'network error': 'የኔትወርክ ስህተት። እባክዎ ግንኙነትዎን ያረጋግጡ።',
        'unexpected error': 'ያልተጠበቀ ስህተት ተፈጥሯል። እባክዎ እንደገና ይሞክሩ።',
        'invalid password': 'የተሳሳተ ኦቲፒ። እባክዎ ያረጋግጡ እና እንደገና ይሞክሩ።',
        'not found': 'ተጠቃሚ አልተገኘም። እባክዎ ስልክ ቁጥርዎን ያረጋግጡ።',
        'no subscription': 'ንቁ የደንበኝነት ምዝገባ አልተገኘም። እባክዎ ከድጋፍ ቡድናችን ጋር ይገናኙ።',
        'service unavailable': 'አገልግሎት በጊዜው አይገኝም። እባክዎ ቆይተው እንደገና ይሞክሩ።',
        'server error': 'የሰርቨር ስህተት። እባክዎ ቆይተው እንደገና ይሞክሩ።',
        'timeout': 'የጥያቄ ጊዜ አልፎበታል። እባክዎ ግንኙነትዎን ያረጋግጡ እና እንደገና ይሞክሩ።'
      }
    };

    // First, check for exact matches in common error messages
    for (const [key, value] of Object.entries(errorTranslations[currentLang])) {
      if (lowerMessage.includes(key)) {
        return value;
      }
    }

    // If no match found, try to handle specific patterns
    if ((lowerMessage.includes('invalid') || lowerMessage.includes('wrong') || lowerMessage.includes('incorrect')) && 
        (lowerMessage.includes('otp') || lowerMessage.includes('password') || lowerMessage.includes('pin'))) {
      return currentLang === 'am' 
        ? 'የተሳሳተ ኦቲፒ። እባክዎ ያረጋግጡ እና እንደገና ይሞክሩ።'
        : 'Invalid OTP. Please check and try again.';
    }

    if (lowerMessage.includes('expired') && lowerMessage.includes('otp')) {
      return currentLang === 'am' 
        ? 'ኦቲፒ ጊዜው አልፎበታል። እባክዎ አዲስ ይጠይቁ።'
        : 'OTP has expired. Please request a new one.';
    }

    if (lowerMessage.includes('user') && lowerMessage.includes('not found')) {
      return currentLang === 'am' 
        ? 'ተጠቃሚ አልተገኘም። እባክዎ ስልክ ቁጥርዎን ያረጋግጡ።'
        : 'User not found. Please check your phone number.';
    }

    // If no specific translation found, return the original message
    return message;
  };

  // Helper function to extract error message from Frappe exception
  const extractFrappeErrorMessage = (error) => {
    console.log("Raw error object for debugging:", error);

    // Check if it's a Frappe "Subscription not found" error in exception field
    if (error?.exception?.includes("Subscription not found")) {
      return currentLang === 'am' 
        ? "የደንበኝነት ምዝገባ አልተገኘም። እባክዎ ከድጋፍ ቡድናችን ጋር ይገናኙ።"
        : "Subscription not found. Please contact support.";
    }

    // Check _server_messages for Frappe errors
    if (error?._server_messages) {
      try {
        const serverMessages = JSON.parse(error._server_messages);
        if (Array.isArray(serverMessages) && serverMessages.length > 0) {
          const firstMessage = JSON.parse(serverMessages[0]);
          if (firstMessage.message?.includes("Subscription not found")) {
            return currentLang === 'am'
              ? "የደንበኝነት ምዝገባ አልተገኘም። እባክዎ ከድጋፍ ቡድናችን ጋር ይገናኙ።"
              : "Subscription not found. Please contact support.";
          }
          // Translate other common Frappe errors
          const message = firstMessage.message || "An error occurred";
          return translateErrorMessage(message);
        }
      } catch (e) {
        console.error("Error parsing server messages:", e);
      }
    }

    // Handle regular error formats
    let errorMessage = "";
    if (typeof error === 'string') errorMessage = error;
    else if (error?.message) {
      if (typeof error.message === 'string') errorMessage = error.message;
      else if (error.message.message) errorMessage = error.message.message;
    }
    else if (error?.error) errorMessage = error.error;
    else if (error?.data?.message) errorMessage = error.data.message;
    else errorMessage = currentLang === 'am' 
      ? 'ያልተጠበቀ ስህተት ተፈጥሯል። እባክዎ እንደገና ይሞክሩ።'
      : "An unexpected error occurred. Please try again.";

    return translateErrorMessage(errorMessage);
  };

  // --- SEND OTP ---
  const handleSendOtp = async () => {
    if (!phone || !validatePhone(phone)) {
      setMessages({ error: t("invalid_phone") || "Invalid phone number", success: "" });
      return;
    }

    setMessages({ error: "", success: "" });
    setIsSending(true);

    try {
      const res = await sendOtp("251" + phone);

      // Handle the API response - check both success formats
      if (
        res?.success ||
        res?.message?.message === "OTP sent successfully" ||
        res?.data?.message === "OTP sent successfully"
      ) {
        setOtpSent(true);
        setSecondsLeft(60);
        setMessages({
          error: "",
          success: t("sent_code") || "OTP Sent Successfully",
        });
      } else {
        // res contains the raw Frappe error object
        const errorMsg = extractFrappeErrorMessage(res);
        setMessages({
          error: errorMsg,
          success: "",
        });
        setIsSending(false);
      }
    } catch (err) {
      // Fallback error handling
      const errorMsg = extractFrappeErrorMessage(err);
      setMessages({ 
        error: errorMsg, 
        success: "" 
      });
      setIsSending(false);
    }
  };

  // --- VERIFY OTP / LOGIN ---
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!phone) {
      setMessages({ error: t("phone_required") || "Phone number is required", success: "" });
      return;
    }
    if (!validatePhone(phone)) {
      setMessages({ error: t("invalid_phone") || "Please enter a valid phone number", success: "" });
      return;
    }
    if (!agreeTnc) {
      setMessages({ error: t("agreeInc") || "Please agree to terms and conditions", success: "" });
      return;
    }
    if (!pin) {
      setMessages({ error: t("pin_required") || "Please enter your OTP/PIN", success: "" });
      return;
    }
    if (!otpSent) {
      setMessages({ 
        error: currentLang === 'am' 
          ? "እባክዎ መጀመሪያ ኦቲፒ ይጠይቁ" 
          : "Please request an OTP first", 
        success: "" 
      });
      return;
    }

    setLocalLoading(true);

    try {
      const result = await verifyOtp("251" + phone, pin);

      // Handle checkOTP response format
      if (
        result?.success ||
        result?.message?.message === "Successful OTP" ||
        result?.data?.message === "Successful OTP"
      ) {
        setMessages({ error: "", success: t("login_success") || "Login successful!" });
        setTimeout(() => navigate("/"), 1500);
      } else {
        const errorMsg = extractFrappeErrorMessage(result);
        setMessages({
          error: errorMsg,
          success: "",
        });
      }

      setLocalLoading(false);
    } catch (err) {
      const errorMsg = extractFrappeErrorMessage(err);
      setLocalLoading(false);
      setMessages({ 
        error: errorMsg, 
        success: "" 
      });
    }
  };

  return (
    <div className="w-import-login-page">
      <section className="w-import-hero">
        <div className="w-import-container w-import-hero-inner">
          <div className="w-import-hero-left">
            <img src="/images/w.jpg" alt="Characters" />
          </div>

          <div className="w-import-card">
            <div className="w-import-card-header">{t("welcome")}</div>

            <div className="w-import-card-inner">
              <div className="w-import-login-container">
                <h2>{t("login")}</h2>
                <p>{t("description")}</p>

                <ul className="subscription-list">
                  <li>{t("daily")}</li>
                </ul>

                {messages.error && <div className="w-import-message w-import-error">{messages.error}</div>}
                {messages.success && <div className="w-import-message w-import-success">{messages.success}</div>}

                <div className="w-import-input-group">
                  <span>+251</span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    placeholder={t("phone_placeholder")}
                    maxLength="15"
                    required
                    style={{ borderColor: messages.error ? "#d32f2f" : "var(--primary-green)" }}
                  />
                </div>

                <div className="w-import-input-group otp-field" style={{ position: "relative" }}>
                  <input
                    type="text"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder={t("pin_placeholder")}
                    required
                    className="otp-input"
                    style={{ paddingRight: "120px" }}
                    disabled={!otpSent}
                  />
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={isSending || sendingOtp || secondsLeft > 0}
                    className={`otp-send-btn ${isSending || sendingOtp || secondsLeft > 0 ? "disabled" : "active"}`}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "transparent",
                      border: "none",
                      padding: 0,
                      fontSize: "0.9rem",
                      textDecoration: "none",
                      color: (isSending || sendingOtp || secondsLeft > 0) ? "#999" : "#811114",
                      cursor: (isSending || sendingOtp || secondsLeft > 0) ? "not-allowed" : "pointer",
                      transition: "color 0.3s ease",
                    }}
                  >
                    {buttonText}
                  </button>
                </div>

                <div className="w-import-consent-line">
                  <input
                    type="checkbox"
                    id="w-import-tnc-checkbox"
                    checked={agreeTnc}
                    onChange={(e) => setAgreeTnc(e.target.checked)}
                  />
                  <label htmlFor="w-import-tnc-checkbox">
                    <span className="consent-text">{t("consent")} </span>
                    <Link to="/terms" className="consent" target="_blank" rel="noopener noreferrer">
                      {t("terms")}
                    </Link>
                  </label>
                </div>

                <button
                  className="w-import-btn-login"
                  onClick={handleLogin}
                  disabled={localLoading || checkingOtp}
                >
                  {localLoading || checkingOtp ? t("verifying") || "Verifying..." : t("login_btn") || "Verify OTP"}
                </button>

                <p className="w-import-freeTrial">{t("trial")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}