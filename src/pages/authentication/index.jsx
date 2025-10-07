import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticationHeader from './components/AuthenticationHeader';
import AuthenticationTabs from './components/AuthenticationTabs';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import SocialAuthSection from './components/SocialAuthSection';
import Icon from '../../components/AppIcon';

const Authentication = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');
  const [isLoading, setIsLoading] = useState(false);

  // Check if user is already authenticated
  useEffect(() => {
    const userData = localStorage.getItem('krishiSakhiUser');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        if (user?.isAuthenticated) {
          navigate('/farmer-dashboard');
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('krishiSakhiUser');
      }
    }
  }, [navigate]);

  const handleLogin = async (formData) => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const userData = {
        id: 'farmer_001',
        username: 'demo_farmer',
        email: formData?.emailOrPhone,
        fullName: 'Demo Farmer',
        phone: '9876543210',
        farmLocation: 'West Bengal, India',
        farmSize: 'medium',
        cropTypes: 'Rice, Vegetables',
        soilType: 'loamy',
        language: 'english',
        isAuthenticated: true,
        loginTime: new Date()?.toISOString(),
        profileComplete: true
      };

      localStorage.setItem('krishiSakhiUser', JSON.stringify(userData));
      setIsLoading(false);
      navigate('/farmer-dashboard');
    }, 1500);
  };

  const handleRegister = async (formData) => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const userData = {
        id: `farmer_${Date.now()}`,
        username: formData?.username,
        email: formData?.email,
        fullName: formData?.username,
        phone: formData?.phone,
        farmLocation: formData?.location,
        farmSize: formData?.farmSize,
        cropTypes: formData?.cropTypes,
        soilType: formData?.soilType,
        language: formData?.language,
        isAuthenticated: true,
        registrationTime: new Date()?.toISOString(),
        profileComplete: true
      };

      localStorage.setItem('krishiSakhiUser', JSON.stringify(userData));
      setIsLoading(false);
      navigate('/farmer-dashboard');
    }, 2000);
  };

  const handleBackToHome = () => {
    navigate('/home-landing');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      
      {/* Navigation Header */}
      <header className="relative z-10 p-4 lg:p-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <button
            onClick={handleBackToHome}
            className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-smooth"
          >
            <Icon name="ArrowLeft" size={20} />
            <span className="text-sm font-medium">Back to Home</span>
          </button>
          
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Shield" size={16} />
              <span>Secure Authentication</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] p-4">
        <div className="w-full max-w-md lg:max-w-lg">
          {/* Authentication Card */}
          <div className="bg-card rounded-2xl shadow-modal border border-border p-6 lg:p-8">
            <AuthenticationHeader />
            
            <AuthenticationTabs 
              activeTab={activeTab} 
              onTabChange={setActiveTab} 
            />

            <div className="space-y-6">
              {activeTab === 'login' ? (
                <LoginForm 
                  onSubmit={handleLogin} 
                  isLoading={isLoading} 
                />
              ) : (
                <RegisterForm 
                  onSubmit={handleRegister} 
                  isLoading={isLoading} 
                />
              )}

              <SocialAuthSection isLoading={isLoading} />
            </div>
          </div>

          {/* Footer Information */}
          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground mb-2">
              By continuing, you agree to our{' '}
              <button className="text-primary hover:text-accent transition-smooth">
                Terms of Service
              </button>{' '}
              and{' '}
              <button className="text-primary hover:text-accent transition-smooth">
                Privacy Policy
              </button>
            </p>
            
            <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground mt-4">
              <div className="flex items-center space-x-1">
                <Icon name="Globe" size={14} />
                <span>Available in 5+ Languages</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Smartphone" size={14} />
                <span>Mobile Optimized</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-300">
          <div className="bg-card rounded-xl p-6 flex items-center space-x-4">
            <div className="animate-spin">
              <Icon name="Loader2" size={24} className="text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">
                {activeTab === 'login' ? 'Signing you in...' : 'Creating your account...'}
              </p>
              <p className="text-sm text-muted-foreground">
                Setting up your farming dashboard
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Authentication;