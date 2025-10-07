import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const RecommendationsPanel = ({ soilData, recommendations }) => {
  const fertilizerRecommendations = [
    {
      id: 1,
      name: "Urea (46-0-0)",
      quantity: "50 kg/acre",
      timing: "Pre-planting",
      cost: "₹1,200",
      purpose: "Nitrogen deficiency correction",
      priority: "high"
    },
    {
      id: 2,
      name: "DAP (18-46-0)",
      quantity: "25 kg/acre",
      timing: "At sowing",
      cost: "₹800",
      purpose: "Phosphorus boost",
      priority: "medium"
    },
    {
      id: 3,
      name: "MOP (0-0-60)",
      quantity: "20 kg/acre",
      timing: "Split application",
      cost: "₹600",
      purpose: "Potassium maintenance",
      priority: "low"
    }
  ];

  const soilAmendments = [
    {
      id: 1,
      amendment: "Lime Application",
      quantity: "500 kg/acre",
      reason: "pH correction (current: 5.2, target: 6.5)",
      expectedResult: "Improved nutrient availability",
      cost: "₹2,000"
    },
    {
      id: 2,
      amendment: "Organic Compost",
      quantity: "2 tons/acre",
      reason: "Low organic matter (1.8%)",
      expectedResult: "Enhanced soil structure and fertility",
      cost: "₹4,500"
    }
  ];

  const cropSuitability = [
    { crop: "Rice", suitability: "Excellent", yield: "4.5-5.0 tons/acre", color: "text-success" },
    { crop: "Wheat", suitability: "Good", yield: "3.0-3.5 tons/acre", color: "text-warning" },
    { crop: "Maize", suitability: "Fair", yield: "2.5-3.0 tons/acre", color: "text-error" },
    { crop: "Sugarcane", suitability: "Poor", yield: "Not recommended", color: "text-muted-foreground" }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-error/10 text-error border-error/20';
      case 'medium': return 'bg-warning/10 text-warning border-warning/20';
      case 'low': return 'bg-success/10 text-success border-success/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const totalCost = fertilizerRecommendations?.reduce((sum, item) => 
    sum + parseInt(item?.cost?.replace('₹', '')?.replace(',', '')), 0
  ) + soilAmendments?.reduce((sum, item) => 
    sum + parseInt(item?.cost?.replace('₹', '')?.replace(',', '')), 0
  );

  return (
    <div className="space-y-6">
      {/* Fertilizer Recommendations */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
            <Icon name="Zap" size={20} color="var(--color-success)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Fertilizer Recommendations</h3>
            <p className="text-sm text-muted-foreground">Based on current soil nutrient levels</p>
          </div>
        </div>

        <div className="space-y-4">
          {fertilizerRecommendations?.map((fertilizer) => (
            <div key={fertilizer?.id} className="border border-border rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-medium text-foreground">{fertilizer?.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(fertilizer?.priority)}`}>
                      {fertilizer?.priority?.charAt(0)?.toUpperCase() + fertilizer?.priority?.slice(1)} Priority
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{fertilizer?.purpose}</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Quantity:</span>
                      <span className="ml-2 font-medium text-foreground">{fertilizer?.quantity}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Timing:</span>
                      <span className="ml-2 font-medium text-foreground">{fertilizer?.timing}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Cost:</span>
                      <span className="ml-2 font-medium text-foreground">{fertilizer?.cost}</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" iconName="ShoppingCart">
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-muted rounded-lg">
          <div className="flex items-center justify-between">
            <span className="font-medium text-foreground">Total Fertilizer Cost:</span>
            <span className="text-lg font-semibold text-foreground">
              ₹{fertilizerRecommendations?.reduce((sum, item) => 
                sum + parseInt(item?.cost?.replace('₹', '')?.replace(',', '')), 0
              )?.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>
      {/* Soil Amendments */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Wrench" size={20} color="var(--color-accent)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Soil Amendments</h3>
            <p className="text-sm text-muted-foreground">Long-term soil health improvements</p>
          </div>
        </div>

        <div className="space-y-4">
          {soilAmendments?.map((amendment) => (
            <div key={amendment?.id} className="border border-border rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-foreground mb-2">{amendment?.amendment}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{amendment?.reason}</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Quantity:</span>
                      <span className="ml-2 font-medium text-foreground">{amendment?.quantity}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Expected Result:</span>
                      <span className="ml-2 font-medium text-foreground">{amendment?.expectedResult}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Cost:</span>
                      <span className="ml-2 font-medium text-foreground">{amendment?.cost}</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" iconName="Plus">
                  Add to Plan
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Crop Suitability */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Sprout" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Crop Suitability Analysis</h3>
            <p className="text-sm text-muted-foreground">Recommended crops for current soil conditions</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cropSuitability?.map((crop, index) => (
            <div key={index} className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-foreground">{crop?.crop}</h4>
                <span className={`font-medium ${crop?.color}`}>{crop?.suitability}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Expected Yield: {crop?.yield}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button variant="default" fullWidth iconName="Download" iconPosition="left">
          Download Report
        </Button>
        <Button variant="outline" fullWidth iconName="Share" iconPosition="left">
          Share Analysis
        </Button>
        <Button variant="outline" fullWidth iconName="Calendar" iconPosition="left">
          Schedule Follow-up
        </Button>
      </div>
      {/* Cost Summary */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Total Investment Required</h3>
          <span className="text-2xl font-bold text-primary">₹{totalCost?.toLocaleString('en-IN')}</span>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          This investment will improve your soil health and potentially increase crop yield by 15-25%
        </p>
        <Button variant="default" iconName="Calculator" iconPosition="left">
          Calculate ROI
        </Button>
      </div>
    </div>
  );
};

export default RecommendationsPanel;