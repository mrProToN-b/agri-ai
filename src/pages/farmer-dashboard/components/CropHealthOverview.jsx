import React from 'react';
import Icon from '../../../components/AppIcon';

const CropHealthOverview = () => {
  const cropData = [
    {
      id: 1,
      name: "Wheat",
      area: "15 acres",
      health: "Excellent",
      healthScore: 95,
      stage: "Flowering",
      issues: 0,
      lastChecked: "2 hours ago",
      color: "success"
    },
    {
      id: 2,
      name: "Tomatoes",
      area: "8 acres",
      health: "Good",
      healthScore: 82,
      stage: "Fruit Development",
      issues: 1,
      lastChecked: "5 hours ago",
      color: "primary"
    },
    {
      id: 3,
      name: "Corn",
      area: "12 acres",
      health: "Fair",
      healthScore: 68,
      stage: "Vegetative",
      issues: 3,
      lastChecked: "1 day ago",
      color: "warning"
    },
    {
      id: 4,
      name: "Soybeans",
      area: "10 acres",
      health: "Poor",
      healthScore: 45,
      stage: "Seedling",
      issues: 5,
      lastChecked: "3 days ago",
      color: "error"
    }
  ];

  const getHealthColor = (color) => {
    const colorMap = {
      success: 'text-success bg-success/10 border-success/20',
      primary: 'text-primary bg-primary/10 border-primary/20',
      warning: 'text-warning bg-warning/10 border-warning/20',
      error: 'text-error bg-error/10 border-error/20'
    };
    return colorMap?.[color] || colorMap?.primary;
  };

  const getHealthIcon = (color) => {
    const iconMap = {
      success: 'CheckCircle',
      primary: 'AlertCircle',
      warning: 'AlertTriangle',
      error: 'XCircle'
    };
    return iconMap?.[color] || 'AlertCircle';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Crop Health Overview</h3>
        <button className="text-sm text-primary hover:text-accent transition-smooth">
          View Details
        </button>
      </div>
      <div className="space-y-4">
        {cropData?.map((crop) => (
          <div key={crop?.id} className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-smooth">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getHealthColor(crop?.color)}`}>
                  <Icon name={getHealthIcon(crop?.color)} size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">{crop?.name}</h4>
                  <p className="text-xs text-muted-foreground">{crop?.area} • {crop?.stage}</p>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-sm font-medium ${crop?.color === 'success' ? 'text-success' : crop?.color === 'error' ? 'text-error' : crop?.color === 'warning' ? 'text-warning' : 'text-primary'}`}>
                  {crop?.health}
                </div>
                <p className="text-xs text-muted-foreground">{crop?.healthScore}% score</p>
              </div>
            </div>

            {/* Health Progress Bar */}
            <div className="mb-3">
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-smooth ${
                    crop?.color === 'success' ? 'bg-success' :
                    crop?.color === 'error' ? 'bg-error' :
                    crop?.color === 'warning' ? 'bg-warning' : 'bg-primary'
                  }`}
                  style={{ width: `${crop?.healthScore}%` }}
                />
              </div>
            </div>

            {/* Additional Info */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center space-x-4">
                <span className="flex items-center space-x-1">
                  <Icon name="AlertTriangle" size={12} />
                  <span>{crop?.issues} issues</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Icon name="Clock" size={12} />
                  <span>Last checked {crop?.lastChecked}</span>
                </span>
              </div>
              <button className="text-primary hover:text-accent transition-smooth">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Summary Stats */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-lg font-bold text-success">1</div>
            <div className="text-xs text-muted-foreground">Excellent</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-primary">1</div>
            <div className="text-xs text-muted-foreground">Good</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-warning">1</div>
            <div className="text-xs text-muted-foreground">Fair</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-error">1</div>
            <div className="text-xs text-muted-foreground">Poor</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropHealthOverview;