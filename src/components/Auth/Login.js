import React from 'react';
import { authAPI } from '../../services/api';
import { FcGoogle } from 'react-icons/fc';
import './Login.css';

function Login() {
  const handleGoogleLogin = () => {
    authAPI.login();
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Kairo</h1>
          <p>AI that Converts Conversations into Workflows</p>
        </div>
        
        <div className="login-content">
          <h2>Welcome!</h2>
          <p className="login-description">
            Sign in to manage your tasks and sync emails automatically.
          </p>
          
          <button className="google-login-button" onClick={handleGoogleLogin}>
            <FcGoogle className="google-icon" />
            Sign in with Google
          </button>
          
          <div className="login-features">
            <div className="feature">
              <span className="feature-icon">📧</span>
              <span>Email Integration</span>
            </div>
            <div className="feature">
              <span className="feature-icon">🤖</span>
              <span>AI-Powered</span>
            </div>
            <div className="feature">
              <span className="feature-icon">✅</span>
              <span>Task Automation</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
