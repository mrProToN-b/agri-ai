import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const QuickActions = ({ onActionClick, currentLanguage = 'en' }) => {
  const getQuickActions = () => {
    if (currentLanguage === 'bn') {
      return [
        {
          id: 'weather',
          icon: 'Cloud',
          label: 'আবহাওয়া',
          query: 'আজকের আবহাওয়া কেমন?'
        },
        {
          id: 'disease',
          icon: 'Bug',
          label: 'রোগ নির্ণয়',
          query: 'আমার ফসলের রোগ সনাক্ত করুন'
        },
        {
          id: 'fertilizer',
          icon: 'Droplets',
          label: 'সার',
          query: 'কোন সার ব্যবহার করব?'
        },
        {
          id: 'price',
          icon: 'TrendingUp',
          label: 'দাম',
          query: 'বাজারের দাম কত?'
        }
      ];
    }
    
    return [
      {
        id: 'weather',
        icon: 'Cloud',
        label: 'Weather',
        query: 'What\'s today\'s weather forecast?'
      },
      {
        id: 'disease',
        icon: 'Bug',
        label: 'Disease',
        query: 'Help me identify crop diseases'
      },
      {
        id: 'fertilizer',
        icon: 'Droplets',
        label: 'Fertilizer',
        query: 'What fertilizer should I use?'
      },
      {
        id: 'price',
        icon: 'TrendingUp',
        label: 'Prices',
        query: 'Show me current market prices'
      }
    ];
  };

  const quickActions = getQuickActions();

  const handleActionClick = (action) => {
    if (onActionClick) {
      onActionClick({
        text: action?.query,
        type: 'text',
        timestamp: new Date()
      });
    }
  };

  return (
    <div className="p-4 border-b border-border bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <p className="text-sm text-muted-foreground mb-3">
          {currentLanguage === 'bn' ? 'দ্রুত প্রশ্ন:' : 'Quick questions:'}
        </p>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {quickActions?.map((action) => (
            <Button
              key={action?.id}
              variant="outline"
              size="sm"
              onClick={() => handleActionClick(action)}
              className="flex flex-col items-center space-y-1 h-auto py-3 px-2"
            >
              <Icon name={action?.icon} size={20} />
              <span className="text-xs text-center leading-tight">
                {action?.label}
              </span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;