import React from 'react';
import Icon from '../../../components/AppIcon';

const WeatherWidget = () => {
  const weatherData = {
    location: "Pune, Maharashtra",
    temperature: 28,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 12,
    uvIndex: 6,
    forecast: [
      { day: "Today", high: 32, low: 24, condition: "Sunny", icon: "Sun" },
      { day: "Tomorrow", high: 30, low: 22, condition: "Cloudy", icon: "Cloud" },
      { day: "Wed", high: 29, low: 21, condition: "Rain", icon: "CloudRain" },
      { day: "Thu", high: 31, low: 23, condition: "Sunny", icon: "Sun" }
    ]
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Weather Forecast</h3>
        <Icon name="MapPin" size={16} className="text-muted-foreground" />
      </div>
      {/* Current Weather */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-sm text-muted-foreground">{weatherData?.location}</p>
            <p className="text-3xl font-bold text-foreground">{weatherData?.temperature}°C</p>
            <p className="text-sm text-muted-foreground">{weatherData?.condition}</p>
          </div>
          <div className="text-primary">
            <Icon name="Sun" size={48} />
          </div>
        </div>

        {/* Weather Details */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center">
            <Icon name="Droplets" size={16} className="text-blue-500 mx-auto mb-1" />
            <p className="text-xs text-muted-foreground">Humidity</p>
            <p className="text-sm font-medium text-foreground">{weatherData?.humidity}%</p>
          </div>
          <div className="text-center">
            <Icon name="Wind" size={16} className="text-gray-500 mx-auto mb-1" />
            <p className="text-xs text-muted-foreground">Wind</p>
            <p className="text-sm font-medium text-foreground">{weatherData?.windSpeed} km/h</p>
          </div>
          <div className="text-center">
            <Icon name="Eye" size={16} className="text-orange-500 mx-auto mb-1" />
            <p className="text-xs text-muted-foreground">UV Index</p>
            <p className="text-sm font-medium text-foreground">{weatherData?.uvIndex}</p>
          </div>
        </div>
      </div>
      {/* 4-Day Forecast */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-foreground">4-Day Forecast</h4>
        <div className="space-y-2">
          {weatherData?.forecast?.map((day, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <Icon name={day?.icon} size={20} className="text-primary" />
                <span className="text-sm font-medium text-foreground">{day?.day}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-foreground">{day?.high}°</span>
                <span className="text-sm text-muted-foreground">{day?.low}°</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;