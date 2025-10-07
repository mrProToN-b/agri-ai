import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

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

    if (!formData?.emailOrPhone) {
      newErrors.emailOrPhone = 'Email or phone number is required';
    } else {
      // Check if it's email format
      const isEmail = formData?.emailOrPhone?.includes('@');
      const isPhone = /^[0-9]{10}$/?.test(formData?.emailOrPhone);
      
      if (isEmail && !/\S+@\S+\.\S+/?.test(formData?.emailOrPhone)) {
        newErrors.emailOrPhone = 'Please enter a valid email address';
      } else if (!isEmail && !isPhone) {
        newErrors.emailOrPhone = 'Please enter a valid email or 10-digit phone number';
      }
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Check demo credentials
    if (formData?.emailOrPhone && formData?.password) {
      if (formData?.emailOrPhone !== 'farmer@demo.com' || formData?.password !== 'demo123') {
        newErrors.credentials = 'Invalid credentials. Use demo credentials: farmer@demo.com / demo123';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Email or Phone Number"
        type="text"
        placeholder="Enter email or 10-digit phone"
        value={formData?.emailOrPhone}
        onChange={(e) => handleInputChange('emailOrPhone', e?.target?.value)}
        error={errors?.emailOrPhone}
        required
        className="mb-4"
      />
      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter your password"
          value={formData?.password}
          onChange={(e) => handleInputChange('password', e?.target?.value)}
          error={errors?.password}
          required
          className="mb-4"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-smooth"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
        </button>
      </div>
      {errors?.credentials && (
        <div className="p-3 bg-error/10 border border-error/20 rounded-lg">
          <p className="text-sm text-error">{errors?.credentials}</p>
        </div>
      )}
      <div className="flex items-center justify-between mb-6">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
          />
          <span className="text-sm text-muted-foreground">Remember me</span>
        </label>
        
        <button
          type="button"
          className="text-sm text-primary hover:text-accent transition-smooth"
        >
          Forgot Password?
        </button>
      </div>
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading}
        iconName="LogIn"
        iconPosition="left"
      >
        Sign In to Dashboard
      </Button>
      {/* Demo Credentials Info */}
      <div className="mt-6 p-4 bg-muted rounded-lg border border-border">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-primary mt-0.5" />
          <div>
            <p className="text-xs font-medium text-foreground mb-1">Demo Credentials</p>
            <p className="text-xs text-muted-foreground font-mono">Email: farmer@demo.com</p>
            <p className="text-xs text-muted-foreground font-mono">Password: demo123</p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;