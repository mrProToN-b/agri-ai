import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import NavigationHeader from './components/NavigationHeader';
import HeroSection from './components/HeroSection';
import FeaturesGrid from './components/FeaturesGrid';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

const HomeLanding = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Krishi-Sakhi - AI-Powered Smart Farming Platform</title>
        <meta 
          name="description" 
          content="Transform your farming with AI-driven crop disease detection, soil analysis, yield prediction, and multilingual agricultural assistance. Join 50,000+ farmers using Krishi-Sakhi." 
        />
        <meta 
          name="keywords" 
          content="smart farming, AI agriculture, crop disease detection, soil analysis, farming assistant, agricultural technology, yield prediction, farming AI" 
        />
        <meta name="author" content="Krishi-Sakhi Team" />
        <meta property="og:title" content="Krishi-Sakhi - AI-Powered Smart Farming Platform" />
        <meta 
          property="og:description" 
          content="Revolutionize your agricultural practices with intelligent crop monitoring, disease detection, and multilingual AI assistance." 
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Krishi-Sakhi - Smart Farming AI" />
        <meta 
          name="twitter:description" 
          content="AI-powered agricultural solutions for modern farmers. Disease detection, soil analysis, and expert guidance." 
        />
        <link rel="canonical" href="https://krishi-sakhi.com" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Fixed Navigation Header */}
        <NavigationHeader />

        {/* Main Content */}
        <main>
          {/* Hero Section with Swiper Slider */}
          <section id="home">
            <HeroSection />
          </section>

          {/* Features Grid Section */}
          <FeaturesGrid />

          {/* About Section with Testimonials */}
          <AboutSection />

          {/* Contact Section with Form */}
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default HomeLanding;