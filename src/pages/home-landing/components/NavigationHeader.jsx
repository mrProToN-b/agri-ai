import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const NavigationHeader = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { label: 'Home', href: '#home', section: 'home' },
    { label: 'Features', href: '#features', section: 'features' },
    { label: 'About', href: '#about', section: 'about' },
    { label: 'Contact', href: '#contact', section: 'contact' }
  ];

  const handleNavigation = (section) => {
    setIsMobileMenuOpen(false);
    
    if (section === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(section);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element?.offsetTop - headerHeight;
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
    }
  };

  const handleAuthNavigation = () => {
    navigate('/authentication');
  };

  const handleDashboardNavigation = () => {
    navigate('/farmer-dashboard');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`
          fixed top-0 left-0 right-0 z-300 transition-smooth
          ${isScrolled 
            ? 'bg-card/95 backdrop-blur-md shadow-minimal border-b border-border' 
            : 'bg-transparent'
          }
        `}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => handleNavigation('home')}
            >
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Sprout" size={24} color="white" />
              </div>
              <div>
                <h1 className={`text-xl font-bold transition-smooth ${
                  isScrolled ? 'text-foreground' : 'text-white'
                }`}>
                  Krishi-Sakhi
                </h1>
                <p className={`text-xs transition-smooth ${
                  isScrolled ? 'text-muted-foreground' : 'text-white/80'
                }`}>
                  Smart Farming AI
                </p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigationItems?.map((item) => (
                <button
                  key={item?.section}
                  onClick={() => handleNavigation(item?.section)}
                  className={`
                    font-medium transition-smooth hover:text-primary
                    ${isScrolled ? 'text-foreground' : 'text-white hover:text-primary'}
                  `}
                >
                  {item?.label}
                </button>
              ))}
            </nav>

            {/* Desktop Action Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={handleDashboardNavigation}
                iconName="LayoutDashboard"
                iconPosition="left"
                className={`
                  ${isScrolled 
                    ? 'text-foreground hover:bg-muted' 
                    : 'text-white hover:bg-white/10'
                  }
                `}
              >
                Dashboard
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className={`
                md:hidden p-2 rounded-lg transition-smooth
                ${isScrolled 
                  ? 'text-foreground hover:bg-muted' 
                  : 'text-white hover:bg-white/10'
                }
              `}
              aria-label="Toggle mobile menu"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>
      </motion.header>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-200 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      {/* Mobile Menu */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isMobileMenuOpen ? 0 : '100%' }}
        transition={{ type: 'tween', duration: 0.3 }}
        className="fixed top-0 right-0 h-full w-80 bg-card shadow-modal z-200 md:hidden"
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Sprout" size={20} color="white" />
              </div>
              <div>
                <h2 className="font-bold text-foreground">Krishi-Sakhi</h2>
                <p className="text-xs text-muted-foreground">Smart Farming</p>
              </div>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-smooth"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          {/* Mobile Navigation Items */}
          <nav className="flex-1 p-6">
            <ul className="space-y-4">
              {navigationItems?.map((item) => (
                <li key={item?.section}>
                  <button
                    onClick={() => handleNavigation(item?.section)}
                    className="w-full flex items-center space-x-3 p-3 text-left text-foreground hover:bg-muted rounded-lg transition-smooth"
                  >
                    <Icon 
                      name={
                        item?.section === 'home' ? 'Home' :
                        item?.section === 'features' ? 'Zap' :
                        item?.section === 'about' ? 'Info' : 'Mail'
                      } 
                      size={20} 
                    />
                    <span className="font-medium">{item?.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Action Buttons */}
          <div className="p-6 border-t border-border space-y-3">
            <Button
              variant="outline"
              fullWidth
              onClick={handleDashboardNavigation}
              iconName="LayoutDashboard"
              iconPosition="left"
            >
              View Dashboard
            </Button>
            
            <Button
              variant="default"
              fullWidth
              onClick={handleAuthNavigation}
              iconName="LogIn"
              iconPosition="left"
            >
              Get Started Free
            </Button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default NavigationHeader;