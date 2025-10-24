// src/contexts/LanguageContext.js
import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

// ✅ Make sure this export is present
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// ✅ Make sure this export is present
export const LanguageProvider = ({ children }) => {
  const [currentLang, setCurrentLang] = useState('en');

  const toggleLanguage = () => {
    setCurrentLang(prev => prev === 'en' ? 'am' : 'en');
  };

  const translations = {
    en: {
      home: "Home",
      gameCategory: "Game Category",
      educationGames: "Education Games",
      adventureGames: "Adventure Games",
      reflexGames: "Reflex Games",
      sportsGames: "Sports Games",
      puzzleGames: "Puzzle Games",
      educationTitle: "EDUCATION PACKED –----",
      adventureTitle: "CHASE THE QUEST –----",
      puzzleTitle: "CRACK THE CODE –----",
      sportsTitle: "SPORTS CHALLENGE –----",
      reflexTitle: "REFLEXES FUN –----",
      seeAll: "See All",
      myAccount: "My Account",
      logout: "Logout",
      languageToggle: "En | አማርኛ",
      heroTitle: "YOUR ULTIMATE DESTINATION FOR ONLINE GAMING",
      heroDescription: "Experience the ultimate gaming universe with KIDOPIA, featuring 100+ high quality, premium HTML5 games featuring Action, reflex, Sports and Adventure Enthusiasts.",
      playNow: "Play Now",
      about: "About Us",
      aboutKidopia: "ABOUT KIDOPIA ----",
      aboutTitle: "EXPERIENCE NEXT-LEVEL ENTERTAINMENT WITH KIDOPIA – YOUR ULTIMATE PREMIUM HTML5 GAMING PORTAL.",
      aboutDescription: "Play hundreds of top-tier games instantly, no downloads, no delays, just pure enjoyment. Fast, elegant, and compatible with any device, KIDOPIA transforms every moment into a gaming adventure.",
      copyright: "© ETHIO TELECOM KIDOPIA 2025, ALL RIGHTS RESERVED",
      // Updated Terms and Conditions from Excel
      termsTitle: "Terms and Conditions",
      termsDescription: "Welcome to Kidopia Terms and Condition!",

      welcomeTitle: "1. Introduction",
      welcomeContent: "These Terms and Condition govern your use of our website and services provided by Vision Tech One member PLC (\"we,\" \"us,\" or \"our\") available at https://kidopia.et/Drr/ethtelco/login.php. By using our Services, you agree to comply with these Terms and Condition. Please read them carefully.",

      userRegistrationTitle: "2. User Registration and Eligibility",
      userRegistrationContent: "To access the Games, users must register with accurate and valid information.",

      subscriptionTitle: "3. Subscription Details",
      subscriptionContent1: "These games require a subscription. You will receive a 3-day free trial.",
      subscriptionContent2: "After the trial period, your subscription will automatically renew at the rate corresponding to your selected package.",
      subscriptionPackages: "Our subscription packages are",
      dailyPackage: "3 ETB per day",
      weeklyPackage: "15 ETB per week",
      monthlyPackage: "75 ETB per month",
      paymentInfo: "Payment is processed through Ethio Telecom.",
      unsubscribeTitle: "Users can unsubscribe by sending the following messages to 8117",
      unsubscribeDaily: "\"stop A\" for daily subscription",
      unsubscribeWeekly: "\"stop B\" for weekly subscription",
      unsubscribeMonthly: "\"stop C\" for monthly subscription",

      technicalRequirementsTitle: "4. Technical Requirements",
      technicalRequirementsContent1: "Participants are responsible for meeting hardware (laptop, phones, tablet) and internet connection requirements.",
      technicalRequirementsContent2: "Technical issues on the player's end will cause interruption and it makes the game delayed.",

      ruleChangesTitle: "5. Rule Changes and Notification",
      ruleChangesContent: "Participants will be promptly notified of any rule changes.",

      contactInfoTitle: "6. Contact Information",
      contactInfoContent: "If you have any questions or concerns related to our Services contact; Support@kidopia.et",
      closingMessage: "Thank you for using Kidopia!",
      // Footer
      termsConditions: "Terms & Conditions",
      welcome: "WELCOME TO KIDOPIA",
      login: "Login",
      send_code: "SEND CODE",
      resend_code: "RE-SEND CODE",
      sent_code: "OTP Sent Successfully",
      verify_code: "Verify OTP",
      verifying: "Verifying...",
      description: "Verify your phone number by entering the code we sent you via SMS",
      phone_placeholder: "xxxxxxxx",
      pin_placeholder: "OTP",
      invalid_phone: "Please enter a valid phone number",
      pin_required: "OTP is required",
      phone_required: "Phone number is required",
      login_success: "Login successful! 🎉 Redirecting...",
      login_error: "Login failed. Please check your credentials.",
      please_register: "Please register first",
      consent: "By continuing, you agree to ",
      agreeInc: "Please agree to the terms and conditions",
      terms: "Terms and Conditions",
      login_btn: "LOGIN",
      trial: "Enjoy a 3-day free trial for your first Registration",
      help: "Help Desk : 251 970 305 059",
      daily: "To subscribe daily (3 birr) send A to 8117",
      weekly: "To subscribe weekly (15 birr) send B to 8117",
      monthly: "To subscribe monthly (75 birr) send C to 8117",
      logging_in: "Logging in...",
      myAccount_header: "My Account",
      phone_number: "Phone Number",
      registration_date: "Registration Date",
      status: "Status",
      active: "Active",
      inactive: "Inactive",
      subscription_type: "Subscription Type",
      back: "Back",
      unsubscribe: "Unsubscribe",
      loading: "Loading...",
      failedToLoad: "Failed to load data.",
      noGamesAvailable: "No games available yet",
      in: "in",
    },
    am: {
      home: "ዋና ገፅ",
      gameCategory: "የጨዋታ ምድብ",
      educationGames: "ትምህርታዊ ጨዋታዎች",
      adventureGames: "አድንቬንቸር ጨዋታዎች",
      reflexGames: "ሪፍሌክስ ጨዋታዎች",
      sportsGames: "ስፖርት ጨዋታዎች",
      puzzleGames: "እንቆቅልሽ ጨዋታዎች",
      educationTitle: "ትምህርታዊ መዝናኛዎች –----",
      adventureTitle: "ፍልሚያውን ያሸንፉ –----",
      puzzleTitle: "ኮዱን ይሰብሩ –----",
      sportsTitle: "ለድል ይጫወቱ –----",
      reflexTitle: "ከፍተኛውን ይምቱ –----",
      myAccount: "መለያ",
      seeAll: "ሁሉንም እይ",
      logout: "ውጣ",
      languageToggle: "En | አማርኛ",
      heroTitle: "ለኦንላይን ጨዋታዎች የመጨረሻ መድረሻዎ",
      heroDescription: "ከ 100 በላይ የ Android እና HTML አስደሳች እና አስቂኝ ጨዋታዎች በአንድ ቦታ በ Kidopia የጨዋታ አለም ያግኙ።",
      playNow: "አሁኑኑ ይጫወቱ",
      about: "ስለ እኛ",
      aboutKidopia: "ስለ ኪዶፒያ ----",
      aboutTitle: "የቀጣይ ደረጃ መዝናኛን ከKIDOPIA ጋር ይለማመዱ - የእርስዎ የመጨረሻው ፕሪሚየም HTML5 ጨዋታ መግቢያ።",
      aboutDescription: "አዝናኝ አስተማሪ እንዲሁም አንድ ደረጃ ከፍ ያለ ከ100 በላይ ጌሞች ከ ኪዶፒያ ቀርቦሎታል፡፡ ጌሞቹን ማውረድ ሳይጠበቅቦት በቀጥታ ከፍጥነት ጋር በስልኮ፡ በላፕቶፖ እና በታብሌቶ ይዝናኑ፡፡",
      privacyPolicy: "የግለሰቦች ፖሊሲ",
      faq: "FAQ", // You can add Amharic translation if needed
      copyright: "© ኢትዮ ቴሌኮም KIDOPIA 2025፣ መብቱ በህግ የተጠበቀ ነው።",
      // Updated Terms and Conditions from Excel (Amharic)
      termsTitle: "ውሎች እና ሁኔታዎች",
      termsDescription: "እንኳን ወደ Kidopia ውሎች እና ሁኔታዎች በደህና መጡ፡፡",

      welcomeTitle: "1. መግቢያ",
      welcomeContent: "እነዚህ የአገልግሎት ውሎች እና ሁኔታዎች ለእርስዎ በ Vision Tech One member PLC አማካኝነት የቀረበውን አገልግሎት የምትጠቀሙበትን ሁኔታ ይመራል ፡፡ ይህንንም በ፡ https://kidopia.et/Drr/ethtelco/login.php ላይ ማግኘት ትችላላችሁ ፡፡ የእኛን አገልግሎቶች በመጠቀም እነዚህን ውሎች እና ሁኔታዎች ለመከተል ተስማምተዋል ፡፡ እባክዎትን በጥንቃቄ ያንብቡአቸው ፡፡",

      userRegistrationTitle: "2. የተጠቃሚ ምዝገባ እና ብቁነት",
      userRegistrationContent: "ጨዋታዎችን ለማግኘት ተጠቃሚዎች ትክክለኛ እና አግባብነት ያላቸው መረጃ በመያዝ ሊመዘገቡ ይገባል፡፡",

      subscriptionTitle: "3. የምዝገባ ዝርዝሮች",
      subscriptionContent1: "እነዚህ ጨዋታዎች የደንበኝነት ምዝገባን ይፈልጋሉ። የ3-ቀን ነጻ የሙከራ ጊዜ ያገኛሉ።",
      subscriptionContent2: "ከሙከራ ጊዜው በኋላ፣ የደንበኝነት ምዝገባዎ በመረጡት ጥቅል መጠን በራስ-ሰር ይታደሳል።",
      subscriptionPackages: "የእኛ የደንበኝነት ምዝገባ ጥቅሎች የሚከተሉት ናቸው፦",
      dailyPackage: "በቀን 3 ብር",
      weeklyPackage: "በሳምንት 15 ብር",
      monthlyPackage: "በወር 75 ብር",
      paymentInfo: "ክፍያ የሚካሄደው በኢትዮ ቴሌኮም በኩል ነው።",
      unsubscribeTitle: "ተጠቃሚዎች ከደንበኝነት ምዝገባው ለመውጣት (ለመሰረዝ) የሚከተሉትን መልዕክቶች ወደ 8117 መላክ ይችላሉ፦",
      unsubscribeDaily: "ለዕለታዊ ምዝገባ \"stop A\"",
      unsubscribeWeekly: "ለሳምንታዊ ምዝገባ \"stop B\"",
      unsubscribeMonthly: "ለወርሃዊ ምዝገባ \"stop C\"",

      technicalRequirementsTitle: "4. የቴክኒክ መስፈርቶች",
      technicalRequirementsContent1: "ተጫዋቾች የሀርድ ዌር { ስልኮች፤ላፕቶፖች፤ታብሌቶች} እና የኢንተርኔት ግንኙነት መስፈርቶችን የማሟላት ሀላፊነት አለባቸው፡፡",
      technicalRequirementsContent2: "በተጫዋቾች በኩል ያሉ የቴክኒክ ጉዳቶች ጨዋታው እንዲቋረጥ ወይም እንዲዘገይ ያደርገዋል፡፡",

      ruleChangesTitle: "5. የህግ ለውጦች እና ማሳወቂያ",
      ruleChangesContent: "ተጫዋቾች ማንኛወም የህግ ለውጥ በተመለከተ በአፋጣኝ ማሳወቂያ የሚሰጣቸው ይሆናል፡፡",

      contactInfoTitle: "6. የግንኙነት መረጃ",
      contactInfoContent: "ከአገልግሎቶቻችን ጋር በተያያዘ ለሚነሱ ጥያቄዎች እንዲሁም ተጨማሪ መረጃ በ Support@kidopia.et ያግኙናል።",

      closingMessage: "Kidopiaን ስለተጠቀሙ እናመሰግናለን።",

      // Footer
      termsConditions: "ውሎች እና ሁኔታዎች",
      welcome: "እንኳን ወደ Kidopia በደህና መጡ",
      login: "ለመመዝገብ",
      send_code: "ኦቲፒ ላክ",
      resend_code: "ኦቲፒ ድጋሚ ላክ",
      sent_code: "ኦቲፒ ተልኳል",
      verify_code: "ኦቲፒ አረጋግጥ",
      verifying: "በመግባት ላይ...",
      description: "በ SMS የተላከልዎን ኮድ በማስገባት ስልክ ቁጥርዎን ያረጋግጡ",
      phone_placeholder: "xxxxxxxx",
      pin_placeholder: "ኦቲፒ",
      invalid_phone: "እባክዎ ትክክለኛ የስልክ ቁጥር ያስገቡ",
      pin_required: "ኦቲፒ ያስፈልጋል",
      phone_required: "ስልክ ቁጥር ያስገቡ",
      login_success: "ግባ ተሳክቷል! 🎉 በቅርብ ጊዜ እየተሻገረ ነው...",
      please_register: "እባክዎ ይመዝገቡ ፡፡",
      login_error: "ግባ አልተሳካም። እባክዎ የይለፍ ቃልዎን ያረጋግጡ።",
      consent: "በመቀጠል፤ ዉሎችን ተስማምተዋል",
      agreeInc: "ዉሎችን ይስማሙ",
      terms: "ደንቦች",
      login_btn: "ግባ",
      trial: "ለመጀመሪያ ምዝገባዎ 3 ቀን በነፃ ይጠቀሙ",
      help: "ለበለጠ መረጃ 251 970 305 059",
      daily: "ለዕለታዊ ለመመዝገብ (3) A ወደ 8117 ይላኩ",
      weekly: "ለሳምንታዊ ለመመዝገብ (15) B ወደ 8117 ይላኩ",
      monthly: "ለወርሃዊ ለመመዝገብ (75) C ወደ 8117 ይላኩ",
      logging_in: "በመግባት ላይ...",
      myAccount_header: "የእኔ መለያ",
      phone_number: "ስልክ ቁጥር",
      registration_date: "የተመዘገበበት ቀን",
      status: "ሁኔታ",
      active: "ንቁ",
      inactive: "እንቅስቃሴ የለም",
      subscription_type: "የመመዝገቢያ አይነት",
      back: "ተመለስ",
      unsubscribe: "መመዝገብ ሰርዝ",
      loading: "በመጫን ላይ...",
      failedToLoad: "መረጃ መጫን አልተሳካም።",
      noGamesAvailable: "ጨዋታዎች አልተገኙም።",
      in: "በ",
    }
  };

  const t = (key) => translations[currentLang]?.[key] || key;

  const value = {
    currentLang,
    toggleLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};