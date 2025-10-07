import React, { useState } from 'react';
import Button from './Button';
import Input from './Input';
import { Checkbox } from './Checkbox';
import Icon from '../AppIcon';

const AuthenticationTabs = ({ onAuthSuccess }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    farmLocation: '',
    farmSize: '',
    cropTypes: '',
    phoneNumber: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Common validations
    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Registration specific validations
    if (activeTab === 'register') {
      if (!formData?.fullName) {
        newErrors.fullName = 'Full name is required';
      }

      if (!formData?.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData?.password !== formData?.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }

      if (!formData?.farmLocation) {
        newErrors.farmLocation = 'Farm location is required';
      }

      if (!formData?.farmSize) {
        newErrors.farmSize = 'Farm size is required';
      }

      if (!formData?.phoneNumber) {
        newErrors.phoneNumber = 'Phone number is required';
      }

      if (!formData?.agreeToTerms) {
        newErrors.agreeToTerms = 'You must agree to the terms and conditions';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Store user data in localStorage for demo
      const userData = {
        email: formData?.email,
        fullName: formData?.fullName || 'Farmer User',
        farmLocation: formData?.farmLocation || 'Unknown',
        isAuthenticated: true,
        loginTime: new Date()?.toISOString()
      };
      
      localStorage.setItem('krishiSakhiUser', JSON.stringify(userData));
      
      if (onAuthSuccess) {
        onAuthSuccess(userData);
      }
    }, 1500);
  };

  const tabButtonClass = (tabName) => `
    flex-1 py-3 px-4 text-sm font-medium rounded-lg transition-smooth
    ${activeTab === tabName
      ? 'bg-primary text-primary-foreground'
      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
    }
  `;

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Tab Navigation */}
      <div className="flex bg-muted rounded-lg p-1 mb-6">
        <button
          onClick={() => setActiveTab('login')}
          className={tabButtonClass('login')}
        >
          <Icon name="LogIn" size={16} className="inline mr-2" />
          Login
        </button>
        <button
          onClick={() => setActiveTab('register')}
          className={tabButtonClass('register')}
        >
          <Icon name="UserPlus" size={16} className="inline mr-2" />
          Register
        </button>
      </div>
      {/* Form Content */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {activeTab === 'register' && (
          <Input
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            value={formData?.fullName}
            onChange={(e) => handleInputChange('fullName', e?.target?.value)}
            error={errors?.fullName}
            required
          />
        )}

        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          value={formData?.email}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          error={errors?.email}
          required
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={formData?.password}
          onChange={(e) => handleInputChange('password', e?.target?.value)}
          error={errors?.password}
          required
        />

        {activeTab === 'register' && (
          <>
            <Input
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              value={formData?.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
              error={errors?.confirmPassword}
              required
            />

            <Input
              label="Phone Number"
              type="tel"
              placeholder="Enter your phone number"
              value={formData?.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e?.target?.value)}
              error={errors?.phoneNumber}
              required
            />

            <Input
              label="Farm Location"
              type="text"
              placeholder="Enter your farm location"
              value={formData?.farmLocation}
              onChange={(e) => handleInputChange('farmLocation', e?.target?.value)}
              error={errors?.farmLocation}
              description="City, District, State"
              required
            />

            <Input
              label="Farm Size"
              type="text"
              placeholder="e.g., 5 acres, 2 hectares"
              value={formData?.farmSize}
              onChange={(e) => handleInputChange('farmSize', e?.target?.value)}
              error={errors?.farmSize}
              required
            />

            <Input
              label="Primary Crop Types"
              type="text"
              placeholder="e.g., Rice, Wheat, Vegetables"
              value={formData?.cropTypes}
              onChange={(e) => handleInputChange('cropTypes', e?.target?.value)}
              description="Optional: Main crops you grow"
            />

            <Checkbox
              label="I agree to the Terms and Conditions"
              checked={formData?.agreeToTerms}
              onChange={(e) => handleInputChange('agreeToTerms', e?.target?.checked)}
              error={errors?.agreeToTerms}
              required
            />
          </>
        )}

        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading}
          iconName={activeTab === 'login' ? 'LogIn' : 'UserPlus'}
          iconPosition="left"
        >
          {activeTab === 'login' ? 'Sign In' : 'Create Account'}
        </Button>

        {activeTab === 'login' && (
          <div className="text-center">
            <button
              type="button"
              className="text-sm text-primary hover:text-accent transition-smooth"
            >
              Forgot your password?
            </button>
          </div>
        )}
      </form>
      {/* Demo Credentials */}
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <p className="text-xs text-muted-foreground mb-2">Demo Credentials:</p>
        <p className="text-xs font-mono">Email: farmer@demo.com</p>
        <p className="text-xs font-mono">Password: demo123</p>
      </div>
    </div>
  );
};

export default AuthenticationTabs;