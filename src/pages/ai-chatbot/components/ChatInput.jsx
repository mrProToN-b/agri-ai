import React, { useState, useRef, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';
import VoiceWaveform from './VoiceWaveform';

const ChatInput = ({ 
  onSendMessage, 
  onVoiceInput, 
  isListening = false, 
  currentLanguage = 'en',
  disabled = false 
}) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef(null);
  const textInputRef = useRef(null);

  useEffect(() => {
    setIsRecording(isListening);
  }, [isListening]);

  const handleSendMessage = () => {
    if (message?.trim() && !disabled) {
      onSendMessage({
        text: message?.trim(),
        type: 'text',
        timestamp: new Date()
      });
      setMessage('');
      textInputRef?.current?.focus();
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSendMessage();
    }
  };

  const handleVoiceToggle = () => {
    if (onVoiceInput) {
      onVoiceInput(!isListening);
    }
  };

  const handleImageUpload = (e) => {
    const file = e?.target?.files?.[0];
    if (file && file?.type?.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onSendMessage({
          text: `Uploaded image for analysis`,
          type: 'image',
          imageUrl: event?.target?.result,
          timestamp: new Date()
        });
      };
      reader?.readAsDataURL(file);
    }
  };

  const triggerImageUpload = () => {
    fileInputRef?.current?.click();
  };

  const placeholderText = currentLanguage === 'bn' ?'আপনার প্রশ্ন লিখুন...' :'Ask about farming, crops, weather...';

  return (
    <div className="border-t border-border bg-card p-4">
      <div className="flex items-end space-x-3 max-w-4xl mx-auto">
        {/* Image Upload Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={triggerImageUpload}
          disabled={disabled}
          className="flex-shrink-0"
          aria-label="Upload image"
        >
          <Icon name="ImagePlus" size={20} />
        </Button>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />

        {/* Text Input */}
        <div className="flex-1 relative">
          <Input
            ref={textInputRef}
            type="text"
            placeholder={placeholderText}
            value={message}
            onChange={(e) => setMessage(e?.target?.value)}
            onKeyPress={handleKeyPress}
            disabled={disabled || isRecording}
            className="pr-12"
          />
          
          {/* Voice Input Button */}
          <button
            onClick={handleVoiceToggle}
            disabled={disabled}
            className={`
              absolute right-3 top-1/2 transform -translate-y-1/2
              w-8 h-8 rounded-full flex items-center justify-center transition-smooth
              ${isRecording
                ? 'bg-error text-error-foreground animate-pulse'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }
            `}
            aria-label={isRecording ? 'Stop recording' : 'Start voice input'}
          >
            {isRecording ? (
              <VoiceWaveform isActive={true} size="small" />
            ) : (
              <Icon name="Mic" size={16} />
            )}
          </button>
        </div>

        {/* Send Button */}
        <Button
          onClick={handleSendMessage}
          disabled={!message?.trim() || disabled || isRecording}
          variant="default"
          size="icon"
          className="flex-shrink-0"
          aria-label="Send message"
        >
          <Icon name="Send" size={18} />
        </Button>
      </div>
      {/* Voice Recording Indicator */}
      {isRecording && (
        <div className="flex items-center justify-center mt-3 space-x-2">
          <div className="w-2 h-2 bg-error rounded-full animate-pulse"></div>
          <span className="text-sm text-muted-foreground">
            {currentLanguage === 'bn' ? 'রেকর্ডিং চলছে...' : 'Recording...'}
          </span>
          <VoiceWaveform isActive={true} size="default" />
        </div>
      )}
    </div>
  );
};

export default ChatInput;