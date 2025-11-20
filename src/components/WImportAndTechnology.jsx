import "./WImportAndTechnology.css"; // renamed CSS file
import Header from "./Header/Header";
import LoginHeader from "./LoginHeader/LoginHeader"; 

import Home from "./Home/Home";
import Footer from "./Footer/Footer";
import Login from "./Login/Login";
import Category from "./Category/Category";
import TermsAndConditions from "./TermsAndConditions/TermsAndConditions";
import PostDetails from "./PostDetails/PostDetails";
import MyAccount from "./MyAccount/MyAccount";
import ProtectedRoute from "./ProtectedRoute";
import { Routes, Route, useLocation } from "react-router-dom"; 
import { LanguageProvider } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";

function WImportAndTechnology() {
  const location = useLocation(); 
  const { isAuthenticated } = useAuth();

  const isLoginPage = location.pathname === '/login';
  const isTermsPage = location.pathname === '/terms';
  const usesFixedHeader = !isLoginPage && !(isTermsPage && !isAuthenticated);

  return (
    <div>
      <LanguageProvider>
        {isLoginPage
          ? <LoginHeader />
          : isTermsPage
            ? (isAuthenticated ? <Header /> : <LoginHeader />)
            : <Header />}
      
        <main className={usesFixedHeader ? 'page-main has-fixed-header' : 'page-main'}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="/category/:categoryName" element={
              <ProtectedRoute>
                <Category />
              </ProtectedRoute>
            } />
            <Route path="/post/:postId" element={
              <ProtectedRoute>
                <PostDetails />
              </ProtectedRoute>
            } />
            <Route path="/my-account" element={
              <ProtectedRoute>
                <MyAccount />
              </ProtectedRoute>
            } />
           {/* Add 404 fallback */}
           <Route path="*" element={<div>Page not found</div>} />
          </Routes>
        </main>
        
        <Footer />
      </LanguageProvider>
    </div>
  )
}

export default WImportAndTechnology;
