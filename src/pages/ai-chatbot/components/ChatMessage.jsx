import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ChatMessage = ({ message, isUser, timestamp, onPlayAudio, isPlaying }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const formatTime = (date) => {
    return new Date(date)?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const renderMessageContent = () => {
    if (message?.type === 'image') {
      return (
        <div className="space-y-3">
          <Image
            src={message?.imageUrl}
            alt="Uploaded crop image"
            className="rounded-lg max-w-xs w-full"
          />
          {message?.text && (
            <p className="text-sm">{message?.text}</p>
          )}
        </div>
      );
    }

    if (message?.type === 'structured') {
      return (
        <div className="space-y-3">
          <p className="font-medium">{message?.title}</p>
          <div className="bg-background/50 rounded-lg p-3 space-y-2">
            {message?.data?.map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{item?.label}:</span>
                <span className="font-medium">{item?.value}</span>
              </div>
            ))}
          </div>
          {message?.text && (
            <p className="text-sm">{message?.text}</p>
          )}
        </div>
      );
    }

    return <p className="text-sm leading-relaxed">{message?.text}</p>;
  };

  return (
    <div
      className={`
        flex items-start space-x-3 transition-smooth transform
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
        ${isUser ? 'flex-row-reverse space-x-reverse' : ''}
      `}
    >
      {/* Avatar */}
      <div
        className={`
          w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
          ${isUser 
            ? 'bg-primary text-primary-foreground' 
            : 'bg-accent text-accent-foreground'
          }
        `}
      >
        <Icon 
          name={isUser ? 'User' : 'Bot'} 
          size={16} 
          color="white"
        />
      </div>
      {/* Message Content */}
      <div className={`flex-1 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg`}>
        <div
          className={`
            rounded-2xl px-4 py-3 shadow-minimal
            ${isUser
              ? 'bg-primary text-primary-foreground ml-auto'
              : 'bg-card text-card-foreground border border-border'
            }
          `}
        >
          {renderMessageContent()}
        </div>

        {/* Message Actions */}
        <div className={`flex items-center mt-2 space-x-2 ${isUser ? 'justify-end' : ''}`}>
          <span className="text-xs text-muted-foreground">
            {formatTime(timestamp)}
          </span>
          
          {!isUser && message?.text && (
            <button
              onClick={() => onPlayAudio && onPlayAudio(message?.text)}
              className={`
                p-1 rounded-full transition-smooth
                ${isPlaying 
                  ? 'bg-success text-success-foreground' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }
              `}
              aria-label="Play audio"
            >
              <Icon 
                name={isPlaying ? 'Volume2' : 'Volume1'} 
                size={12} 
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;