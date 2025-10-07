import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SocialAuthSection = ({ isLoading }) => {
  const handleSocialAuth = (provider) => {
    // Mock social authentication
    console.log(`Authenticating with ${provider}`);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <Button
          variant="outline"
          size="lg"
          fullWidth
          onClick={() => handleSocialAuth('google')}
          disabled={isLoading}
          iconName="Chrome"
          iconPosition="left"
        >
          Continue with Google
        </Button>

        <Button
          variant="outline"
          size="lg"
          fullWidth
          onClick={() => handleSocialAuth('facebook')}
          disabled={isLoading}
          iconName="Facebook"
          iconPosition="left"
        >
          Continue with Facebook
        </Button>
      </div>

      {/* Trust Indicators */}
      <div className="mt-6 text-center">
        <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Shield" size={14} />
            <span>Secure</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Lock" size={14} />
            <span>Encrypted</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Users" size={14} />
            <span>10,000+ Farmers</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialAuthSection;