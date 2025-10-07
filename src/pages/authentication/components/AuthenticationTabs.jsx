import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const AuthenticationTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    {
      id: 'login',
      label: 'Sign In',
      icon: 'LogIn',
      description: 'Access your farming dashboard'
    },
    {
      id: 'register',
      label: 'Register',
      icon: 'UserPlus',
      description: 'Create your farmer profile'
    }
  ];

  return (
    <div className="mb-8">
      <div className="flex bg-muted rounded-xl p-1">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => onTabChange(tab?.id)}
            className={`
              flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg
              text-sm font-medium transition-smooth
              ${activeTab === tab?.id
                ? 'bg-background text-foreground shadow-minimal'
                : 'text-muted-foreground hover:text-foreground'
              }
            `}
            aria-label={tab?.description}
          >
            <Icon name={tab?.icon} size={18} />
            <span>{tab?.label}</span>
          </button>
        ))}
      </div>
      {/* Tab Description */}
      <div className="mt-3 text-center">
        <p className="text-sm text-muted-foreground">
          {tabs?.find(tab => tab?.id === activeTab)?.description}
        </p>
      </div>
    </div>
  );
};

export default AuthenticationTabs;