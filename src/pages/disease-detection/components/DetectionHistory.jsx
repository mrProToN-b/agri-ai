import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const DetectionHistory = () => {
  const [selectedHistory, setSelectedHistory] = useState(null);

  const historyData = [
    {
      id: 1,
      date: "2025-01-05",
      time: "14:30",
      cropType: "Tomato",
      diseaseName: "Late Blight",
      severity: "High",
      confidence: 92,
      image: "https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg",
      status: "Treated",
      treatments: ["Copper fungicide", "Improved drainage"]
    },
    {
      id: 2,
      date: "2025-01-03",
      time: "10:15",
      cropType: "Wheat",
      diseaseName: "Rust Disease",
      severity: "Medium",
      confidence: 87,
      image: "https://images.pexels.com/photos/2589457/pexels-photo-2589457.jpeg",
      status: "In Progress",
      treatments: ["Fungicide spray", "Field monitoring"]
    },
    {
      id: 3,
      date: "2024-12-28",
      time: "16:45",
      cropType: "Rice",
      diseaseName: "Bacterial Leaf Blight",
      severity: "Low",
      confidence: 78,
      image: "https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg",
      status: "Resolved",
      treatments: ["Copper bactericide", "Water management"]
    },
    {
      id: 4,
      date: "2024-12-25",
      time: "09:20",
      cropType: "Potato",
      diseaseName: "Early Blight",
      severity: "Medium",
      confidence: 85,
      image: "https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg",
      status: "Treated",
      treatments: ["Preventive fungicide", "Crop rotation"]
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'high': return 'bg-error text-error-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'resolved': return 'text-success';
      case 'treated': return 'text-primary';
      case 'in progress': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">Detection History</h3>
        <p className="text-sm text-muted-foreground">
          Previous disease detections and treatment outcomes
        </p>
      </div>
      <div className="space-y-4">
        {historyData?.map((item) => (
          <div
            key={item?.id}
            className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-smooth cursor-pointer"
            onClick={() => setSelectedHistory(selectedHistory === item?.id ? null : item?.id)}
          >
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={item?.image}
                  alt={`${item?.cropType} disease detection`}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-foreground">{item?.diseaseName}</h4>
                    <p className="text-sm text-muted-foreground">{item?.cropType}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-foreground">{formatDate(item?.date)}</p>
                    <p className="text-xs text-muted-foreground">{item?.time}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(item?.severity)}`}>
                      {item?.severity}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {item?.confidence}% confidence
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-medium ${getStatusColor(item?.status)}`}>
                      {item?.status}
                    </span>
                    <Icon
                      name={selectedHistory === item?.id ? "ChevronUp" : "ChevronDown"}
                      size={16}
                      className="text-muted-foreground"
                    />
                  </div>
                </div>
              </div>
            </div>

            {selectedHistory === item?.id && (
              <div className="mt-4 pt-4 border-t border-border">
                <div className="space-y-3">
                  <div>
                    <h5 className="text-sm font-medium text-foreground mb-2">Applied Treatments:</h5>
                    <ul className="space-y-1">
                      {item?.treatments?.map((treatment, index) => (
                        <li key={index} className="flex items-center space-x-2 text-sm">
                          <Icon name="Check" size={14} className="text-success" />
                          <span className="text-muted-foreground">{treatment}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex space-x-3">
                    <Button variant="outline" size="sm" iconName="Eye">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm" iconName="Download">
                      Export Report
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 text-center">
        <Button variant="outline" iconName="MoreHorizontal">
          Load More History
        </Button>
      </div>
    </div>
  );
};

export default DetectionHistory;