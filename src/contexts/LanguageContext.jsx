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
      Category: "Category",
      myAccount: "My Account",
      logout: "Logout",
      languageToggle: "En | አማርኛ",
      about: "About Us",
      aboutW_Import_and_Technology: "ABOUT W Import and Technology ----",
      aboutTitle: "EXPERIENCE NEXT-LEVEL ENTERTAINMENT WITH W Import and Technology – YOUR ULTIMATE PREMIUM HTML5 GAMING PORTAL.",
      aboutDescription: "Play hundreds of top-tier games instantly, no downloads, no delays, just pure enjoyment. Fast, elegant, and compatible with any device, W Import and Technology transforms every moment into a gaming adventure.",
      copyright: "© ETHIO TELECOM W Import and Technology 2025, ALL RIGHTS RESERVED",
      // Updated Terms and Conditions from Excel
      termsTitle: "Terms and Conditions",
      termsDescription: "Welcome to W Import and Technology Terms and Condition!",

      welcomeTitle: "1. Introduction",
      welcomeContent: "These Terms and Condition govern your use of our website and services provided by Vision Tech One member PLC (\"we,\" \"us,\" or \"our\") available at https://W Import and Technology.et/Drr/ethtelco/login.php. By using our Services, you agree to comply with these Terms and Condition. Please read them carefully.",

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
      unsubscribeTitle: "Users can unsubscribe by sending the following messages to 9735",
      unsubscribeDaily: "\"stop A\" for daily subscription",
      unsubscribeWeekly: "\"stop B\" for weekly subscription",
      unsubscribeMonthly: "\"stop C\" for monthly subscription",

      technicalRequirementsTitle: "4. Technical Requirements",
      technicalRequirementsContent1: "Participants are responsible for meeting hardware (laptop, phones, tablet) and internet connection requirements.",
      technicalRequirementsContent2: "Technical issues on the player's end will cause interruption and it makes the game delayed.",

      ruleChangesTitle: "5. Rule Changes and Notification",
      ruleChangesContent: "Participants will be promptly notified of any rule changes.",

      contactInfoTitle: "6. Contact Information",
      contactInfoContent: "If you have any questions or concerns related to our Services contact; Support@W Import and Technology.et",
      closingMessage: "Thank you for using W Import and Technology!",
      // Footer
      termsConditions: "Terms & Conditions",
      welcome: "WELCOME TO W IMPORT AND TECHNOLOGY",
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
      daily: "To subscribe daily (2 birr) send A to 9735",
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
      
      // BLOG WEBSITE TRANSLATIONS
      categories: 'Categories',
      healthTips: 'Health & Beauty',
      sportNews: 'Sports News',
      foodPreparation: 'Food & Recipes',
      // Subcategories
      beautyTips: 'Beauty Tips',
      healthAdvice: 'Health Advice',
      foreignSports: 'International Sports',
      localSports: 'Local Sports',
      ethiopianFood: 'Ethiopian Traditional',
      foreignFood: 'International Cuisine',
      
      // Homepage Translations
      searchPlaceholder: 'Search articles...',
      search: 'Search',
      OurPosts: 'Our Posts',
      mostRead: 'Most read articles this week',
      viewAllPosts: 'View All Posts →',
      exploreTopics: 'Explore articles by topic',
      stayUpdated: 'Stay Updated',
      newsletterDesc: 'Get the latest articles delivered to your inbox daily',
      enterEmail: 'Enter your email address',
      subscribe: 'Subscribe',
      health: 'Health',
      sports: 'Sports', 
      food: 'Food',
      articles: 'articles',
      
      // Blog Post Translations
      readTime: 'min read',
      likes: 'likes',
      author: 'Author',
      publishedOn: 'Published on',
      relatedPosts: 'Related Posts',
      shareThisPost: 'Share this post',
      comments: 'Comments',
      leaveComment: 'Leave a comment',
      postComment: 'Post Comment',
      loadingPosts: 'Loading posts...',
      noPostsFound: 'No posts found',
      readMore: 'Read More',
      
      // Category Pages
      allPosts: 'All Posts',
      filterBy: 'Filter by',
      sortBy: 'Sort by',
      newestFirst: 'Newest First',
      oldestFirst: 'Oldest First',
      mostPopular: 'Most Popular',
      
      // Subscription
      newsletterSuccess: 'Thank you for subscribing!',
      newsletterError: 'Subscription failed. Please try again.',
      emailRequired: 'Email is required',
      invalidEmail: 'Please enter a valid email address',
      // Add these to your existing English translations:
      myAccount_description: 'Manage your account settings and subscription',
      accountInformation: 'Account Information',
      subscriptionManagement: 'Subscription Management',
      manageSubscription: 'Manage Subscription',
      currentPlan: 'Current Plan',
      dailySubscription: 'Daily Subscription',
      day: 'day',
      quickActions: 'Quick Actions',
      viewReadingHistory: 'View Reading History',
      favoriteArticles: 'Favorite Articles',
      notificationSettings: 'Notification Settings',
      needHelp: 'Need Help?',
      contactSupport: 'Contact our support team',
      emailSupport: 'Email Support',
      callSupport: 'Call Support',
      allRightsReserved: 'All rights reserved'
    },
    am: {
      home: "ዋና ገፅ",
      Category: "የጨዋታ ምድብ",
      myAccount: "መለያ",
      logout: "ውጣ",
      languageToggle: "En | አማርኛ",
      about: "ስለ እኛ",
      aboutW_Import_and_Technology: "ስለ ኪዶፒያ ----",
      aboutTitle: "የቀጣይ ደረጃ መዝናኛን ከW Import and Technology ጋር ይለማመዱ - የእርስዎ የመጨረሻው ፕሪሚየም HTML5 ጨዋታ መግቢያ።",
      aboutDescription: "አዝናኝ አስተማሪ እንዲሁም አንድ ደረጃ ከፍ ያለ ከ100 በላይ ጌሞች ከ ኪዶፒያ ቀርቦሎታል፡፡ ጌሞቹን ማውረድ ሳይጠበቅቦት በቀጥታ ከፍጥነት ጋር በስልኮ፡ በላፕቶፖ እና በታብሌቶ ይዝናኑ፡፡",
      privacyPolicy: "የግለሰቦች ፖሊሲ",
      faq: "FAQ",
      copyright: "© W Import and Technology 2025፣ መብቱ በህግ የተጠበቀ ነው።",
      // Updated Terms and Conditions from Excel (Amharic)
      termsTitle: "ውሎች እና ሁኔታዎች",
      termsDescription: "እንኳን ወደ W Import and Technology ውሎች እና ሁኔታዎች በደህና መጡ፡፡",

      welcomeTitle: "1. መግቢያ",
      welcomeContent: "እነዚህ የአገልግሎት ውሎች እና ሁኔታዎች ለእርስዎ በ Vision Tech One member PLC አማካኝነት የቀረበውን አገልግሎት የምትጠቀሙበትን ሁኔታ ይመራል ፡፡ ይህንንም በ፡ https://W Import and Technology.et/Drr/ethtelco/login.php ላይ ማግኘት ትችላላችሁ ፡፡ የእኛን አገልግሎቶች በመጠቀም እነዚህን ውሎች እና ሁኔታዎች ለመከተል ተስማምተዋል ፡፡ እባክዎትን በጥንቃቄ ያንብቡአቸው ፡፡",

      userRegistrationTitle: "2. የተጠቃሚ ምዝገባ እና ብቁነት",
      userRegistrationContent: "ጨዋታዎችን ለማግኘት ተጠቃሚዎች ትክክለኛ እና አግባብነት ያላቸው መረጃ በመያዝ ሊመዘገቡ ይገባል፡፡",

      subscriptionTitle: "3. የምዝገባ ዝርዝሮች",
      subscriptionContent1: "እነዚህ ጨዋታዎች የደንበኝነት ምዝገባን ይፈልጋሉ። የ3-ቀን ነጻ የሙከራ ጊዜ ያገኛሉ።",
      subscriptionContent2: "ከሙከራ ጊዜው በኋላ፣ የደንበኝነት ምዝገባዎ በመረጡት ጥቅል መጠን በራስ-ሰር ይታደሳል።",
      subscriptionPackages: "የእኛ የደንበኝነት ምዝገባ ጥቅሎች የሚከተሉት ናቸው፦",
      dailyPackage: "በቀን 3 ብር",
      paymentInfo: "ክፍያ የሚካሄደው በኢትዮ ቴሌኮም በኩል ነው።",
      unsubscribeTitle: "ተጠቃሚዎች ከደንበኝነት ምዝገባው ለመውጣት (ለመሰረዝ) የሚከተሉትን መልዕክቶች ወደ 9735 መላክ ይችላሉ፦",
      unsubscribeDaily: "ለዕለታዊ ምዝገባ \"stop A\"",
      unsubscribeWeekly: "ለሳምንታዊ ምዝገባ \"stop B\"",
      unsubscribeMonthly: "ለወርሃዊ ምዝገባ \"stop C\"",

      technicalRequirementsTitle: "4. የቴክኒክ መስፈርቶች",
      technicalRequirementsContent1: "ተጫዋቾች የሀርድ ዌር { ስልኮች፤ላፕቶፖች፤ታብሌቶች} እና የኢንተርኔት ግንኙነት መስፈርቶችን የማሟላት ሀላፊነት አለባቸው፡፡",
      technicalRequirementsContent2: "በተጫዋቾች በኩል ያሉ የቴክኒክ ጉዳቶች ጨዋታው እንዲቋረጥ ወይም እንዲዘገይ ያደርገዋል፡፡",

      ruleChangesTitle: "5. የህግ ለውጦች እና ማሳወቂያ",
      ruleChangesContent: "ተጫዋቾች ማንኛወም የህግ ለውጥ በተመለከተ በአፋጣኝ ማሳወቂያ የሚሰጣቸው ይሆናል፡፡",

      contactInfoTitle: "6. የግንኙነት መረጃ",
      contactInfoContent: "ከአገልግሎቶቻችን ጋር በተያያዘ ለሚነሱ ጥያቄዎች እንዲሁም ተጨማሪ መረጃ በ Support@W Import and Technology.et ያግኙናል።",

      closingMessage: "W Import and Technologyን ስለተጠቀሙ እናመሰግናለን።",

      // Footer
      termsConditions: "ውሎች እና ሁኔታዎች",
      welcome: "እንኳን ወደ W Import and Technology በደህና መጡ",
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
      daily: "ለዕለታዊ ለመመዝገብ (3) A ወደ 9735 ይላኩ",
      weekly: "ለሳምንታዊ ለመመዝገብ (15) B ወደ 9735 ይላኩ",
      monthly: "ለወርሃዊ ለመመዝገብ (75) C ወደ 9735 ይላኩ",
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
      
      // BLOG WEBSITE TRANSLATIONS
      categories: 'ምድቦች',
      healthTips: 'ጤና እና ውበት',
      sportNews: 'ስፖርት ዜና',
      foodPreparation: 'ምግብ አሰራር',
      // Subcategories in Amharic
      beautyTips: 'ውበት ምክሮች',
      healthAdvice: 'ጤና ምክሮች',
      foreignSports: 'የውጭ ስፖርት',
      localSports: 'የአገር ውስጥ ስፖርት',
      ethiopianFood: 'ባህላዊ ምግብ',
      foreignFood: 'የውጭ ምግብ',
      
      // Homepage Translations
      searchPlaceholder: 'ጽሑፎችን ይፈልጉ...',
      search: 'ፈልግ',
      popularPosts: 'ታዋቂ ጽሑፎች',
      mostRead: 'በዚህ ሳምንት በጣም የተነበቡ ጽሑፎች',
      viewAllPosts: 'ሁሉንም ጽሑፎች ይመልከቱ →',
      exploreTopics: 'ጽሑፎችን በርዕሰ ጉዳይ ይፈልጉ',
      stayUpdated: 'ዝመና ያግኙ',
      newsletterDesc: 'የቅርብ ጽሑፎችን በየቀኑ በኢሜልዎ ይቀበሉ',
      enterEmail: 'ኢሜል አድራሻዎን ያስገቡ',
      subscribe: 'ይመዝገቡ',
      health: 'ጤና',
      sports: 'ስፖርት', 
      food: 'ምግብ',
      articles: 'ጽሑፎች',
      
      // Blog Post Translations
      readTime: 'ደቂቃ ንባብ',
      likes: 'ውደድ',
      author: 'ደራሲ',
      publishedOn: 'የታተመበት ቀን',
      relatedPosts: 'ተዛማጅ ጽሑፎች',
      shareThisPost: 'ይህን ጽሑፍ አጋራ',
      comments: 'አስተያየቶች',
      leaveComment: 'አስተያየት ይስጡ',
      postComment: 'አስተያየት ለጥፍ',
      loadingPosts: 'ጽሑፎች በመጫን ላይ...',
      noPostsFound: 'ጽሑፎች አልተገኙም',
      readMore: 'ተጨማሪ ያንብቡ',
      
      // Category Pages
      allPosts: 'ሁሉም ጽሑፎች',
      filterBy: 'አጣራ በ',
      sortBy: 'ደርድር በ',
      newestFirst: 'አዲስ በመጀመሪያ',
      oldestFirst: 'የድሮ በመጀመሪያ',
      mostPopular: 'በጣም ታዋቂ',
      
      // Subscription
      newsletterSuccess: 'ለመመዝገብ እናመሰግናለን!',
      newsletterError: 'መመዝገብ አልተሳካም። እባክዎ እንደገና ይሞክሩ።',
      emailRequired: 'ኢሜል ያስፈልጋል',
      invalidEmail: 'እባክዎ ትክክለኛ ኢሜል አድራሻ ያስገቡ',
      // Add these to your existing Amharic translations:
      myAccount_description: 'የመለያ ቅንብሮችዎን እና የደንበኝነት ምዝገባዎን ያስተዳድሩ',
      accountInformation: 'የመለያ መረጃ',
      subscriptionManagement: 'የደንበኝነት ምዝገባ አስተዳደር',
      manageSubscription: 'የደንበኝነት ምዝገባ አስተዳድር',
      currentPlan: 'አሁን ያለው እቅድ',
      dailySubscription: 'ዕለታዊ ደንበኝነት',
      day: 'ቀን',
      quickActions: 'ፈጣን እርምጃዎች',
      viewReadingHistory: 'የንባብ ታሪክ ይመልከቱ',
      favoriteArticles: 'የሚወዷቸው ጽሑፎች',
      notificationSettings: 'የማሳወቂያ ቅንብሮች',
      needHelp: 'እርዳታ ይፈልጋሉ?',
      contactSupport: 'ከደጋፊ ቡድናችን ጋር ይገናኙ',
      emailSupport: 'ኢሜል ላክ',
      callSupport: 'ይደውሉ',
      allRightsReserved: 'ሁሉም መብቶች ተጠብቀዋል'
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