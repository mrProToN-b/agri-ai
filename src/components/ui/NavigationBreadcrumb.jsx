import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const NavigationBreadcrumb = ({ customItems = null }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const routeMap = {
    '/farmer-dashboard': { label: 'Dashboard', icon: 'LayoutDashboard' },
    '/ai-chatbot': { label: 'AI Assistant', icon: 'MessageCircle' },
    '/disease-detection': { label: 'Disease Detection', icon: 'Bug' },
    '/soil-test-analysis': { label: 'Soil Analysis', icon: 'Layers' },
    '/home-landing': { label: 'Home', icon: 'Home' },
    '/authentication': { label: 'Authentication', icon: 'LogIn' }
  };

  const generateBreadcrumbs = () => {
    if (customItems) {
      return customItems;
    }

    const pathSegments = location?.pathname?.split('/')?.filter(Boolean);
    const breadcrumbs = [
      { label: 'Dashboard', path: '/farmer-dashboard', icon: 'Home' }
    ];

    if (location?.pathname !== '/farmer-dashboard') {
      const currentRoute = routeMap?.[location?.pathname];
      if (currentRoute) {
        breadcrumbs?.push({
          label: currentRoute?.label,
          path: location?.pathname,
          icon: currentRoute?.icon,
          isActive: true
        });
      }
    } else {
      breadcrumbs[0].isActive = true;
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  const handleNavigation = (path) => {
    if (path && path !== location?.pathname) {
      navigate(path);
    }
  };

  if (breadcrumbs?.length <= 1 && breadcrumbs?.[0]?.isActive) {
    return null; // Don't show breadcrumb on dashboard home
  }

  return (
    <nav className="flex items-center space-x-2 text-sm mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs?.map((item, index) => (
          <li key={item?.path || index} className="flex items-center">
            {index > 0 && (
              <Icon
                name="ChevronRight"
                size={16}
                className="text-muted-foreground mx-2"
              />
            )}
            
            {item?.isActive ? (
              <span className="flex items-center space-x-2 text-foreground font-medium">
                <Icon name={item?.icon} size={16} />
                <span>{item?.label}</span>
              </span>
            ) : (
              <button
                onClick={() => handleNavigation(item?.path)}
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-smooth"
                aria-label={`Navigate to ${item?.label}`}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.label}</span>
              </button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default NavigationBreadcrumb;