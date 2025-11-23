import React, { createContext, useContext, useState, useEffect } from 'react';
import { useFrappeAuth, useFrappePostCall } from 'frappe-react-sdk';

const AuthContext = createContext();

// HMR-friendly hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const { login, logout, currentUser, isLoading, error } = useFrappeAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [otpPhone, setOtpPhone] = useState(() => localStorage.getItem('kidopia_phone') || '');

  // ✅ Use the correct backend API paths
  const { call: callSendOtp, loading: sendingOtp } = useFrappePostCall(
    'cms_portal.cms_portal.api.sendOTP'
  );
  const { call: callCheckOtp, loading: checkingOtp } = useFrappePostCall(
    'cms_portal.cms_portal.api.checkOTP'
  );

  useEffect(() => {
    // User is authenticated if either Frappe user exists OR OTP phone is verified
    const authenticated = !!(currentUser || otpPhone);
    setIsAuthenticated(authenticated);
  }, [currentUser, otpPhone]);

  const handleLogin = async (email, password) => {
    try {
      await login({ usr: email, pwd: password });
      setIsAuthenticated(true);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message || 'Login failed' };
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsAuthenticated(false);
      setOtpPhone('');
      localStorage.removeItem('kidopia_phone');
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message || 'Logout failed' };
    }
  };

  const sendOtp = async (phoneNumber) => {
    try {
      const result = await callSendOtp({ 
        phone_number: phoneNumber 
      });
      
      // ✅ Handle the API response format: {"message": {"message": "OTP sent successfully", "otp": 8345}}
      if (result?.message?.message === "OTP sent successfully") {
        return { 
          success: true, 
          data: result,
          message: result.message 
        };
      } else {
        // Return the original Frappe error structure
        return result; // Return the full result as-is
      }
    } catch (err) {
      // Return the full Frappe error object
      return err; // Return the full error as-is
    }
  };

  const verifyOtp = async (phoneNumber, otp) => {
    try {
      const result = await callCheckOtp({ 
        phone_number: phoneNumber, 
        otp: otp 
      });
      
      // ✅ Handle the API response format: {"message": {"message": "Successful OTP"}}
      if (result?.message?.message === "Successful OTP") {
        setOtpPhone(phoneNumber);
        localStorage.setItem('kidopia_phone', phoneNumber);
        setIsAuthenticated(true);
        return { 
          success: true, 
          data: result,
          message: result.message 
        };
      } else {
        // Return the original Frappe error structure
        return result; // Return the full result as-is
      }
    } catch (err) {
      // Return the full Frappe error object
      return err; // Return the full error as-is
    }
  };

  const value = {
    // Auth state
    isAuthenticated,
    currentUser,
    isLoading,
    error,
    
    // OTP state
    sendingOtp,
    checkingOtp,
    otpPhone,
    
    // Methods
    login: handleLogin,
    logout: handleLogout,
    sendOtp,
    verifyOtp,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};