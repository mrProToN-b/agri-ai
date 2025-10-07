import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const SoilDataInput = ({ onDataSubmit, isLoading }) => {
  const [inputMethod, setInputMethod] = useState('manual');
  const [formData, setFormData] = useState({
    fieldName: '',
    testDate: new Date()?.toISOString()?.split('T')?.[0],
    pH: '',
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    organicMatter: '',
    moisture: '',
    temperature: '',
    location: ''
  });
  const [errors, setErrors] = useState({});

  const inputMethodOptions = [
    { value: 'manual', label: 'Manual Entry' },
    { value: 'device', label: 'Digital Device' },
    { value: 'lab', label: 'Lab Report Upload' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.fieldName) newErrors.fieldName = 'Field name is required';
    if (!formData?.pH) newErrors.pH = 'pH value is required';
    if (!formData?.nitrogen) newErrors.nitrogen = 'Nitrogen value is required';
    if (!formData?.phosphorus) newErrors.phosphorus = 'Phosphorus value is required';
    if (!formData?.potassium) newErrors.potassium = 'Potassium value is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (validateForm()) {
      onDataSubmit(formData);
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="FileText" size={20} color="var(--color-primary)" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Soil Test Data Input</h2>
          <p className="text-sm text-muted-foreground">Enter your soil test results for analysis</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Input Method"
            options={inputMethodOptions}
            value={inputMethod}
            onChange={setInputMethod}
            className="md:col-span-2"
          />

          <Input
            label="Field Name"
            type="text"
            placeholder="e.g., North Field, Plot A"
            value={formData?.fieldName}
            onChange={(e) => handleInputChange('fieldName', e?.target?.value)}
            error={errors?.fieldName}
            required
          />

          <Input
            label="Test Date"
            type="date"
            value={formData?.testDate}
            onChange={(e) => handleInputChange('testDate', e?.target?.value)}
            required
          />
        </div>

        {inputMethod === 'manual' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="pH Level"
              type="number"
              step="0.1"
              min="0"
              max="14"
              placeholder="6.5"
              value={formData?.pH}
              onChange={(e) => handleInputChange('pH', e?.target?.value)}
              error={errors?.pH}
              description="Scale: 0-14"
              required
            />

            <Input
              label="Nitrogen (N)"
              type="number"
              step="0.1"
              min="0"
              placeholder="25.5"
              value={formData?.nitrogen}
              onChange={(e) => handleInputChange('nitrogen', e?.target?.value)}
              error={errors?.nitrogen}
              description="mg/kg"
              required
            />

            <Input
              label="Phosphorus (P)"
              type="number"
              step="0.1"
              min="0"
              placeholder="15.2"
              value={formData?.phosphorus}
              onChange={(e) => handleInputChange('phosphorus', e?.target?.value)}
              error={errors?.phosphorus}
              description="mg/kg"
              required
            />

            <Input
              label="Potassium (K)"
              type="number"
              step="0.1"
              min="0"
              placeholder="180.0"
              value={formData?.potassium}
              onChange={(e) => handleInputChange('potassium', e?.target?.value)}
              error={errors?.potassium}
              description="mg/kg"
              required
            />

            <Input
              label="Organic Matter"
              type="number"
              step="0.1"
              min="0"
              max="100"
              placeholder="3.2"
              value={formData?.organicMatter}
              onChange={(e) => handleInputChange('organicMatter', e?.target?.value)}
              description="%"
            />

            <Input
              label="Moisture Content"
              type="number"
              step="0.1"
              min="0"
              max="100"
              placeholder="22.5"
              value={formData?.moisture}
              onChange={(e) => handleInputChange('moisture', e?.target?.value)}
              description="%"
            />
          </div>
        )}

        {inputMethod === 'device' && (
          <div className="bg-muted rounded-lg p-6 text-center">
            <Icon name="Smartphone" size={48} className="mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium text-foreground mb-2">Connect Digital Device</h3>
            <p className="text-muted-foreground mb-4">
              Connect your digital soil testing device via Bluetooth or USB
            </p>
            <Button variant="outline" iconName="Bluetooth" iconPosition="left">
              Connect Device
            </Button>
          </div>
        )}

        {inputMethod === 'lab' && (
          <div className="bg-muted rounded-lg p-6 text-center">
            <Icon name="Upload" size={48} className="mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium text-foreground mb-2">Upload Lab Report</h3>
            <p className="text-muted-foreground mb-4">
              Upload your laboratory soil test report (PDF, JPG, PNG)
            </p>
            <Button variant="outline" iconName="Upload" iconPosition="left">
              Choose File
            </Button>
          </div>
        )}

        <div className="flex justify-end space-x-4">
          <Button variant="outline" type="button">
            Save as Draft
          </Button>
          <Button 
            type="submit" 
            loading={isLoading}
            iconName="BarChart3"
            iconPosition="left"
          >
            Analyze Soil
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SoilDataInput;