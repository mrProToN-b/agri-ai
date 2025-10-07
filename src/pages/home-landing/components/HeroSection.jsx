import React, { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const HeroSection = () => {
  const navigate = useNavigate();
  const swiperRef = useRef(null);

  const heroSlides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      title: "Smart Farming with AI Technology",
      subtitle: "Revolutionize your agricultural practices with intelligent crop monitoring and disease detection",
      highlight: "Increase yield by 40%"
    },
    {
      id: 2,
      image: "https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg?auto=compress&cs=tinysrgb&w=2340&h=1560&dpr=2",
      title: "Expert Agricultural Guidance",
      subtitle: "Get personalized farming recommendations based on soil analysis and weather patterns",
      highlight: "24/7 AI Assistant"
    },
    {
      id: 3,
      image: "https://images.pixabay.com/photo/2016/08/11/23/48/mountains-1587287_1280.jpg",
      title: "Multilingual Farming Support",
      subtitle: "Access agricultural expertise in your local language with voice-enabled assistance",
      highlight: "English & Bengali Support"
    }
  ];

  const handleGetStarted = () => {
    navigate('/authentication');
  };

  const handleLearnMore = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        navigation={{
          nextEl: '.hero-swiper-button-next',
          prevEl: '.hero-swiper-button-prev',
        }}
        pagination={{
          el: '.hero-swiper-pagination',
          clickable: true,
          bulletClass: 'swiper-pagination-bullet hero-bullet',
          bulletActiveClass: 'swiper-pagination-bullet-active hero-bullet-active'
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop
        className="h-full w-full"
      >
        {heroSlides?.map((slide, index) => (
          <SwiperSlide key={slide?.id} className="relative">
            <div className="absolute inset-0 bg-black/40 z-10" />
            <Image
              src={slide?.image}
              alt={slide?.title}
              className="w-full h-full object-cover"
            />
            
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <div className="container mx-auto px-4 text-center text-white">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  className="max-w-4xl mx-auto"
                >
                  <div className="inline-flex items-center px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-full mb-6">
                    <Icon name="Sparkles" size={16} className="mr-2" />
                    <span className="text-sm font-medium">{slide?.highlight}</span>
                  </div>
                  
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                    {slide?.title}
                  </h1>
                  
                  <p className="text-lg md:text-xl lg:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed">
                    {slide?.subtitle}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button
                      variant="default"
                      size="lg"
                      onClick={handleGetStarted}
                      iconName="ArrowRight"
                      iconPosition="right"
                      className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg"
                    >
                      Get Started Free
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={handleLearnMore}
                      iconName="Play"
                      iconPosition="left"
                      className="border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg"
                    >
                      Learn More
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Custom Navigation Buttons */}
      <div className="hero-swiper-button-prev absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-smooth">
        <Icon name="ChevronLeft" size={24} color="white" />
      </div>
      <div className="hero-swiper-button-next absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-smooth">
        <Icon name="ChevronRight" size={24} color="white" />
      </div>
      {/* Custom Pagination */}
      <div className="hero-swiper-pagination absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-2"></div>
      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 hidden md:flex flex-col items-center text-white"
      >
        <span className="text-sm mb-2">Scroll to explore</span>
        <Icon name="ChevronDown" size={20} />
      </motion.div>
      <style jsx>{`
        .hero-bullet {
          width: 12px !important;
          height: 12px !important;
          background: rgba(255, 255, 255, 0.5) !important;
          opacity: 1 !important;
          margin: 0 4px !important;
          border-radius: 50% !important;
          transition: all 0.3s ease !important;
        }
        
        .hero-bullet-active {
          background: white !important;
          transform: scale(1.2) !important;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;