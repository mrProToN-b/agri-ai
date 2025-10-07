import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const LanguageToggle = ({ currentLanguage, onLanguageChange }) => {
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'bn', name: 'বাংলা', flag: '🇧🇩' }
  ];

  const currentLang = languages?.find(lang => lang?.code === currentLanguage) || languages?.[0];
  const otherLang = languages?.find(lang => lang?.code !== currentLanguage) || languages?.[1];

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-muted-foreground hidden sm:inline">
        Language:
      </span>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onLanguageChange(otherLang?.code)}
        className="flex items-center space-x-2"
        aria-label={`Switch to ${otherLang?.name}`}
      >
        <span className="text-base">{currentLang?.flag}</span>
        <span className="hidden sm:inline text-sm">{currentLang?.name}</span>
        <Icon name="ArrowRightLeft" size={14} />
        <span className="text-base">{otherLang?.flag}</span>
        <span className="hidden sm:inline text-sm">{otherLang?.name}</span>
      </Button>
    </div>
  );
};

export default LanguageToggle;