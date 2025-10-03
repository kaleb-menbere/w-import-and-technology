import "./Kidopia.css";
import Header from "./Header/Header";
import LoginHeader from "./LoginHeader/LoginHeader"; // NEW
import Home from "./Home/Home";
import Footer from "./Footer/Footer";
import Login from "./Login/Login";
import Category from "./Category/Category";
import TermsAndConditions from "./TermsAndConditions/TermsAndConditions";
import { Routes, Route, useLocation } from "react-router-dom"; // ADD useLocation
import { LanguageProvider } from "../contexts/LanguageContext";

function Kidopia() {
  const location = useLocation(); // NEW: to detect current route

  // NEW: Check if current route is login page
  const isLoginPage = location.pathname === '/login';

  return (
    <div>
      <LanguageProvider>
        {/* NEW: Conditional Header - LoginHeader for login page, regular Header for others */}
        {isLoginPage ? <LoginHeader /> : <Header />}
      
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:categoryName" element={<Category />} />
            <Route path="/login/" element={<Login />} /> 
            <Route path="/terms" element={<TermsAndConditions />} />
          </Routes>
        </main>
        
        
        <Footer />
      </LanguageProvider>
    </div>
  )
}

export default Kidopia;