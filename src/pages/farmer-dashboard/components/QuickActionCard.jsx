import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const QuickActionCard = ({ 
  title, 
  description, 
  icon, 
  route, 
  color = "primary",
  badge = null,
  isNew = false 
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (route) {
      navigate(route);
    }
  };

  const getColorClasses = () => {
    const colorMap = {
      primary: 'text-primary border-primary/20 hover:bg-primary/5',
      success: 'text-success border-success/20 hover:bg-success/5',
      warning: 'text-warning border-warning/20 hover:bg-warning/5',
      accent: 'text-accent border-accent/20 hover:bg-accent/5',
      error: 'text-error border-error/20 hover:bg-error/5'
    };
    return colorMap?.[color] || colorMap?.primary;
  };

  return (
    <div 
      onClick={handleClick}
      className={`
        relative bg-card rounded-lg border-2 p-6 cursor-pointer transition-smooth
        hover:shadow-minimal ${getColorClasses()}
      `}
    >
      {/* New Badge */}
      {isNew && (
        <div className="absolute -top-2 -right-2">
          <div className="bg-warning text-warning-foreground text-xs font-medium px-2 py-1 rounded-full">
            New
          </div>
        </div>
      )}

      {/* Icon */}
      <div className="mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-current/10`}>
          <Icon name={icon} size={24} className="text-current" />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          {badge && (
            <span className="text-xs font-medium px-2 py-1 bg-muted text-muted-foreground rounded-full">
              {badge}
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>

      {/* Arrow Icon */}
      <div className="mt-4 flex justify-end">
        <Icon name="ArrowRight" size={20} className="text-muted-foreground" />
      </div>
    </div>
  );
};

export default QuickActionCard;