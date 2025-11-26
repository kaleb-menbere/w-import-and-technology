import './MyAccount.css';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { useFrappeGetDocList } from 'frappe-react-sdk';
import { useNavigate } from 'react-router-dom';

function MyAccount() {
  const { t, currentLang } = useLanguage();
  const { otpPhone, logout, currentUser } = useAuth();
  const navigate = useNavigate();

  // Fetch subscription by stored phone number using Frappe
  const { data: subscriptions, error, isLoading } = useFrappeGetDocList(
    "Subscription",
    {
      fields: ["phone_number", "registration_date", "status", "subscription_type"],
      filters: otpPhone ? [["phone_number", "=", otpPhone]] : [],
      limit: 1,
    }
  );

  const account = subscriptions?.[0] || null;

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString(
      currentLang === 'am' ? 'am-ET' : 'en-US',
      { year: 'numeric', month: 'long', day: 'numeric' }
    );
  };

  const handleBack = () => navigate(-1);
  const handleUnsubscribe = () => {
    alert(t("unsubscribe") + " " + t("successful"));
  };

  // Check if user is logged in
  if (!otpPhone && !currentUser) {
    return (
      <div className="my-account-page">
        <div className="error-message">
          <h2>{t("please_login") || "Please Login"}</h2>
          <p>{t("login_to_view_account") || "Please login to view your account information"}</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="my-account-page">
        <div className="loading-message">
          {t("loading") || "Loading"}...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-account-page">
        <div className="error-message">
          <h2>{t("error_loading_data") || "Error Loading Data"}</h2>
          <p>{error?.message || t("unknown_error") || "Unknown error occurred"}</p>
        </div>
      </div>
    );
  }

  if (!account) {
    return (
      <div className="my-account-page">
        <div className="error-message">
          <h2>{t("no_subscription_found") || "No Subscription Found"}</h2>
          <p>{t("no_active_subscription") || "No active subscription found for your account"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="my-account-page">
      <div className="account-container">
        {/* Header */}
        <div className="account-header">
          <h1>👤 {t('myAccount_header') || "My Account"}</h1>
          <p>{t('myAccount_description') || "Manage your subscription and account settings"}</p>
        </div>

        {/* Account Info Card */}
        <div className="account-card">
          <div className="card-header">
            <h2>{t('accountInformation') || "Account Information"}</h2>
          </div>

          <div className="account-details">
            <div className="detail-item">
              <span className="detail-label">📱 {t('phone_number') || "Phone Number"}</span>
              <span className="detail-value">{account.phone_number}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">🟢 {t('status') || "Status"}</span>
              <span
                className={`status-badge ${
                  account.status?.toLowerCase() === 'active' ? 'active' : 'inactive'
                }`}
              >
                {t(account.status?.toLowerCase()) || account.status}
              </span>
            </div>

            <div className="detail-item">
              <span className="detail-label">💳 {t('subscription_type') || "Subscription Type"}</span>
              <span className="detail-value">{account.subscription_type}</span>
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="support-section">
          <h3>💬 {t('needHelp') || "Need Help?"}</h3>
          <p>
            {t('contactSupport') || "Contact support"}: <strong>0116166969</strong>
          </p>
          <div className="support-actions">
            {/* Email button wrapped in an anchor tag with the mailto: prefix */}
            <a href="mailto:amhagroupcontact@gmail.com" className="support-btn" style={{ textDecoration: 'none' }}>
              📧 {t('emailSupport') || "Email Support"}
            </a>
            
            {/* Call button wrapped in an anchor tag with the tel: prefix */}
            <a href="tel:0116166969" className="support-btn" style={{ textDecoration: 'none' }}>
              📞 {t('callSupport') || "Call Support"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyAccount;