import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivityList = () => {
  const activities = [
    {
      id: 1,
      type: "disease_detection",
      title: "Disease Detection Completed",
      description: "Tomato leaf analysis - No diseases detected",
      timestamp: "2 hours ago",
      icon: "Bug",
      status: "success"
    },
    {
      id: 2,
      type: "soil_analysis",
      title: "Soil Test Results Available",
      description: "pH level: 6.8, Nitrogen: Medium, Phosphorus: High",
      timestamp: "5 hours ago",
      icon: "Layers",
      status: "info"
    },
    {
      id: 3,
      type: "weather_alert",
      title: "Weather Alert",
      description: "Heavy rainfall expected in next 48 hours",
      timestamp: "1 day ago",
      icon: "CloudRain",
      status: "warning"
    },
    {
      id: 4,
      type: "crop_prediction",
      title: "Yield Prediction Updated",
      description: "Expected wheat yield: 4.2 tons/hectare (+8%)",
      timestamp: "2 days ago",
      icon: "TrendingUp",
      status: "success"
    },
    {
      id: 5,
      type: "price_update",
      title: "Market Price Update",
      description: "Wheat: ₹2,150/quintal (+5.2% from last week)",
      timestamp: "3 days ago",
      icon: "IndianRupee",
      status: "info"
    }
  ];

  const getStatusColor = (status) => {
    const statusMap = {
      success: 'text-success bg-success/10',
      warning: 'text-warning bg-warning/10',
      info: 'text-primary bg-primary/10',
      error: 'text-error bg-error/10'
    };
    return statusMap?.[status] || statusMap?.info;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        <button className="text-sm text-primary hover:text-accent transition-smooth">
          View All
        </button>
      </div>
      <div className="space-y-4">
        {activities?.map((activity) => (
          <div key={activity?.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-smooth">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getStatusColor(activity?.status)}`}>
              <Icon name={activity?.icon} size={18} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-medium text-foreground truncate">
                  {activity?.title}
                </h4>
                <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                  {activity?.timestamp}
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {activity?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* View More Button */}
      <div className="mt-6 pt-4 border-t border-border">
        <button className="w-full text-sm text-primary hover:text-accent font-medium py-2 transition-smooth">
          Load More Activities
        </button>
      </div>
    </div>
  );
};

export default RecentActivityList;