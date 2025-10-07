import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date()?.getFullYear();

  const footerSections = [
    {
      title: "Platform",
      links: [
        { label: "Dashboard", route: "/farmer-dashboard" },
        { label: "Disease Detection", route: "/disease-detection" },
        { label: "Soil Analysis", route: "/soil-test-analysis" },
        { label: "AI Assistant", route: "/ai-chatbot" }
      ]
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", href: "#" },
        { label: "API Reference", href: "#" },
        { label: "Tutorials", href: "#" },
        { label: "Best Practices", href: "#" }
      ]
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", href: "#" },
        { label: "Community Forum", href: "#" },
        { label: "Contact Support", href: "#contact" },
        { label: "System Status", href: "#" }
      ]
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "#about" },
        { label: "Careers", href: "#" },
        { label: "Press Kit", href: "#" },
        { label: "Partners", href: "#" }
      ]
    }
  ];

  const socialLinks = [
    { name: "Facebook", icon: "Facebook", href: "#" },
    { name: "Twitter", icon: "Twitter", href: "#" },
    { name: "Instagram", icon: "Instagram", href: "#" },
    { name: "LinkedIn", icon: "Linkedin", href: "#" },
    { name: "YouTube", icon: "Youtube", href: "#" }
  ];

  const handleLinkClick = (link) => {
    if (link?.route) {
      navigate(link?.route);
    } else if (link?.href && link?.href?.startsWith('#')) {
      const section = link?.href?.substring(1);
      if (section === 'about' || section === 'contact') {
        const element = document.getElementById(section);
        if (element) {
          const headerHeight = 80;
          const elementPosition = element?.offsetTop - headerHeight;
          window.scrollTo({ top: elementPosition, behavior: 'smooth' });
        }
      }
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <Icon name="Sprout" size={24} color="white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Krishi-Sakhi</h3>
                    <p className="text-sm text-muted-foreground">Smart Farming AI</p>
                  </div>
                </div>
                
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Empowering farmers with AI-driven agricultural solutions for better crop management, 
                  disease detection, and yield optimization. Join thousands of farmers transforming their practices.
                </p>
                
                <div className="flex space-x-4">
                  {socialLinks?.map((social) => (
                    <a
                      key={social?.name}
                      href={social?.href}
                      className="w-10 h-10 bg-muted hover:bg-primary hover:text-white rounded-lg flex items-center justify-center transition-smooth"
                      aria-label={`Follow us on ${social?.name}`}
                    >
                      <Icon name={social?.icon} size={18} />
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Footer Links */}
            {footerSections?.map((section, index) => (
              <motion.div
                key={section?.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="font-semibold text-foreground mb-4">{section?.title}</h4>
                <ul className="space-y-3">
                  {section?.links?.map((link) => (
                    <li key={link?.label}>
                      <button
                        onClick={() => handleLinkClick(link)}
                        className="text-muted-foreground hover:text-primary transition-smooth text-left"
                      >
                        {link?.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="py-8 border-t border-border"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-2">
                Stay Updated with Agricultural Insights
              </h4>
              <p className="text-muted-foreground">
                Get the latest farming tips, AI updates, and success stories delivered to your inbox.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth"
              />
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-smooth flex items-center justify-center space-x-2">
                <Icon name="Mail" size={18} />
                <span>Subscribe</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-muted-foreground">
              <p>© {currentYear} Krishi-Sakhi. All rights reserved.</p>
              <div className="flex space-x-6">
                <button className="hover:text-foreground transition-smooth">Privacy Policy</button>
                <button className="hover:text-foreground transition-smooth">Terms of Service</button>
                <button className="hover:text-foreground transition-smooth">Cookie Policy</button>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Globe" size={16} />
                <span>English</span>
                <Icon name="ChevronDown" size={14} />
              </div>
              
              <button
                onClick={handleScrollToTop}
                className="w-10 h-10 bg-muted hover:bg-primary hover:text-white rounded-lg flex items-center justify-center transition-smooth"
                aria-label="Scroll to top"
              >
                <Icon name="ArrowUp" size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;