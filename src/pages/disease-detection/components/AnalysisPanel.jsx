import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AnalysisPanel = ({ analysisResult, isAnalyzing }) => {
  if (isAnalyzing) {
    return (
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-center space-x-3 py-8">
          <div className="animate-spin">
            <Icon name="Loader2" size={24} className="text-primary" />
          </div>
          <div>
            <p className="text-foreground font-medium">Analyzing Image...</p>
            <p className="text-sm text-muted-foreground">AI is processing your crop image</p>
          </div>
        </div>
      </div>
    );
  }

  if (!analysisResult) {
    return (
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Microscope" size={32} className="text-muted-foreground" />
          </div>
          <p className="text-foreground font-medium mb-2">Ready for Analysis</p>
          <p className="text-sm text-muted-foreground">
            Upload an image to get AI-powered disease detection results
          </p>
        </div>
      </div>
    );
  }

  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return 'text-success';
    if (confidence >= 60) return 'text-warning';
    return 'text-error';
  };

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'high': return 'bg-error text-error-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">Analysis Results</h3>
        <p className="text-sm text-muted-foreground">
          AI-powered disease detection and treatment recommendations
        </p>
      </div>
      {/* Disease Identification */}
      <div className="space-y-6">
        <div className="border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-foreground">Disease Identified</h4>
            <span className={`text-sm font-medium ${getConfidenceColor(analysisResult?.confidence)}`}>
              {analysisResult?.confidence}% confidence
            </span>
          </div>
          
          <div className="space-y-2">
            <p className="text-lg font-semibold text-foreground">{analysisResult?.diseaseName}</p>
            <p className="text-sm text-muted-foreground">{analysisResult?.scientificName}</p>
            
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(analysisResult?.severity)}`}>
                {analysisResult?.severity} Severity
              </span>
              <span className="text-xs text-muted-foreground">
                Crop: {analysisResult?.cropType}
              </span>
            </div>
          </div>
        </div>

        {/* Symptoms */}
        <div className="border border-border rounded-lg p-4">
          <h4 className="font-medium text-foreground mb-3 flex items-center">
            <Icon name="Eye" size={16} className="mr-2" />
            Identified Symptoms
          </h4>
          <ul className="space-y-2">
            {analysisResult?.symptoms?.map((symptom, index) => (
              <li key={index} className="flex items-start space-x-2 text-sm">
                <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{symptom}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Treatment Recommendations */}
        <div className="border border-border rounded-lg p-4">
          <h4 className="font-medium text-foreground mb-3 flex items-center">
            <Icon name="Stethoscope" size={16} className="mr-2" />
            Treatment Recommendations
          </h4>
          <div className="space-y-3">
            {analysisResult?.treatments?.map((treatment, index) => (
              <div key={index} className="bg-muted rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-foreground">{treatment?.type}</span>
                  <span className="text-xs text-muted-foreground">{treatment?.priority}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{treatment?.description}</p>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <span>Dosage: {treatment?.dosage}</span>
                  <span>Frequency: {treatment?.frequency}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prevention Tips */}
        <div className="border border-border rounded-lg p-4">
          <h4 className="font-medium text-foreground mb-3 flex items-center">
            <Icon name="Shield" size={16} className="mr-2" />
            Prevention Tips
          </h4>
          <ul className="space-y-2">
            {analysisResult?.preventionTips?.map((tip, index) => (
              <li key={index} className="flex items-start space-x-2 text-sm">
                <Icon name="Lightbulb" size={14} className="text-warning mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
          <Button variant="default" iconName="Save" iconPosition="left">
            Save Results
          </Button>
          <Button variant="outline" iconName="Share" iconPosition="left">
            Share with Expert
          </Button>
          <Button variant="outline" iconName="Calendar" iconPosition="left">
            Add to Calendar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnalysisPanel;