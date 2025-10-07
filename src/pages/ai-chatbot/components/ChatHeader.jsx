import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import LanguageToggle from './LanguageToggle';

const ChatHeader = ({ 
  currentLanguage, 
  onLanguageChange, 
  onClearChat, 
  messageCount = 0 
}) => {
  const navigate = useNavigate();

  const getHeaderText = () => {
    if (currentLanguage === 'bn') {
      return {
        title: 'কৃষি সহায়ক',
        subtitle: 'আপনার স্মার্ট কৃষি সহায়ক'
      };
    }
    return {
      title: 'AI Agricultural Assistant',
      subtitle: 'Your smart farming companion'
    };
  };

  const headerText = getHeaderText();

  return (
    <div className="border-b border-border bg-card px-4 py-3">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        {/* Left Section - Back Button & Title */}
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/farmer-dashboard')}
            className="lg:hidden"
            aria-label="Back to dashboard"
          >
            <Icon name="ArrowLeft" size={20} />
          </Button>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
              <Icon name="Bot" size={20} color="white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">
                {headerText?.title}
              </h1>
              <p className="text-sm text-muted-foreground">
                {headerText?.subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Right Section - Controls */}
        <div className="flex items-center space-x-2">
          {/* Language Toggle */}
          <LanguageToggle
            currentLanguage={currentLanguage}
            onLanguageChange={onLanguageChange}
          />

          {/* Clear Chat Button */}
          {messageCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearChat}
              className="hidden sm:flex"
              iconName="Trash2"
              iconPosition="left"
            >
              Clear
            </Button>
          )}

          {/* Mobile Clear Button */}
          {messageCount > 0 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClearChat}
              className="sm:hidden"
              aria-label="Clear chat"
            >
              <Icon name="Trash2" size={18} />
            </Button>
          )}

          {/* Settings Button */}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Chat settings"
          >
            <Icon name="Settings" size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;