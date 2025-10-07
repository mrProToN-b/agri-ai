import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const SoilTrendChart = () => {
  const [selectedParameter, setSelectedParameter] = useState('pH');
  const [timeRange, setTimeRange] = useState('6months');

  const parameterOptions = [
    { value: 'pH', label: 'pH Level' },
    { value: 'nitrogen', label: 'Nitrogen (N)' },
    { value: 'phosphorus', label: 'Phosphorus (P)' },
    { value: 'potassium', label: 'Potassium (K)' },
    { value: 'organicMatter', label: 'Organic Matter' }
  ];

  const timeRangeOptions = [
    { value: '3months', label: 'Last 3 Months' },
    { value: '6months', label: 'Last 6 Months' },
    { value: '1year', label: 'Last Year' },
    { value: '2years', label: 'Last 2 Years' }
  ];

  const trendData = [
    {
      month: 'Jan 2024',
      pH: 5.2,
      nitrogen: 18.5,
      phosphorus: 12.3,
      potassium: 165.0,
      organicMatter: 1.8,
      optimal: selectedParameter === 'pH' ? 6.5 : 
               selectedParameter === 'nitrogen' ? 25.0 :
               selectedParameter === 'phosphorus' ? 20.0 :
               selectedParameter === 'potassium' ? 200.0 : 3.0
    },
    {
      month: 'Feb 2024',
      pH: 5.4,
      nitrogen: 20.1,
      phosphorus: 13.8,
      potassium: 172.0,
      organicMatter: 2.0,
      optimal: selectedParameter === 'pH' ? 6.5 : 
               selectedParameter === 'nitrogen' ? 25.0 :
               selectedParameter === 'phosphorus' ? 20.0 :
               selectedParameter === 'potassium' ? 200.0 : 3.0
    },
    {
      month: 'Mar 2024',
      pH: 5.8,
      nitrogen: 22.3,
      phosphorus: 15.2,
      potassium: 180.0,
      organicMatter: 2.2,
      optimal: selectedParameter === 'pH' ? 6.5 : 
               selectedParameter === 'nitrogen' ? 25.0 :
               selectedParameter === 'phosphorus' ? 20.0 :
               selectedParameter === 'potassium' ? 200.0 : 3.0
    },
    {
      month: 'Apr 2024',
      pH: 6.0,
      nitrogen: 24.1,
      phosphorus: 16.8,
      potassium: 185.0,
      organicMatter: 2.4,
      optimal: selectedParameter === 'pH' ? 6.5 : 
               selectedParameter === 'nitrogen' ? 25.0 :
               selectedParameter === 'phosphorus' ? 20.0 :
               selectedParameter === 'potassium' ? 200.0 : 3.0
    },
    {
      month: 'May 2024',
      pH: 6.2,
      nitrogen: 25.5,
      phosphorus: 18.1,
      potassium: 192.0,
      organicMatter: 2.6,
      optimal: selectedParameter === 'pH' ? 6.5 : 
               selectedParameter === 'nitrogen' ? 25.0 :
               selectedParameter === 'phosphorus' ? 20.0 :
               selectedParameter === 'potassium' ? 200.0 : 3.0
    },
    {
      month: 'Jun 2024',
      pH: 6.4,
      nitrogen: 26.8,
      phosphorus: 19.5,
      potassium: 198.0,
      organicMatter: 2.8,
      optimal: selectedParameter === 'pH' ? 6.5 : 
               selectedParameter === 'nitrogen' ? 25.0 :
               selectedParameter === 'phosphorus' ? 20.0 :
               selectedParameter === 'potassium' ? 200.0 : 3.0
    }
  ];

  const getParameterUnit = (param) => {
    switch (param) {
      case 'pH': return '';
      case 'nitrogen': return 'mg/kg';
      case 'phosphorus': return 'mg/kg';
      case 'potassium': return 'mg/kg';
      case 'organicMatter': return '%';
      default: return '';
    }
  };

  const getCurrentValue = () => {
    const latestData = trendData?.[trendData?.length - 1];
    return latestData?.[selectedParameter];
  };

  const getImprovement = () => {
    const firstValue = trendData?.[0]?.[selectedParameter];
    const lastValue = trendData?.[trendData?.length - 1]?.[selectedParameter];
    const improvement = ((lastValue - firstValue) / firstValue * 100)?.toFixed(1);
    return improvement > 0 ? `+${improvement}%` : `${improvement}%`;
  };

  const getImprovementColor = () => {
    const firstValue = trendData?.[0]?.[selectedParameter];
    const lastValue = trendData?.[trendData?.length - 1]?.[selectedParameter];
    return lastValue > firstValue ? 'text-success' : 'text-error';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="TrendingUp" size={20} color="var(--color-accent)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Soil Health Trends</h3>
            <p className="text-sm text-muted-foreground">Track improvements over time</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Select
            options={parameterOptions}
            value={selectedParameter}
            onChange={setSelectedParameter}
            className="w-40"
          />
          <Select
            options={timeRangeOptions}
            value={timeRange}
            onChange={setTimeRange}
            className="w-36"
          />
        </div>
      </div>
      {/* Current Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Current Value</span>
            <Icon name="Activity" size={16} className="text-muted-foreground" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold text-foreground">
              {getCurrentValue()} {getParameterUnit(selectedParameter)}
            </span>
          </div>
        </div>

        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">6-Month Change</span>
            <Icon name="TrendingUp" size={16} className="text-muted-foreground" />
          </div>
          <div className="mt-2">
            <span className={`text-2xl font-bold ${getImprovementColor()}`}>
              {getImprovement()}
            </span>
          </div>
        </div>

        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Target Value</span>
            <Icon name="Target" size={16} className="text-muted-foreground" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold text-primary">
              {trendData?.[0]?.optimal} {getParameterUnit(selectedParameter)}
            </span>
          </div>
        </div>
      </div>
      {/* Trend Chart */}
      <div className="h-80 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 12, fill: '#6B7280' }}
              axisLine={{ stroke: '#E5E7EB' }}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#6B7280' }}
              axisLine={{ stroke: '#E5E7EB' }}
              label={{ 
                value: getParameterUnit(selectedParameter), 
                angle: -90, 
                position: 'insideLeft' 
              }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                fontSize: '12px'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey={selectedParameter} 
              stroke="#4ADE80" 
              strokeWidth={3}
              dot={{ fill: '#4ADE80', strokeWidth: 2, r: 4 }}
              name="Actual Value"
            />
            <Line 
              type="monotone" 
              dataKey="optimal" 
              stroke="#F59E0B" 
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              name="Optimal Range"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {/* Insights */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={20} color="var(--color-primary)" className="mt-0.5" />
          <div>
            <h4 className="font-medium text-foreground mb-2">Trend Analysis</h4>
            <p className="text-sm text-muted-foreground">
              Your {parameterOptions?.find(opt => opt?.value === selectedParameter)?.label?.toLowerCase()} 
              levels have shown {getImprovement()?.startsWith('+') ? 'positive improvement' : 'decline'} 
              over the past 6 months. 
              {getImprovement()?.startsWith('+') 
                ? ' Continue current soil management practices and consider gradual optimization.' :' Consider implementing the recommended soil amendments to improve this parameter.'
              }
            </p>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <Button variant="outline" iconName="Download" iconPosition="left">
          Export Trend Data
        </Button>
        <Button variant="outline" iconName="Bell" iconPosition="left">
          Set Alerts
        </Button>
        <Button variant="outline" iconName="Calendar" iconPosition="left">
          Schedule Next Test
        </Button>
      </div>
    </div>
  );
};

export default SoilTrendChart;