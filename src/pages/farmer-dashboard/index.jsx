import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardSidebar from '../../components/ui/DashboardSidebar';
import FloatingChatButton from '../../components/ui/FloatingChatButton';
import NavigationBreadcrumb from '../../components/ui/NavigationBreadcrumb';
import WeatherWidget from './components/WeatherWidget';
import MetricsCard from './components/MetricsCard';
import QuickActionCard from './components/QuickActionCard';
import RecentActivityList from './components/RecentActivityList';
import TaskReminder from './components/TaskReminder';
import CropHealthOverview from './components/CropHealthOverview';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const FarmerDashboard = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userData, setUserData] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    // Check authentication
    const user = localStorage.getItem('krishiSakhiUser');
    if (!user) {
      navigate('/authentication');
      return;
    }
    setUserData(JSON.parse(user));

    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleLogout = () => {
    localStorage.removeItem('krishiSakhiUser');
    navigate('/authentication');
  };

  const handleChatToggle = () => {
    setChatOpen(!chatOpen);
  };

  const quickActions = [
    {
      title: "Disease Detection",
      description: "AI-powered crop disease identification using image analysis",
      icon: "Bug",
      route: "/disease-detection",
      color: "error",
      badge: "AI",
      isNew: true
    },
    {
      title: "Soil Analysis",
      description: "Comprehensive soil test interpretation and recommendations",
      icon: "Layers",
      route: "/soil-test-analysis",
      color: "accent",
      badge: "Lab"
    },
    {
      title: "AI Assistant",
      description: "Chat with multilingual agricultural AI for instant guidance",
      icon: "MessageCircle",
      route: "/ai-chatbot",
      color: "primary",
      badge: "24/7"
    },
    {
      title: "Weather Forecast",
      description: "7-day weather predictions and agricultural alerts",
      icon: "Cloud",
      route: "/weather-forecast",
      color: "primary"
    },
    {
      title: "Market Prices",
      description: "Real-time crop prices and market trend analysis",
      icon: "TrendingUp",
      route: "/market-prices",
      color: "success"
    },
    {
      title: "Yield Prediction",
      description: "AI-based crop yield forecasting and optimization tips",
      icon: "BarChart3",
      route: "/yield-prediction",
      color: "warning",
      isNew: true
    }
  ];

  const metricsData = [
    {
      title: "Total Farm Area",
      value: "45",
      unit: "acres",
      change: "+2.5%",
      changeType: "positive",
      icon: "MapPin",
      color: "primary"
    },
    {
      title: "Active Crops",
      value: "4",
      unit: "types",
      change: "+1",
      changeType: "positive",
      icon: "Sprout",
      color: "success"
    },
    {
      title: "Health Score",
      value: "87",
      unit: "%",
      change: "+5%",
      changeType: "positive",
      icon: "Heart",
      color: "success"
    },
    {
      title: "Pending Tasks",
      value: "3",
      unit: "items",
      change: "-2",
      changeType: "positive",
      icon: "CheckCircle",
      color: "warning"
    }
  ];

  if (!userData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader2" size={32} className="animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <DashboardSidebar 
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={handleSidebarToggle}
      />
      {/* Main Content */}
      <main className={`transition-smooth ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'}`}>
        <div className="p-6 lg:p-8">
          {/* Header Section */}
          <div className="mb-8">
            <NavigationBreadcrumb />
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                  Welcome back, {userData?.fullName || 'Farmer'}! 👋
                </h1>
                <p className="text-muted-foreground">
                  {currentTime?.toLocaleDateString('en-IN', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })} • {currentTime?.toLocaleTimeString('en-IN', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm" iconName="Download">
                  Export Report
                </Button>
                <Button variant="outline" size="sm" iconName="Settings">
                  Settings
                </Button>
                <Button variant="destructive" size="sm" iconName="LogOut" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </div>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metricsData?.map((metric, index) => (
              <MetricsCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                unit={metric?.unit}
                change={metric?.change}
                changeType={metric?.changeType}
                icon={metric?.icon}
                color={metric?.color}
              />
            ))}
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Left Column - Weather & Tasks */}
            <div className="space-y-6">
              <WeatherWidget />
              <TaskReminder />
            </div>

            {/* Middle Column - Quick Actions */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-6">Quick Actions</h2>
                <div className="grid grid-cols-1 gap-4">
                  {quickActions?.map((action, index) => (
                    <QuickActionCard
                      key={index}
                      title={action?.title}
                      description={action?.description}
                      icon={action?.icon}
                      route={action?.route}
                      color={action?.color}
                      badge={action?.badge}
                      isNew={action?.isNew}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Activity & Crop Health */}
            <div className="space-y-6">
              <RecentActivityList />
              <CropHealthOverview />
            </div>
          </div>

          {/* Additional Dashboard Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Farm Statistics */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Farm Statistics</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Yield This Season</span>
                  <span className="text-sm font-medium text-foreground">142.5 tons</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Revenue Generated</span>
                  <span className="text-sm font-medium text-success">₹8,45,000</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Cost Savings</span>
                  <span className="text-sm font-medium text-success">₹1,25,000</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Water Usage Efficiency</span>
                  <span className="text-sm font-medium text-primary">+15%</span>
                </div>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Upcoming Events</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                  <Icon name="Calendar" size={16} className="text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Harvest Season Planning</p>
                    <p className="text-xs text-muted-foreground">Oct 15, 2024 • 10:00 AM</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                  <Icon name="Users" size={16} className="text-success" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Agricultural Workshop</p>
                    <p className="text-xs text-muted-foreground">Oct 20, 2024 • 2:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                  <Icon name="Truck" size={16} className="text-warning" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Equipment Maintenance</p>
                    <p className="text-xs text-muted-foreground">Oct 25, 2024 • 9:00 AM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Floating Chat Button */}
      <FloatingChatButton onToggle={handleChatToggle} />
    </div>
  );
};

export default FarmerDashboard;