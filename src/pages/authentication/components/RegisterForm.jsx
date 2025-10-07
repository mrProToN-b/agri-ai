import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const RegisterForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    farmSize: '',
    location: '',
    cropTypes: '',
    soilType: '',
    language: 'english',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});

  const soilTypeOptions = [
    { value: 'clay', label: 'Clay Soil' },
    { value: 'sandy', label: 'Sandy Soil' },
    { value: 'loamy', label: 'Loamy Soil' },
    { value: 'silt', label: 'Silt Soil' },
    { value: 'peaty', label: 'Peaty Soil' },
    { value: 'chalky', label: 'Chalky Soil' }
  ];

  const languageOptions = [
    { value: 'english', label: 'English' },
    { value: 'bengali', label: 'বাংলা (Bengali)' },
    { value: 'hindi', label: 'हिंदी (Hindi)' },
    { value: 'tamil', label: 'தமிழ் (Tamil)' },
    { value: 'telugu', label: 'తెలుగు (Telugu)' }
  ];

  const farmSizeOptions = [
    { value: 'small', label: 'Small (< 2 acres)' },
    { value: 'medium', label: 'Medium (2-10 acres)' },
    { value: 'large', label: 'Large (10+ acres)' }
  ];

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

    if (!formData?.username) {
      newErrors.username = 'Username is required';
    } else if (formData?.username?.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/?.test(formData?.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData?.farmSize) {
      newErrors.farmSize = 'Farm size is required';
    }

    if (!formData?.location) {
      newErrors.location = 'Farm location is required';
    }

    if (!formData?.cropTypes) {
      newErrors.cropTypes = 'Primary crop types are required';
    }

    if (!formData?.soilType) {
      newErrors.soilType = 'Soil type is required';
    }

    if (!formData?.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Username"
          type="text"
          placeholder="Choose a username"
          value={formData?.username}
          onChange={(e) => handleInputChange('username', e?.target?.value)}
          error={errors?.username}
          required
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          value={formData?.email}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          error={errors?.email}
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Phone Number"
          type="tel"
          placeholder="10-digit phone number"
          value={formData?.phone}
          onChange={(e) => handleInputChange('phone', e?.target?.value)}
          error={errors?.phone}
          required
        />

        <Select
          label="Preferred Language"
          options={languageOptions}
          value={formData?.language}
          onChange={(value) => handleInputChange('language', value)}
          error={errors?.language}
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Password"
          type="password"
          placeholder="Create a password"
          value={formData?.password}
          onChange={(e) => handleInputChange('password', e?.target?.value)}
          error={errors?.password}
          required
        />

        <Input
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          value={formData?.confirmPassword}
          onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
          error={errors?.confirmPassword}
          required
        />
      </div>
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground border-b border-border pb-2">
          Farm Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Farm Location"
            type="text"
            placeholder="City, District, State"
            value={formData?.location}
            onChange={(e) => handleInputChange('location', e?.target?.value)}
            error={errors?.location}
            description="Your farm's location for weather data"
            required
          />

          <Select
            label="Farm Size"
            options={farmSizeOptions}
            value={formData?.farmSize}
            onChange={(value) => handleInputChange('farmSize', value)}
            error={errors?.farmSize}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Primary Crop Types"
            type="text"
            placeholder="e.g., Rice, Wheat, Vegetables"
            value={formData?.cropTypes}
            onChange={(e) => handleInputChange('cropTypes', e?.target?.value)}
            error={errors?.cropTypes}
            description="Main crops you grow"
            required
          />

          <Select
            label="Soil Type"
            options={soilTypeOptions}
            value={formData?.soilType}
            onChange={(value) => handleInputChange('soilType', value)}
            error={errors?.soilType}
            description="Predominant soil type on your farm"
            required
          />
        </div>
      </div>
      <div className="space-y-4">
        <Checkbox
          label="I agree to the Terms and Conditions and Privacy Policy"
          checked={formData?.agreeToTerms}
          onChange={(e) => handleInputChange('agreeToTerms', e?.target?.checked)}
          error={errors?.agreeToTerms}
          description="By registering, you agree to our terms of service and privacy policy"
          required
        />
      </div>
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading}
        iconName="UserPlus"
        iconPosition="left"
      >
        Create Farmer Account
      </Button>
      {/* Additional Information */}
      <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={16} className="text-primary mt-0.5" />
          <div>
            <p className="text-xs font-medium text-foreground mb-1">Secure Registration</p>
            <p className="text-xs text-muted-foreground">
              Your farm data is encrypted and used only to provide personalized agricultural recommendations.
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;