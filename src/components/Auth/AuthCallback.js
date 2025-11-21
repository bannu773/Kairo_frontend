import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authAPI } from '../../services/api';
import './AuthCallback.css';

function AuthCallback() {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleCallback = async () => {
      // Get token from URL
      const params = new URLSearchParams(location.search);
      const token = params.get('token');

      if (token) {
        // Store token
        localStorage.setItem('token', token);
        
        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        setError('Authentication failed. No token received.');
      }
    };

    handleCallback();
  }, [location, navigate]);

  if (error) {
    return (
      <div className="auth-callback">
        <div className="error-container">
          <h2>Authentication Error</h2>
          <p>{error}</p>
          <button onClick={() => navigate('/login')}>
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-callback">
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Completing authentication...</p>
      </div>
    </div>
  );
}

export default AuthCallback;
