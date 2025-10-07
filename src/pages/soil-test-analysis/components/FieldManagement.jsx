import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const FieldManagement = () => {
  const [selectedField, setSelectedField] = useState('field1');
  const [showAddField, setShowAddField] = useState(false);
  const [newFieldData, setNewFieldData] = useState({
    name: '',
    size: '',
    location: '',
    cropType: '',
    soilType: ''
  });

  const fields = [
    {
      id: 'field1',
      name: 'North Field',
      size: '5.2 acres',
      location: 'GPS: 28.6139, 77.2090',
      cropType: 'Rice',
      soilType: 'Clay Loam',
      lastTested: '2024-06-15',
      status: 'Good',
      pH: 6.4,
      fertility: 'High'
    },
    {
      id: 'field2',
      name: 'South Field',
      size: '3.8 acres',
      location: 'GPS: 28.6120, 77.2080',
      cropType: 'Wheat',
      soilType: 'Sandy Loam',
      lastTested: '2024-05-20',
      status: 'Needs Attention',
      pH: 5.8,
      fertility: 'Medium'
    },
    {
      id: 'field3',
      name: 'East Field',
      size: '2.5 acres',
      location: 'GPS: 28.6150, 77.2100',
      cropType: 'Vegetables',
      soilType: 'Loam',
      lastTested: '2024-04-10',
      status: 'Poor',
      pH: 5.2,
      fertility: 'Low'
    }
  ];

  const fieldOptions = fields?.map(field => ({
    value: field?.id,
    label: field?.name
  }));

  const cropTypeOptions = [
    { value: 'rice', label: 'Rice' },
    { value: 'wheat', label: 'Wheat' },
    { value: 'maize', label: 'Maize' },
    { value: 'vegetables', label: 'Vegetables' },
    { value: 'sugarcane', label: 'Sugarcane' },
    { value: 'cotton', label: 'Cotton' }
  ];

  const soilTypeOptions = [
    { value: 'clay', label: 'Clay' },
    { value: 'sandy', label: 'Sandy' },
    { value: 'loam', label: 'Loam' },
    { value: 'clay-loam', label: 'Clay Loam' },
    { value: 'sandy-loam', label: 'Sandy Loam' },
    { value: 'silt', label: 'Silt' }
  ];

  const selectedFieldData = fields?.find(field => field?.id === selectedField);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Good': return 'text-success bg-success/10 border-success/20';
      case 'Needs Attention': return 'text-warning bg-warning/10 border-warning/20';
      case 'Poor': return 'text-error bg-error/10 border-error/20';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getFertilityColor = (fertility) => {
    switch (fertility) {
      case 'High': return 'text-success';
      case 'Medium': return 'text-warning';
      case 'Low': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const handleAddField = (e) => {
    e?.preventDefault();
    // Add field logic here
    setShowAddField(false);
    setNewFieldData({
      name: '',
      size: '',
      location: '',
      cropType: '',
      soilType: ''
    });
  };

  return (
    <div className="space-y-6">
      {/* Field Selection */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Map" size={20} color="var(--color-primary)" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Field Management</h3>
              <p className="text-sm text-muted-foreground">Manage multiple field locations</p>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            iconName="Plus" 
            iconPosition="left"
            onClick={() => setShowAddField(true)}
          >
            Add Field
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Select
              label="Select Field"
              options={fieldOptions}
              value={selectedField}
              onChange={setSelectedField}
            />
          </div>
          
          {selectedFieldData && (
            <div className="bg-muted rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-foreground">{selectedFieldData?.name}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedFieldData?.status)}`}>
                  {selectedFieldData?.status}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Size:</span>
                  <span className="ml-2 font-medium text-foreground">{selectedFieldData?.size}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Crop:</span>
                  <span className="ml-2 font-medium text-foreground">{selectedFieldData?.cropType}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">pH Level:</span>
                  <span className="ml-2 font-medium text-foreground">{selectedFieldData?.pH}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Fertility:</span>
                  <span className={`ml-2 font-medium ${getFertilityColor(selectedFieldData?.fertility)}`}>
                    {selectedFieldData?.fertility}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Add New Field Modal */}
      {showAddField && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-300 p-4">
          <div className="bg-card rounded-lg border border-border p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">Add New Field</h3>
              <button
                onClick={() => setShowAddField(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <Icon name="X" size={20} />
              </button>
            </div>

            <form onSubmit={handleAddField} className="space-y-4">
              <Input
                label="Field Name"
                type="text"
                placeholder="e.g., West Field"
                value={newFieldData?.name}
                onChange={(e) => setNewFieldData(prev => ({ ...prev, name: e?.target?.value }))}
                required
              />

              <Input
                label="Field Size"
                type="text"
                placeholder="e.g., 4.5 acres"
                value={newFieldData?.size}
                onChange={(e) => setNewFieldData(prev => ({ ...prev, size: e?.target?.value }))}
                required
              />

              <Input
                label="Location/GPS"
                type="text"
                placeholder="GPS coordinates or address"
                value={newFieldData?.location}
                onChange={(e) => setNewFieldData(prev => ({ ...prev, location: e?.target?.value }))}
                required
              />

              <Select
                label="Primary Crop Type"
                options={cropTypeOptions}
                value={newFieldData?.cropType}
                onChange={(value) => setNewFieldData(prev => ({ ...prev, cropType: value }))}
              />

              <Select
                label="Soil Type"
                options={soilTypeOptions}
                value={newFieldData?.soilType}
                onChange={(value) => setNewFieldData(prev => ({ ...prev, soilType: value }))}
              />

              <div className="flex space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  fullWidth
                  onClick={() => setShowAddField(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" fullWidth>
                  Add Field
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Field Map */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="MapPin" size={20} color="var(--color-accent)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Field Location Map</h3>
            <p className="text-sm text-muted-foreground">GPS location of selected field</p>
          </div>
        </div>

        <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
          {selectedFieldData && (
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title={selectedFieldData?.name}
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=28.6139,77.2090&z=14&output=embed`}
              className="rounded-lg"
            />
          )}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Location: {selectedFieldData?.location}
          </div>
          <Button variant="outline" size="sm" iconName="Navigation">
            Get Directions
          </Button>
        </div>
      </div>
      {/* Field Comparison */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
            <Icon name="BarChart3" size={20} color="var(--color-success)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Field Comparison</h3>
            <p className="text-sm text-muted-foreground">Compare soil health across all fields</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-foreground">Field Name</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Size</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">pH Level</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Fertility</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Last Tested</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Status</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {fields?.map((field) => (
                <tr key={field?.id} className="border-b border-border hover:bg-muted/50">
                  <td className="py-3 px-4 font-medium text-foreground">{field?.name}</td>
                  <td className="py-3 px-4 text-muted-foreground">{field?.size}</td>
                  <td className="py-3 px-4 text-foreground">{field?.pH}</td>
                  <td className={`py-3 px-4 font-medium ${getFertilityColor(field?.fertility)}`}>
                    {field?.fertility}
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{field?.lastTested}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(field?.status)}`}>
                      {field?.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <Button variant="ghost" size="sm" iconName="Eye">
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FieldManagement;