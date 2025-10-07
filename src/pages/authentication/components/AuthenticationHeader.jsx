import React from 'react';
import Icon from '../../../components/AppIcon';


const AuthenticationHeader = () => {
  return (
    <div className="text-center mb-8">
      {/* Logo Section */}
      <div className="flex items-center justify-center mb-6">
        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mr-3">
          <Icon name="Sprout" size={28} color="white" />
        </div>
        <div className="text-left">
          <h1 className="text-2xl font-bold text-foreground">Krishi-Sakhi</h1>
          <p className="text-sm text-muted-foreground">Smart Farming Platform</p>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Welcome to Agricultural Intelligence
        </h2>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          Join thousands of farmers using AI-powered tools for better crop management, disease detection, and yield optimization.
        </p>
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Icon name="Bug" size={20} color="var(--color-success)" />
          </div>
          <p className="text-xs text-muted-foreground">Disease Detection</p>
        </div>
        <div className="text-center">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Icon name="MessageCircle" size={20} color="var(--color-primary)" />
          </div>
          <p className="text-xs text-muted-foreground">AI Assistant</p>
        </div>
        <div className="text-center">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Icon name="Layers" size={20} color="var(--color-accent)" />
          </div>
          <p className="text-xs text-muted-foreground">Soil Analysis</p>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationHeader;