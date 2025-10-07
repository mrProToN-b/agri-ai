import React from 'react';
import { motion } from 'framer-motion';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const AboutSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Rajesh Kumar",
      location: "Punjab, India",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=150&h=150&fit=crop&crop=face",
      quote: "Krishi-Sakhi helped me detect wheat rust disease early. I saved 80% of my crop and increased my yield by 35% this season.",
      rating: 5,
      cropType: "Wheat Farmer"
    },
    {
      id: 2,
      name: "Priya Sharma",
      location: "Maharashtra, India",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&w=150&h=150&fit=crop&crop=face",
      quote: "The soil analysis feature gave me precise fertilizer recommendations. My cotton production improved significantly with reduced costs.",
      rating: 5,
      cropType: "Cotton Farmer"
    },
    {
      id: 3,
      name: "Amit Patel",
      location: "Gujarat, India",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&w=150&h=150&fit=crop&crop=face",
      quote: "The multilingual AI assistant understands my queries in Gujarati. It\'s like having an agricultural expert available 24/7.",
      rating: 5,
      cropType: "Vegetable Farmer"
    }
  ];

  const stats = [
    {
      number: "50,000+",
      label: "Active Farmers",
      icon: "Users"
    },
    {
      number: "2M+",
      label: "Crops Analyzed",
      icon: "Sprout"
    },
    {
      number: "95%",
      label: "Accuracy Rate",
      icon: "Target"
    },
    {
      number: "40%",
      label: "Yield Increase",
      icon: "TrendingUp"
    }
  ];

  return (
    <section id="about" className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Main About Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-6">
              <Icon name="Heart" size={16} className="mr-2 text-primary" />
              <span className="text-sm font-medium text-primary">Our Mission</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Empowering Farmers with AI Technology
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Krishi-Sakhi bridges the gap between traditional farming wisdom and modern AI technology. 
              We believe every farmer deserves access to intelligent tools that can transform their agricultural practices 
              and improve their livelihoods.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-1">
                  <Icon name="Check" size={14} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">AI-Powered Insights</h4>
                  <p className="text-muted-foreground text-sm">
                    Advanced machine learning algorithms provide accurate crop analysis and recommendations
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-1">
                  <Icon name="Check" size={14} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Multilingual Support</h4>
                  <p className="text-muted-foreground text-sm">
                    Voice and text assistance in local languages for better accessibility
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-1">
                  <Icon name="Check" size={14} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Real-time Monitoring</h4>
                  <p className="text-muted-foreground text-sm">
                    Continuous crop health monitoring with instant alerts and recommendations
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-modal">
              <Image
                src="https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2"
                alt="Modern farming with technology"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              
              {/* Floating Stats Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-4">
                <div className="grid grid-cols-2 gap-4">
                  {stats?.slice(0, 2)?.map((stat) => (
                    <div key={stat?.label} className="text-center">
                      <div className="text-2xl font-bold text-primary mb-1">{stat?.number}</div>
                      <div className="text-xs text-muted-foreground">{stat?.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Statistics Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {stats?.map((stat, index) => (
            <motion.div
              key={stat?.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center bg-card rounded-xl p-6 shadow-minimal border border-border"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Icon name={stat?.icon} size={24} className="text-primary" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-foreground mb-2">{stat?.number}</div>
              <div className="text-sm text-muted-foreground">{stat?.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 bg-accent/10 rounded-full mb-6">
            <Icon name="Star" size={16} className="mr-2 text-accent" />
            <span className="text-sm font-medium text-accent">Success Stories</span>
          </div>
          
          <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Trusted by Farmers Across India
          </h3>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real farmers sharing their experiences with Krishi-Sakhi's AI-powered agricultural solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials?.map((testimonial, index) => (
            <motion.div
              key={testimonial?.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl p-6 shadow-minimal border border-border hover:shadow-modal transition-smooth"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial?.rating)]?.map((_, i) => (
                  <Icon key={i} name="Star" size={16} className="text-yellow-400 fill-current" />
                ))}
              </div>
              
              <blockquote className="text-muted-foreground mb-6 leading-relaxed">
                "{testimonial?.quote}"
              </blockquote>
              
              <div className="flex items-center space-x-3">
                <Image
                  src={testimonial?.avatar}
                  alt={testimonial?.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-foreground">{testimonial?.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial?.cropType}</div>
                  <div className="text-xs text-muted-foreground">{testimonial?.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;