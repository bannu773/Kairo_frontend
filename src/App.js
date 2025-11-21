import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { ToastProvider } from './components/ui/Toast';
import Login from './components/Auth/Login';
import AuthCallback from './components/Auth/AuthCallback';
import Dashboard from './components/Dashboard/Dashboard';
import MeetingList from './components/Meetings/MeetingList';
import MeetingSummary from './components/Meetings/MeetingSummary';
import LandingPage from './components/LandingPage/LandingPage';

// Protected Route Component
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

function App() {
  return (
    <Provider store={store}>
      <ToastProvider>
        <Router>
          <div className="App min-h-screen bg-dark-bg">
            <Routes>
              <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/meetings"
            element={
              <ProtectedRoute>
                <MeetingList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/meetings/:meetingId/summary"
            element={
              <ProtectedRoute>
                <MeetingSummary />
              </ProtectedRoute>
            }
          />
          <Route
            path="/meetings/:meetingId/transcript"
            element={
              <ProtectedRoute>
                <MeetingSummary />
              </ProtectedRoute>
            }
          />
          </Routes>
        </div>
      </Router>
      </ToastProvider>
    </Provider>
  );
}

export default App;

