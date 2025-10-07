import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const FeaturesGrid = () => {
  const navigate = useNavigate();

  const features = [
    {
      id: 1,
      title: "Disease Detection",
      description: "AI-powered crop disease identification using image analysis for early detection and treatment recommendations",
      icon: "Bug",
      color: "bg-red-50 text-red-600",
      hoverColor: "hover:bg-red-100",
      route: "/disease-detection",
      stats: "95% Accuracy"
    },
    {
      id: 2,
      title: "Price Prediction",
      description: "Market price forecasting for crops based on historical data, demand patterns, and seasonal trends",
      icon: "TrendingUp",
      color: "bg-green-50 text-green-600",
      hoverColor: "hover:bg-green-100",
      route: "/farmer-dashboard",
      stats: "Real-time Updates"
    },
    {
      id: 3,
      title: "Activity Tracking",
      description: "Monitor and schedule farming activities with calendar integration and automated reminders",
      icon: "Calendar",
      color: "bg-blue-50 text-blue-600",
      hoverColor: "hover:bg-blue-100",
      route: "/farmer-dashboard",
      stats: "Smart Scheduling"
    },
    {
      id: 4,
      title: "Soil Analysis",
      description: "Comprehensive soil test interpretation with personalized fertilizer and nutrient recommendations",
      icon: "Layers",
      color: "bg-amber-50 text-amber-600",
      hoverColor: "hover:bg-amber-100",
      route: "/soil-test-analysis",
      stats: "Lab-grade Results"
    },
    {
      id: 5,
      title: "Crop Recommendation",
      description: "Intelligent crop selection based on soil conditions, climate data, and market demand analysis",
      icon: "Sprout",
      color: "bg-emerald-50 text-emerald-600",
      hoverColor: "hover:bg-emerald-100",
      route: "/farmer-dashboard",
      stats: "Climate Optimized"
    },
    {
      id: 6,
      title: "Yield Prediction",
      description: "Forecast crop yields using machine learning models trained on weather, soil, and historical data",
      icon: "BarChart3",
      color: "bg-purple-50 text-purple-600",
      hoverColor: "hover:bg-purple-100",
      route: "/farmer-dashboard",
      stats: "Predictive Analytics"
    },
    {
      id: 7,
      title: "AI Chatbot",
      description: "24/7 multilingual agricultural assistant with voice support for instant farming guidance and solutions",
      icon: "MessageCircle",
      color: "bg-indigo-50 text-indigo-600",
      hoverColor: "hover:bg-indigo-100",
      route: "/ai-chatbot",
      stats: "Voice Enabled"
    },
    {
      id: 8,
      title: "Weather Forecast",
      description: "Hyperlocal weather predictions with agricultural insights for optimal farming decision making",
      icon: "Cloud",
      color: "bg-cyan-50 text-cyan-600",
      hoverColor: "hover:bg-cyan-100",
      route: "/farmer-dashboard",
      stats: "7-day Forecast"
    }
  ];

  const handleFeatureClick = (route) => {
    navigate(route);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="features" className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-6">
            <Icon name="Zap" size={16} className="mr-2 text-primary" />
            <span className="text-sm font-medium text-primary">Smart Features</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Comprehensive Agricultural Solutions
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Empower your farming with AI-driven tools designed to optimize every aspect of agricultural production
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {features?.map((feature) => (
            <motion.div
              key={feature?.id}
              variants={itemVariants}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
              className={`
                bg-card rounded-xl p-6 shadow-minimal border border-border cursor-pointer
                transition-smooth ${feature?.hoverColor}
                hover:shadow-modal hover:border-primary/20
              `}
              onClick={() => handleFeatureClick(feature?.route)}
            >
              <div className={`w-12 h-12 rounded-lg ${feature?.color} flex items-center justify-center mb-4`}>
                <Icon name={feature?.icon} size={24} />
              </div>
              
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-foreground">
                  {feature?.title}
                </h3>
                <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                  {feature?.stats}
                </span>
              </div>
              
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {feature?.description}
              </p>
              
              <div className="flex items-center text-primary text-sm font-medium">
                <span>Learn more</span>
                <Icon name="ArrowRight" size={16} className="ml-2" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ready to Transform Your Farming?
            </h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of farmers who have increased their productivity with our AI-powered platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/authentication')}
                className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-smooth"
              >
                <Icon name="Rocket" size={20} className="mr-2" />
                Start Free Trial
              </button>
              <button
                onClick={() => navigate('/farmer-dashboard')}
                className="inline-flex items-center px-8 py-4 border border-border text-foreground rounded-lg font-medium hover:bg-muted transition-smooth"
              >
                <Icon name="Eye" size={20} className="mr-2" />
                View Demo
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesGrid;