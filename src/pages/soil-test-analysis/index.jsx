import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardSidebar from '../../components/ui/DashboardSidebar';
import NavigationBreadcrumb from '../../components/ui/NavigationBreadcrumb';
import FloatingChatButton from '../../components/ui/FloatingChatButton';
import SoilParameterChart from './components/SoilParameterChart';
import SoilDataInput from './components/SoilDataInput';
import RecommendationsPanel from './components/RecommendationsPanel';
import SoilTrendChart from './components/SoilTrendChart';
import FieldManagement from './components/FieldManagement';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import Icon from '../../components/AppIcon';

const SoilTestAnalysis = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('analysis');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState('english');

  // Mock soil data
  const soilParameters = {
    pH: {
      data: [{ name: 'Current', value: 6.2 }],
      title: 'pH Level',
      unit: '',
      optimalRange: { min: 6.0, max: 7.5 }
    },
    nitrogen: {
      data: [{ name: 'Current', value: 25.5 }],
      title: 'Nitrogen (N)',
      unit: 'mg/kg',
      optimalRange: { min: 20, max: 40 }
    },
    phosphorus: {
      data: [{ name: 'Current', value: 18.3 }],
      title: 'Phosphorus (P)',
      unit: 'mg/kg',
      optimalRange: { min: 15, max: 25 }
    },
    potassium: {
      data: [{ name: 'Current', value: 195.0 }],
      title: 'Potassium (K)',
      unit: 'mg/kg',
      optimalRange: { min: 150, max: 250 }
    },
    organicMatter: {
      data: [{ name: 'Current', value: 2.8 }],
      title: 'Organic Matter',
      unit: '%',
      optimalRange: { min: 2.5, max: 5.0 }
    },
    moisture: {
      data: [{ name: 'Current', value: 22.5 }],
      title: 'Moisture Content',
      unit: '%',
      optimalRange: { min: 20, max: 30 }
    }
  };

  const tabOptions = [
    { value: 'analysis', label: 'Soil Analysis', icon: 'BarChart3' },
    { value: 'input', label: 'Data Input', icon: 'FileText' },
    { value: 'recommendations', label: 'Recommendations', icon: 'Lightbulb' },
    { value: 'trends', label: 'Trends', icon: 'TrendingUp' },
    { value: 'fields', label: 'Field Management', icon: 'Map' }
  ];

  const languageOptions = [
    { value: 'english', label: 'English' },
    { value: 'bengali', label: 'বাংলা' }
  ];

  useEffect(() => {
    // Check authentication
    const user = localStorage.getItem('krishiSakhiUser');
    if (!user) {
      navigate('/authentication');
      return;
    }

    // Load saved language preference
    const savedLanguage = localStorage.getItem('krishiSakhiLanguage') || 'english';
    setCurrentLanguage(savedLanguage);
  }, [navigate]);

  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
    localStorage.setItem('krishiSakhiLanguage', language);
  };

  const handleDataSubmit = (formData) => {
    setIsAnalyzing(true);
    setAnalysisComplete(false);
    
    // Simulate analysis process
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
      setActiveTab('analysis');
    }, 3000);
  };

  const getTabContent = () => {
    switch (activeTab) {
      case 'analysis':
        return (
          <div className="space-y-6">
            {/* Analysis Header */}
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="BarChart3" size={24} color="var(--color-primary)" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-foreground">
                      {currentLanguage === 'bengali' ? 'মাটি পরীক্ষা বিশ্লেষণ' : 'Soil Test Analysis'}
                    </h1>
                    <p className="text-muted-foreground">
                      {currentLanguage === 'bengali' ?'আপনার মাটির স্বাস্থ্য এবং পুষ্টির বিশ্লেষণ' :'Comprehensive soil health and nutrient analysis'
                      }
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <Select
                    options={languageOptions}
                    value={currentLanguage}
                    onChange={handleLanguageChange}
                    className="w-32"
                  />
                  <Button variant="outline" iconName="Download" iconPosition="left">
                    {currentLanguage === 'bengali' ? 'রিপোর্ট ডাউনলোড' : 'Download Report'}
                  </Button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-success/5 border border-success/20 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="CheckCircle" size={16} color="var(--color-success)" />
                    <span className="text-sm font-medium text-success">
                      {currentLanguage === 'bengali' ? 'সুস্থ' : 'Healthy'}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-foreground">4/6</div>
                  <div className="text-xs text-muted-foreground">
                    {currentLanguage === 'bengali' ? 'প্যারামিটার' : 'Parameters'}
                  </div>
                </div>

                <div className="bg-warning/5 border border-warning/20 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="AlertTriangle" size={16} color="var(--color-warning)" />
                    <span className="text-sm font-medium text-warning">
                      {currentLanguage === 'bengali' ? 'মনোযোগ প্রয়োজন' : 'Needs Attention'}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-foreground">2/6</div>
                  <div className="text-xs text-muted-foreground">
                    {currentLanguage === 'bengali' ? 'প্যারামিটার' : 'Parameters'}
                  </div>
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Calendar" size={16} color="var(--color-primary)" />
                    <span className="text-sm font-medium text-primary">
                      {currentLanguage === 'bengali' ? 'সর্বশেষ পরীক্ষা' : 'Last Tested'}
                    </span>
                  </div>
                  <div className="text-lg font-bold text-foreground">Jun 15</div>
                  <div className="text-xs text-muted-foreground">2024</div>
                </div>

                <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="TrendingUp" size={16} color="var(--color-accent)" />
                    <span className="text-sm font-medium text-accent">
                      {currentLanguage === 'bengali' ? 'উন্নতি' : 'Improvement'}
                    </span>
                  </div>
                  <div className="text-lg font-bold text-foreground">+12%</div>
                  <div className="text-xs text-muted-foreground">
                    {currentLanguage === 'bengali' ? '৬ মাসে' : '6 months'}
                  </div>
                </div>
              </div>
            </div>
            {/* Soil Parameter Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {Object.entries(soilParameters)?.map(([key, param]) => (
                <SoilParameterChart
                  key={key}
                  data={param?.data}
                  title={param?.title}
                  unit={param?.unit}
                  optimalRange={param?.optimalRange}
                />
              ))}
            </div>
            {/* Analysis Summary */}
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Icon name="FileText" size={20} color="var(--color-accent)" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {currentLanguage === 'bengali' ? 'বিশ্লেষণ সারাংশ' : 'Analysis Summary'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {currentLanguage === 'bengali' ?'আপনার মাটির বর্তমান অবস্থার সংক্ষিপ্ত বিবরণ' :'Key insights about your soil health'
                    }
                  </p>
                </div>
              </div>

              <div className="prose prose-sm max-w-none text-foreground">
                <p className="mb-4">
                  {currentLanguage === 'bengali' 
                    ? `আপনার মাটির সামগ্রিক স্বাস্থ্য ভাল অবস্থায় রয়েছে। pH মাত্রা (৬.২) প্রায় আদর্শ পরিসরে রয়েছে, যা বেশিরভাগ ফসলের জন্য উপযুক্ত। নাইট্রোজেন এবং ফসফরাসের মাত্রা সন্তোষজনক, তবে জৈব পদার্থের পরিমাণ আরও বৃদ্ধি করা যেতে পারে।`
                    : `Your soil health is in good condition overall. The pH level (6.2) is near optimal range, suitable for most crops. Nitrogen and phosphorus levels are satisfactory, but organic matter content could be improved for better soil structure.`
                  }
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="bg-success/5 border border-success/20 rounded-lg p-4">
                    <h4 className="font-medium text-success mb-2 flex items-center">
                      <Icon name="CheckCircle" size={16} className="mr-2" />
                      {currentLanguage === 'bengali' ? 'শক্তিশালী দিক' : 'Strengths'}
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• {currentLanguage === 'bengali' ? 'আদর্শ pH মাত্রা' : 'Optimal pH level'}</li>
                      <li>• {currentLanguage === 'bengali' ? 'পর্যাপ্ত নাইট্রোজেন' : 'Adequate nitrogen content'}</li>
                      <li>• {currentLanguage === 'bengali' ? 'ভাল পটাসিয়াম মাত্রা' : 'Good potassium levels'}</li>
                      <li>• {currentLanguage === 'bengali' ? 'উপযুক্ত আর্দ্রতা' : 'Proper moisture content'}</li>
                    </ul>
                  </div>

                  <div className="bg-warning/5 border border-warning/20 rounded-lg p-4">
                    <h4 className="font-medium text-warning mb-2 flex items-center">
                      <Icon name="AlertTriangle" size={16} className="mr-2" />
                      {currentLanguage === 'bengali' ? 'উন্নতির ক্ষেত্র' : 'Areas for Improvement'}
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• {currentLanguage === 'bengali' ? 'জৈব পদার্থ বৃদ্ধি করুন' : 'Increase organic matter'}</li>
                      <li>• {currentLanguage === 'bengali' ? 'ফসফরাস সামান্য বৃদ্ধি' : 'Slight phosphorus boost'}</li>
                      <li>• {currentLanguage === 'bengali' ? 'মাইক্রোনিউট্রিয়েন্ট পরীক্ষা' : 'Test micronutrients'}</li>
                      <li>• {currentLanguage === 'bengali' ? 'নিয়মিত পর্যবেক্ষণ' : 'Regular monitoring'}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'input':
        return <SoilDataInput onDataSubmit={handleDataSubmit} isLoading={isAnalyzing} />;

      case 'recommendations':
        return <RecommendationsPanel soilData={soilParameters} recommendations={[]} />;

      case 'trends':
        return <SoilTrendChart />;

      case 'fields':
        return <FieldManagement />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <main className={`transition-smooth ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'}`}>
        <div className="p-6 lg:p-8">
          <NavigationBreadcrumb />

          {/* Tab Navigation */}
          <div className="bg-card rounded-lg border border-border p-2 mb-6">
            <div className="flex flex-wrap gap-2">
              {tabOptions?.map((tab) => (
                <button
                  key={tab?.value}
                  onClick={() => setActiveTab(tab?.value)}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-smooth
                    ${activeTab === tab?.value
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }
                  `}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span className="hidden sm:inline">{tab?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Loading State */}
          {isAnalyzing && (
            <div className="bg-card rounded-lg border border-border p-8 text-center mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="BarChart3" size={32} color="var(--color-primary)" className="animate-pulse" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {currentLanguage === 'bengali' ? 'মাটি বিশ্লেষণ চলছে...' : 'Analyzing Soil Data...'}
              </h3>
              <p className="text-muted-foreground">
                {currentLanguage === 'bengali' ?'আপনার মাটির নমুনা প্রক্রিয়াকরণ এবং সুপারিশ তৈরি করা হচ্ছে' :'Processing your soil sample and generating recommendations'
                }
              </p>
              <div className="mt-4 w-64 mx-auto bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
              </div>
            </div>
          )}

          {/* Tab Content */}
          {getTabContent()}
        </div>
      </main>
      <FloatingChatButton onToggle={() => {}} />
    </div>
  );
};

export default SoilTestAnalysis;