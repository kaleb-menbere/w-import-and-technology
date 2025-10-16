import React from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import { useFrappeGetDocList, useFrappeAuth } from "frappe-react-sdk";
import "./MyAccount.css";

export default function MyAccount() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { currentUser } = useFrappeAuth();
  console.log("*************************************")
  console.log("*************************************")
  console.log("*************************************")
  console.log("*************************************")
  console.log("*************************************")
  console.log("*************************************")
  console.log("*************************************")
  console.log(currentUser)
  // Fetch subscription for logged-in user
  const { data: subscriptions, error, isLoading } = useFrappeGetDocList(
    "Subscription",
    {
      fields: ["phone_number", "registration_date", "status", "subscription_type"],
      filters: [["email", "=", currentUser]], // match logged-in user
      limit: 1,
    }
  );

  const account = subscriptions?.[0] || null;

  const handleBack = () => navigate(-1);
  const handleUnsubscribe = () => alert(t("unsubscribe") + " successful");

  if (!currentUser) {
    return <div>{t("please_login")}</div>;
  }

  if (isLoading) return <div>{t("loading")}...</div>;
  if (error) return <div>{t("error_loading_data")}</div>;
  if (!account) return <div>{t("no_subscription_found")}</div>;

  return (
    <div className="account-page">
      <div className="account-card">
        <h1 className="account-header">{t("myAccount_header")}</h1>

        <div className="account-info">
          <div className="account-row">
            <span className="label">{t("phone_number")}:</span>
            <span className="value">{account.phone_number}</span>
          </div>

          <div className="account-row">
            <span className="label">{t("registration_date")}:</span>
            <span className="value">{account.registration_date}</span>
          </div>

          <div className="account-row">
            <span className="label">{t("status")}:</span>
            <span className={`value status ${account.status?.toLowerCase()}`}>
              {t(account.status?.toLowerCase())}
            </span>
          </div>

          <div className="account-row">
            <span className="label">{t("subscription_type")}:</span>
            <span className="value">{account.subscription_type}</span>
          </div>
        </div>

        <div className="account-buttons">
          <button className="btn back" onClick={handleBack}>
            {t("back")}
          </button>
          <button className="btn unsubscribe" onClick={handleUnsubscribe}>
            {t("unsubscribe")}
          </button>
        </div>
      </div>
    </div>
  );
}
