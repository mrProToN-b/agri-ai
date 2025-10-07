import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const DashboardSidebar = ({ isCollapsed = false, onToggleCollapse }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/farmer-dashboard',
      icon: 'LayoutDashboard',
      tooltip: 'Farming metrics and overview'
    },
    {
      label: 'Disease Detection',
      path: '/disease-detection',
      icon: 'Bug',
      tooltip: 'AI-powered crop disease identification'
    },
    {
      label: 'Soil Analysis',
      path: '/soil-test-analysis',
      icon: 'Layers',
      tooltip: 'Soil test interpretation and recommendations'
    },
    {
      label: 'AI Assistant',
      path: '/ai-chatbot',
      icon: 'MessageCircle',
      tooltip: 'Chat with agricultural AI assistant'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 left-4 z-300 p-2 bg-card rounded-lg shadow-minimal"
        aria-label="Toggle navigation menu"
      >
        <Icon name="Menu" size={24} />
      </button>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-200"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-card border-r border-border z-200
          transition-smooth
          ${isCollapsed ? 'w-16' : 'w-60'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="flex items-center p-6 border-b border-border">
            {!isCollapsed ? (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Sprout" size={20} color="white" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-foreground">Krishi-Sakhi</h1>
                  <p className="text-xs text-muted-foreground">Smart Farming</p>
                </div>
              </div>
            ) : (
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mx-auto">
                <Icon name="Sprout" size={20} color="white" />
              </div>
            )}
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {navigationItems?.map((item) => (
                <li key={item?.path}>
                  <button
                    onClick={() => handleNavigation(item?.path)}
                    className={`
                      w-full flex items-center p-3 rounded-lg transition-smooth
                      ${isActivePath(item?.path)
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-muted'
                      }
                      ${isCollapsed ? 'justify-center' : 'justify-start space-x-3'}
                    `}
                    title={isCollapsed ? item?.tooltip : ''}
                    aria-label={item?.label}
                  >
                    <Icon
                      name={item?.icon}
                      size={20}
                      color={isActivePath(item?.path) ? 'white' : 'currentColor'}
                    />
                    {!isCollapsed && (
                      <span className="font-medium">{item?.label}</span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Collapse Toggle (Desktop Only) */}
          <div className="hidden lg:block p-4 border-t border-border">
            <button
              onClick={onToggleCollapse}
              className="w-full flex items-center justify-center p-3 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-smooth"
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <Icon
                name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'}
                size={20}
              />
            </button>
          </div>

          {/* User Profile Section */}
          <div className="p-4 border-t border-border">
            <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">Farmer Profile</p>
                  <p className="text-xs text-muted-foreground truncate">View Settings</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;