import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const SoilParameterChart = ({ data, title, unit, optimalRange }) => {
  const getBarColor = (value) => {
    if (value < optimalRange?.min) return '#EF4444'; // Red for deficient
    if (value > optimalRange?.max) return '#F59E0B'; // Amber for excessive
    return '#10B981'; // Green for optimal
  };

  const getStatusIcon = (value) => {
    if (value < optimalRange?.min) return 'TrendingDown';
    if (value > optimalRange?.max) return 'TrendingUp';
    return 'CheckCircle';
  };

  const getStatusText = (value) => {
    if (value < optimalRange?.min) return 'Deficient';
    if (value > optimalRange?.max) return 'Excessive';
    return 'Optimal';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <div className="flex items-center space-x-2">
          <Icon 
            name={getStatusIcon(data?.[0]?.value || 0)} 
            size={20} 
            color={getBarColor(data?.[0]?.value || 0)}
          />
          <span className={`text-sm font-medium ${
            data?.[0]?.value < optimalRange?.min ? 'text-error' :
            data?.[0]?.value > optimalRange?.max ? 'text-warning' : 'text-success'
          }`}>
            {getStatusText(data?.[0]?.value || 0)}
          </span>
        </div>
      </div>
      <div className="h-64 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12, fill: '#6B7280' }}
              axisLine={{ stroke: '#E5E7EB' }}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#6B7280' }}
              axisLine={{ stroke: '#E5E7EB' }}
              label={{ value: unit, angle: -90, position: 'insideLeft' }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                fontSize: '12px'
              }}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {data?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry?.value)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Optimal Range: {optimalRange?.min} - {optimalRange?.max} {unit}</span>
        <span>Current: {data?.[0]?.value || 0} {unit}</span>
      </div>
    </div>
  );
};

export default SoilParameterChart;