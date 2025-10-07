import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const FloatingChatButton = ({ isOpen = false, onToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleChatToggle = () => {
    if (location?.pathname === '/ai-chatbot') {
      // If already on chat page, just toggle the button state
      if (onToggle) onToggle();
    } else {
      // Navigate to chat page
      setIsAnimating(true);
      setTimeout(() => {
        navigate('/ai-chatbot');
        setIsAnimating(false);
      }, 200);
    }
  };

  const isOnChatPage = location?.pathname === '/ai-chatbot';

  return (
    <div className="fixed bottom-6 right-6 z-300">
      {/* Chat Button */}
      <button
        onClick={handleChatToggle}
        className={`
          w-14 h-14 md:w-16 md:h-16 rounded-full shadow-modal transition-smooth
          flex items-center justify-center
          ${isOnChatPage
            ? 'bg-accent hover:bg-accent/90' :'bg-primary hover:bg-primary/90'
          }
          ${isAnimating ? 'scale-95' : 'scale-100 hover:scale-105'}
          focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
        `}
        aria-label={isOnChatPage ? 'Chat options' : 'Open AI Assistant'}
        title={isOnChatPage ? 'Chat options' : 'Chat with AI Assistant'}
      >
        <Icon
          name={isOnChatPage ? 'Settings' : 'MessageCircle'}
          size={24}
          color="white"
          className={`transition-smooth ${isAnimating ? 'rotate-180' : 'rotate-0'}`}
        />
      </button>
      {/* Voice Input Indicator */}
      {isOnChatPage && (
        <div className="absolute -top-2 -right-2">
          <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center animate-pulse">
            <Icon name="Mic" size={12} color="white" />
          </div>
        </div>
      )}
      {/* Notification Badge */}
      {!isOnChatPage && (
        <div className="absolute -top-1 -right-1">
          <div className="w-5 h-5 bg-warning rounded-full flex items-center justify-center">
            <span className="text-xs font-medium text-warning-foreground">AI</span>
          </div>
        </div>
      )}
      {/* Waveform Animation (when voice is active) */}
      {isOnChatPage && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="flex space-x-1">
            {[...Array(3)]?.map((_, i) => (
              <div
                key={i}
                className="w-1 h-8 bg-white/30 rounded-full animate-waveform"
                style={{
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: '1s'
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingChatButton;