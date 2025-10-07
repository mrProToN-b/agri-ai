import React, { useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';

const ChatContainer = ({ 
  messages = [], 
  isTyping = false, 
  onPlayAudio, 
  playingMessageId = null 
}) => {
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'end'
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
        <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-medium">AI</span>
        </div>
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">
        Welcome to Krishi-Sakhi AI Assistant
      </h3>
      <p className="text-muted-foreground max-w-md">
        Ask me anything about farming, crop diseases, weather, soil analysis, or market prices. 
        I'm here to help you make better farming decisions.
      </p>
      <div className="mt-6 flex flex-wrap gap-2 justify-center">
        <span className="px-3 py-1 bg-muted rounded-full text-xs text-muted-foreground">
          Disease Detection
        </span>
        <span className="px-3 py-1 bg-muted rounded-full text-xs text-muted-foreground">
          Weather Forecast
        </span>
        <span className="px-3 py-1 bg-muted rounded-full text-xs text-muted-foreground">
          Crop Advice
        </span>
        <span className="px-3 py-1 bg-muted rounded-full text-xs text-muted-foreground">
          Market Prices
        </span>
      </div>
    </div>
  );

  return (
    <div 
      ref={containerRef}
      className="flex-1 overflow-y-auto bg-background"
      style={{ height: 'calc(100vh - 200px)' }}
    >
      <div className="max-w-4xl mx-auto p-4">
        {messages?.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-6">
            {messages?.map((message, index) => (
              <ChatMessage
                key={`${message?.timestamp}-${index}`}
                message={message}
                isUser={message?.sender === 'user'}
                timestamp={message?.timestamp}
                onPlayAudio={onPlayAudio}
                isPlaying={playingMessageId === `${message?.timestamp}-${index}`}
              />
            ))}
            
            {isTyping && (
              <div className="mt-6">
                <TypingIndicator />
              </div>
            )}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatContainer;