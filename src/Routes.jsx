import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import Authentication from './pages/authentication';
import HomeLanding from './pages/home-landing';
import FarmerDashboard from './pages/farmer-dashboard';
import SoilTestAnalysis from './pages/soil-test-analysis';
import AIChatbot from './pages/ai-chatbot';
import DiseaseDetection from './pages/disease-detection';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<HomeLanding />} />
        <Route path="/authentication" element={<Authentication />} />
        <Route path="/home-landing" element={<HomeLanding />} />
        <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
        <Route path="/soil-test-analysis" element={<SoilTestAnalysis />} />
        <Route path="/ai-chatbot" element={<AIChatbot />} />
        <Route path="/disease-detection" element={<DiseaseDetection />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
