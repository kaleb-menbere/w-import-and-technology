// src/contexts/LanguageContext.js
import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [currentLang, setCurrentLang] = useState('en');

  const toggleLanguage = () => {
    setCurrentLang(prev => prev === 'en' ? 'am' : 'en');
  };

  const translations = {
    en: {
      home: "Home",
      heroSubtitle: "Your daily source for food recipes, sports updates, and health & beauty advice",
      Category: "Category",
      myAccount: "My Account",
      logout: "Logout",
      languageToggle: "En | አማርኛ",
      about: "About Us",
      aboutW_Import_and_Technology: "ABOUT W Import and Technology ----",
      copyright: "© ETHIO TELECOM W Import and Technology 2025, ALL RIGHTS RESERVED",
      
      // UPDATED Terms and Conditions
      termsTitle: "Terms and Conditions",
      termsDescription: "Welcome to W Import and Technology Terms and Conditions!",
      welcomeTitle: "1. Introduction",
      welcomeContent1: "These Terms and Conditions govern your use of our website and services provided by W Import and Technology ",
      welcomeContent2: ". By using our Services, you agree to comply with these Terms and Conditions. Please read them carefully.",
      userRegistrationTitle: "2. User Registration and Eligibility",
      userRegistrationContent: "To access the Services, users must register with accurate and valid information.",
      subscriptionTitle: "3. Subscription Details",
      subscriptionContent1: "These Servcies require a subscription. You will receive a 3-day free trial.",
      subscriptionContent2: "After the trial period, your subscription will automatically renew at the rate corresponding to your package.",
      subscriptionPackages: "Our subscription package:",
      dailyPackage: "2 ETB per day",
      paymentInfo: "Payment is processed through Ethio Telecom.",
      subscribeInstruction: "To subscribe: Send 'OK' to 9735",
      unsubscribeInstruction: "To unsubscribe: Send 'STOP' to 9735",
      shortcodeInfo: "Shortcode: 9735",
      technicalRequirementsTitle: "4. Technical Requirements",
      technicalRequirementsContent1: "Participants are responsible for meeting hardware and internet requirements.",
      technicalRequirementsContent2: "Technical issues on the customer's end will cause interruption or delay.",
      ruleChangesTitle: "5. Rule Changes and Notification",
      ruleChangesContent: "Participants will be promptly notified of any rule changes.",
      contactInfoTitle: "6. Contact Information",
      contactInfoContent: "If you have questions or concerns about our services, contact amhagroupcontact@gmail.com",
      closingMessage: "Thank you for using W Import and Technology!",
      backButton: "Back to Home",

      // Footer & Login
      termsConditions: "Terms & Conditions",
      welcome: "WELCOME TO ",
      blog: " blog",
      welcomel: "Welcome to W Import and Technology",
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
      daily: "To subscribe daily (2 birr) send OK to 9735",
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
      
      // Account Management
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
      allRightsReserved: 'All rights reserved',
      allFoodArticles: 'All food and recipe articles',
      allSportsArticles: 'All sports news articles',
      allHealthArticles: 'All health and beauty articles',
      allCategoryArticles: 'All articles in this category',
      category: 'Category',
      errorOccurred: 'An error occurred',
      failedToLoadPosts: 'Failed to load posts',
      unknownError: 'Unknown error',
      page: 'Page',
      of: 'of',
      previous: 'Previous',
      next: 'Next',
      
      // PostDetails translations
      errorLoadingPost: 'Error loading post',
      postNotFound: 'Post not found',
      englishContent: 'English Content',
      title: 'Title',
      backToList: 'Back to List',
      moreFromCategory: 'More from this Category',
      showingPosts: 'Showing {start}-{end} of {total} posts'
    },
    am: {
      home: "ዋና ገፅ",
      heroSubtitle: "የዕለት ተዕለት ምግብ አሰራር፣ የስፖርት ዝመና እና የጤና እና ውበት ምክሮች ምንጭዎ",
      Category: "የጨዋታ ምድብ",
      myAccount: "መለያ",
      logout: "ውጣ",
      languageToggle: "En | አማርኛ",
      about: "ስለ እኛ",
      copyright: "© W Import and Technology 2025፣ መብቱ በህግ የተጠበቀ ነው።",
      
      // UPDATED Terms and Conditions in Amharic
      termsTitle: "ውሎች እና ሁኔታዎች",
      termsDescription: "እንኳን ወደ W Import and Technology ውሎች እና ሁኔታዎች በደህና መጡ፡፡",
      welcomeTitle: "1. መግቢያ",
      welcomeContent1: "እነዚህ ውሎች እና ሁኔታዎች ድርጅታችንን እና አገልግሎቶቹን ",
      welcomeContent2:" እንዴት እንደምትጠቀሙ ይመራሉ። እባክዎ በጥንቃቄ ያንብቡ፡፡",
      userRegistrationTitle: "2. የተጠቃሚ ምዝገባ እና ብቁነት",
      userRegistrationContent: "ጨዋታዎችን ለመጠቀም ተጠቃሚዎች ትክክለኛ መረጃ ማስገባት ይኖርባቸዋል።",
      subscriptionTitle: "3. የምዝገባ ዝርዝሮች",
      subscriptionContent1: "ጨዋታዎች የመመዝገቢያ ጥቅል ይፈልጋሉ። 3 ቀን ነፃ ሙከራ ይገኛል።",
      subscriptionContent2: "ከሙከራ ጊዜው በኋላ ምዝገባዎ በራስ-ሰር ይታደሳል።",
      subscriptionPackages: "የእኛ የደንበኝነት ምዝገባ ጥቅል፦",
      dailyPackage: "በቀን 2 ብር",
      paymentInfo: "ክፍያ በኢትዮ ቴሌኮም ተፈጻሚ ነው።",
      subscribeInstruction: "ለመመዝገብ፡ 'OK' ወደ 9735 ይላኩ",
      unsubscribeInstruction: "ለመሰረዝ፡ 'STOP' ወደ 9735 ይላኩ",
      shortcodeInfo: "የመስጫ ኮድ፡ 9735",
      technicalRequirementsTitle: "4. ቴክኒክ መስፈርቶች",
      technicalRequirementsContent1: "ተጫዋቾች የዲቫይስ እና የኢንተርኔት መስፈርቶችን ማሟላት አለባቸው።",
      technicalRequirementsContent2: "ችግሮች ጨዋታውን ሊያቋርጡ ወይም ሊዘገዩ ይችላሉ።",
      ruleChangesTitle: "5. የህግ ለውጦች",
      ruleChangesContent: "ማንኛውም ለውጥ በአፋጣኝ ይገለጻል።",
      contactInfoTitle: "6. የግንኙነት መረጃ",
      contactInfoContent: "ጥያቄ ካለዎት በ amhagroupcontact@gmail.com ያግኙ።",
      closingMessage: "እኛን ስለተጠቀሙ እናመሰግናለን!",
      backButton: "ወደ መነሻ ተመለስ",

      // Footer & Login
      termsConditions: "ውሎች እና ሁኔታዎች",
      welcome: "እንኳን ወደ ",
      blog: " በደህና መጡ",
      welcomel: "እንኳን ወደ W Import and Technology በደህና መጡ",
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
      terms: " ደንቦች",
      login_btn: "ግባ",
      trial: "ለመጀመሪያ ምዝገባዎ 3 ቀን በነፃ ይጠቀሙ",
      help: "ለበለጠ መረጃ 251 970 305 059",
      daily: "ለዕለታዊ ለመመዝገብ (2 ብር) OK ወደ 9735 ይላኩ",
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
      OurPosts: 'የእኛ ጽሑፎች',
      mostRead: 'በዚህ ሳምንት በጣም የተነበቡ ጽሑፎች',
      viewAllPosts: 'ሁሉንም ጽሑፎች ይመልከቱ →',
      exploreTopics: 'ጽሑፎችን በርዕሰ ጉዳይ ይፈልጉ',
      stayUpdated: 'ዝመና ያግኙ',
      newsletterDesc: 'የቅርብ ጽሑፎችን በየቀኑ በኢሜልዎ ይቀበሉ',
      enterEmail: 'ኢሜል አድራሻዎን ያስገቡ',
      subscribe: 'ይመዝገቡ',
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
      
      // Account Management
      myAccount_description: 'የመለያ ቅንብሮችዎን እና የደንበኝነት ምዝገባዎን ያስተዳድሩ',
      accountInformation: 'የመለያ መረጃ',
      subscriptionManagement: 'የደንበኝነት ምዝገባ አስተዳደር',
      manageSubscription: 'የደንበኝነት ምዝገባ አስተዳደር',
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
      allRightsReserved: 'ሁሉም መብቶች ተጠብቀዋል',
      allFoodArticles: 'ሁሉም የምግብ አሰራር ጽሑፎች',
      allSportsArticles: 'ሁሉም የስፖርት ዜና ጽሑፎች',
      allHealthArticles: 'ሁሉም የጤና እና ውበት ጽሑፎች',
      allCategoryArticles: 'ሁሉም የዚህ ምድብ ጽሑፎች',
      category: 'ምድብ',
      errorOccurred: 'ስህተት ተፈጥሯል',
      failedToLoadPosts: 'ጽሑፎችን ማምጣት አልተሳካም',
      unknownError: 'የማይታወቅ ስህተት',
      page: 'ገጽ',
      of: 'ከ',
      previous: 'ያለፈ',
      next: 'ቀጣይ',
      
      // PostDetails translations
      errorLoadingPost: 'ጽሑፍ ማምጣት አልተሳካም',
      postNotFound: 'ጽሑፍ አልተገኘም',
      englishContent: 'የእንግሊዘኛ ይዘት',
      title: 'ርዕስ',
      backToList: 'ወደ ዝርዝር ተመለስ',
      moreFromCategory: 'ተመሳሳይ ጽሑፎች',
      showingPosts: 'ከ{start}-{end} ከ{total} ጽሑፎች'
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