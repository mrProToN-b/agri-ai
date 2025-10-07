import React, { useState, useEffect } from 'react';
import DashboardSidebar from '../../components/ui/DashboardSidebar';
import FloatingChatButton from '../../components/ui/FloatingChatButton';
import NavigationBreadcrumb from '../../components/ui/NavigationBreadcrumb';
import Icon from '../../components/AppIcon';
import ImageUploadArea from './components/ImageUploadArea';
import AnalysisPanel from './components/AnalysisPanel';
import DetectionHistory from './components/DetectionHistory';
import EducationalContent from './components/EducationalContent';

const DiseaseDetection = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [activeView, setActiveView] = useState('detection');

  const handleImageUpload = (file, imagePreview) => {
    setIsAnalyzing(true);
    setAnalysisResult(null);

    // Simulate AI analysis with mock data
    setTimeout(() => {
      const mockResult = {
        diseaseName: "Late Blight",
        scientificName: "Phytophthora infestans",
        cropType: "Tomato",
        confidence: 92,
        severity: "High",
        symptoms: [
          "Dark brown to black lesions on leaves",
          "White fuzzy growth on leaf undersides",
          "Rapid spreading of affected areas",
          "Stem and fruit rot in advanced stages"
        ],
        treatments: [
          {
            type: "Copper Fungicide",
            priority: "Immediate",
            description: "Apply copper-based fungicide to affected areas and surrounding plants",
            dosage: "2-3 ml per liter",
            frequency: "Every 7-10 days"
          },
          {
            type: "Cultural Control",
            priority: "Ongoing",
            description: "Improve air circulation and reduce humidity around plants",
            dosage: "N/A",
            frequency: "Continuous"
          },
          {
            type: "Preventive Spray",
            priority: "Weekly",
            description: "Apply preventive fungicide to healthy plants",
            dosage: "1-2 ml per liter",
            frequency: "Weekly"
          }
        ],
        preventionTips: [
          "Ensure proper spacing between plants for air circulation",
          "Avoid overhead watering, use drip irrigation instead",
          "Remove and destroy infected plant debris",
          "Apply mulch to prevent soil splash onto leaves",
          "Monitor weather conditions and apply preventive treatments before rain"
        ]
      };

      setAnalysisResult(mockResult);
      setIsAnalyzing(false);
    }, 3000);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const viewOptions = [
    { id: 'detection', label: 'Disease Detection', icon: 'Microscope' },
    { id: 'history', label: 'Detection History', icon: 'History' },
    { id: 'education', label: 'Learn & Prevent', icon: 'BookOpen' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar 
        isCollapsed={sidebarCollapsed} 
        onToggleCollapse={toggleSidebar}
      />
      <main className={`transition-smooth ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'}`}>
        <div className="p-4 lg:p-6">
          {/* Header Section */}
          <div className="mb-6">
            <NavigationBreadcrumb />
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                  Disease Detection
                </h1>
                <p className="text-muted-foreground">
                  AI-powered crop disease identification and treatment recommendations
                </p>
              </div>

              <div className="flex items-center space-x-2 bg-muted rounded-lg p-1">
                {viewOptions?.map((option) => (
                  <button
                    key={option?.id}
                    onClick={() => setActiveView(option?.id)}
                    className={`
                      flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth
                      ${activeView === option?.id
                        ? 'bg-card text-foreground shadow-minimal'
                        : 'text-muted-foreground hover:text-foreground'
                      }
                    `}
                  >
                    <Icon name={option?.icon} size={16} />
                    <span className="hidden sm:inline">{option?.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            {activeView === 'detection' && (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Upload Section */}
                <div className="space-y-6">
                  <ImageUploadArea 
                    onImageUpload={handleImageUpload}
                    isAnalyzing={isAnalyzing}
                  />
                  
                  {/* Quick Tips */}
                  <div className="bg-card rounded-lg border border-border p-4">
                    <h3 className="font-medium text-foreground mb-3 flex items-center">
                      <Icon name="Lightbulb" size={16} className="mr-2 text-warning" />
                      Photography Tips
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start space-x-2">
                        <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                        <span>Take photos in good natural light</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                        <span>Focus on affected areas clearly</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                        <span>Include both diseased and healthy parts</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                        <span>Avoid blurry or dark images</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Analysis Section */}
                <div>
                  <AnalysisPanel 
                    analysisResult={analysisResult}
                    isAnalyzing={isAnalyzing}
                  />
                </div>
              </div>
            )}

            {activeView === 'history' && (
              <div className="max-w-4xl">
                <DetectionHistory />
              </div>
            )}

            {activeView === 'education' && (
              <div className="max-w-4xl">
                <EducationalContent />
              </div>
            )}
          </div>

          {/* Stats Cards */}
          {activeView === 'detection' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="bg-card rounded-lg border border-border p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Microscope" size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">247</p>
                    <p className="text-sm text-muted-foreground">Total Detections</p>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-lg border border-border p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                    <Icon name="TrendingUp" size={20} className="text-success" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">94%</p>
                    <p className="text-sm text-muted-foreground">Accuracy Rate</p>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-lg border border-border p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                    <Icon name="Clock" size={20} className="text-warning" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">2.3s</p>
                    <p className="text-sm text-muted-foreground">Avg Analysis Time</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <FloatingChatButton onToggle={() => {}} />
    </div>
  );
};

export default DiseaseDetection;