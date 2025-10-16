import React, { createContext, useContext, useState, useEffect } from 'react';
import { useFrappeAuth, useFrappePostCall } from 'frappe-react-sdk';

const AuthContext = createContext();

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

  // Prepare POST callers for OTP endpoints
  const { call: callSendOtp, loading: sendingOtp } = useFrappePostCall('game_portal.game_portal.api.sendOTP');
  const { call: callCheckOtp, loading: checkingOtp } = useFrappePostCall('game_portal.game_portal.api.checkOTP');

  useEffect(() => {
    console.log('AuthContext - currentUser changed:', currentUser);
    console.log('AuthContext - isLoading:', isLoading);
    console.log('AuthContext - error:', error);
    // Consider authenticated if either Frappe session exists or OTP phone stored
    setIsAuthenticated(!!currentUser || !!otpPhone);
  }, [currentUser, isLoading, error, otpPhone]);

  const handleLogin = async (email, password) => {
    try {
      console.log('Attempting login with formatted email:', { email, password: '***' });
      console.log('Note: Email format should be 0{phone}@yourdomain.com');
      
      // Try different login formats that frappe-react-sdk might expect
      let loginResult;
      
      try {
        // Method 1: Object with usr and pwd
        console.log('Trying login method 1: {usr, pwd}');
        loginResult = await login({
          usr: email,
          pwd: password
        });
      } catch (firstError) {
        console.log('Method 1 failed, trying method 2:', firstError.message);
        
        try {
          // Method 2: Direct parameters
          console.log('Trying login method 2: direct parameters');
          loginResult = await login(email, password);
        } catch (secondError) {
          console.log('Method 2 failed, trying method 3:', secondError.message);
          
          // Method 3: Alternative object format
          console.log('Trying login method 3: alternative format');
          loginResult = await login({
            username: email,
            password: password
          });
        }
      }
      
      console.log('Login successful:', loginResult);
      setIsAuthenticated(true);
      return { success: true };
    } catch (err) {
      console.error('All login methods failed:', err);
      console.error('Error message:', err.message);
      console.error('Error response:', err.response);
      console.error('Error status:', err.status);
      
      return { 
        success: false, 
        error: err.message || 'Login failed. Please check your credentials.' 
      };
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
      console.error('Logout error:', err);
      return { 
        success: false, 
        error: err.message || 'Logout failed' 
      };
    }
  };

  // OTP: send code to phone
  const sendOtp = async (phoneNumber) => {
    try {
      const payload = { phone_number: phoneNumber };
      const res = await callSendOtp(payload);
      return { success: true, data: res?.message };
    } catch (err) {
      console.error('sendOtp error:', err);
      return { success: false, error: err.message || 'Failed to send OTP' };
    }
  };

  // OTP: verify code -> authenticate app and store phone
  const verifyOtp = async (phoneNumber, otp) => {
    try {
      const payload = { phone_number: phoneNumber, otp };
      const res = await callCheckOtp(payload);
      // If backend returns success, mark authenticated and store phone
      setOtpPhone(phoneNumber);
      localStorage.setItem('kidopia_phone', phoneNumber);
      setIsAuthenticated(true);
      return { success: true, data: res?.message };
    } catch (err) {
      console.error('verifyOtp error:', err);
      return { success: false, error: err.message || 'Invalid OTP' };
    }
  };

  const value = {
    isAuthenticated,
    currentUser,
    isLoading,
    error,
    sendingOtp,
    checkingOtp,
    otpPhone,
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
