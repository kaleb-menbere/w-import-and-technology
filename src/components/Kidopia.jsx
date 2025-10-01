import "./Kidopia.css";
import Header from "./Header/Header";
import Home from "./Home/Home";
import Footer from "./Footer/Footer";
import Login from "./Login/Login";
import Category from "./Category/Category";
import TermsAndConditions from "./TermsAndConditions/TermsAndConditions";
import { Routes, Route } from "react-router-dom";
import { LanguageProvider } from "../contexts/LanguageContext";

function Kidopia() {

  return (

    <div >
      <LanguageProvider>
      {/* Header */}
      <Header />
      
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
