import React from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../../services/api';
import { SignInPage } from '../ui/sign-in';

const testimonials = [
  {
    avatarSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    name: "Sarah Chen",
    handle: "@sarahdigital",
    text: "Kairo has transformed how I manage my workflow. The AI integration is seamless!"
  },
  {
    avatarSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    name: "Marcus Johnson",
    handle: "@marcustech",
    text: "Best productivity tool I've used. Converts conversations into actionable tasks effortlessly."
  },
  {
    avatarSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    name: "David Martinez",
    handle: "@davidcreates",
    text: "The email integration and AI-powered task creation saves me hours every week."
  },
];

function Login() {
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    authAPI.login();
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <SignInPage
      title={
        <>
          <span className="font-light text-foreground tracking-tighter">Welcome to </span>
          <span 
            onClick={handleLogoClick}
            className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-500 cursor-pointer hover:from-teal-300 hover:to-purple-400 transition-all duration-200"
          >
            Kairo
          </span>
        </>
      }
      description="AI that Converts Conversations into Workflows. Sign in to manage your tasks and sync emails automatically."
      heroImageSrc="https://images.unsplash.com/photo-1642615835477-d303d7dc9ee9?w=2160&q=80"
      testimonials={testimonials}
      onGoogleSignIn={handleGoogleSignIn}
    />
  );
}

export default Login;
