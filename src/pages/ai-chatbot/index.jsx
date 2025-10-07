import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import DashboardSidebar from '../../components/ui/DashboardSidebar';
import FloatingChatButton from '../../components/ui/FloatingChatButton';
import NavigationBreadcrumb from '../../components/ui/NavigationBreadcrumb';
import ChatHeader from './components/ChatHeader';
import ChatContainer from './components/ChatContainer';
import ChatInput from './components/ChatInput';
import QuickActions from './components/QuickActions';

const AIChatbot = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [playingMessageId, setPlayingMessageId] = useState(null);

  // Mock AI responses based on language
  const getAIResponse = useCallback((userMessage, language) => {
    const responses = {
      en: {
        weather: {
          text: `Based on current weather data for your location:\n\n🌤️ Today: Partly cloudy, 28°C\n🌧️ Tomorrow: Light rain expected, 25°C\n💨 Wind: 12 km/h from southeast\n💧 Humidity: 65%\n\nRecommendation: Good day for field work, but prepare for rain tomorrow. Consider covering sensitive crops.`,
          type: 'structured',
          title: 'Weather Forecast',
          data: [
            { label: 'Temperature', value: '28°C' },
            { label: 'Humidity', value: '65%' },
            { label: 'Wind Speed', value: '12 km/h' },
            { label: 'Rainfall', value: 'Light rain tomorrow' }
          ]
        },
        disease: {
          text: `I can help you identify crop diseases! Please upload a clear image of the affected plant parts (leaves, stems, fruits) and I'll analyze it for you.\n\nFor better results:\n• Take photos in good lighting\n• Show both healthy and affected areas\n• Include close-up shots of symptoms\n• Mention the crop type if possible`,
          type: 'text'
        },
        fertilizer: {
          text: `For optimal fertilizer recommendations, I need to know:\n\n🌱 Crop type and growth stage\n🏞️ Soil type and recent soil test results\n📅 Last fertilizer application\n🌧️ Recent weather conditions\n\nGeneral NPK guidelines:\n• Nitrogen: 120-150 kg/ha for cereals\n• Phosphorus: 60-80 kg/ha\n• Potassium: 40-60 kg/ha\n\nConsider organic options like compost and vermicompost for soil health.`,
          type: 'text'
        },
        price: {
          text: `Current market prices (per quintal):\n\n🌾 Wheat: ₹2,150 - ₹2,200\n🌾 Rice: ₹1,950 - ₹2,050\n🥔 Potato: ₹800 - ₹900\n🧅 Onion: ₹1,200 - ₹1,400\n🍅 Tomato: ₹1,500 - ₹1,800\n\nPrices vary by region and quality. Check your local mandi for accurate rates. Consider selling when prices are favorable.`,
          type: 'structured',
          title: 'Market Prices (₹/Quintal)',
          data: [
            { label: 'Wheat', value: '₹2,150 - ₹2,200' },
            { label: 'Rice', value: '₹1,950 - ₹2,050' },
            { label: 'Potato', value: '₹800 - ₹900' },
            { label: 'Onion', value: '₹1,200 - ₹1,400' },
            { label: 'Tomato', value: '₹1,500 - ₹1,800' }
          ]
        },
        default: `Hello! I'm your AI agricultural assistant. I can help you with:\n\n🌾 Crop management and recommendations\n🐛 Disease and pest identification\n🌤️ Weather forecasts and farming advice\n💰 Market prices and selling strategies\n🧪 Soil analysis interpretation\n🌱 Fertilizer and nutrient management\n\nWhat would you like to know about farming today?`
      },
      bn: {
        weather: {
          text: `আপনার এলাকার বর্তমান আবহাওয়ার তথ্য:\n\n🌤️ আজ: আংশিক মেঘলা, ২৮°সে\n🌧️ কাল: হালকা বৃষ্টির সম্ভাবনা, ২৫°সে\n💨 বাতাস: দক্ষিণ-পূর্ব দিক থেকে ১২ কিমি/ঘন্টা\n💧 আর্দ্রতা: ৬৫%\n\nপরামর্শ: আজ মাঠের কাজের জন্য ভাল দিন, তবে কালকের বৃষ্টির জন্য প্রস্তুত থাকুন। সংবেদনশীল ফসল ঢেকে রাখার কথা ভাবুন।`,
          type: 'structured',
          title: 'আবহাওয়ার পূর্ভাবাস',
          data: [
            { label: 'তাপমাত্রা', value: '২৮°সে' },
            { label: 'আর্দ্রতা', value: '৬৫%' },
            { label: 'বাতাসের গতি', value: '১২ কিমি/ঘন্টা' },
            { label: 'বৃষ্টিপাত', value: 'কাল হালকা বৃষ্টি' }
          ]
        },
        disease: {
          text: `আমি আপনাকে ফসলের রোগ সনাক্ত করতে সাহায্য করতে পারি! অনুগ্রহ করে আক্রান্ত গাছের অংশের (পাতা, কান্ড, ফল) একটি স্পষ্ট ছবি আপলোড করুন এবং আমি এটি বিশ্লেষণ করব।\n\nভাল ফলাফলের জন্য:\n• ভাল আলোতে ছবি তুলুন\n• সুস্থ এবং আক্রান্ত উভয় অংশ দেখান\n• লক্ষণগুলির ক্লোজ-আপ শট নিন\n• সম্ভব হলে ফসলের ধরন উল্লেখ করুন`,
          type: 'text'
        },
        fertilizer: {
          text: `সর্বোত্তম সার সুপারিশের জন্য, আমার জানা প্রয়োজন:\n\n🌱 ফসলের ধরন এবং বৃদ্ধির পর্যায়\n🏞️ মাটির ধরন এবং সাম্প্রতিক মাটি পরীক্ষার ফলাফল\n📅 শেষ সার প্রয়োগ\n🌧️ সাম্প্রতিক আবহাওয়া\n\nসাধারণ NPK নির্দেশিকা:\n• নাইট্রোজেন: ১২০-১৫০ কেজি/হেক্টর শস্যের জন্য\n• ফসফরাস: ৬০-৮০ কেজি/হেক্টর\n• পটাশিয়াম: ৪০-৬০ কেজি/হেক্টর\n\nমাটির স্বাস্থ্যের জন্য কম্পোস্ট এবং কেঁচো সারের মতো জৈব বিকল্প বিবেচনা করুন।`,
          type: 'text'
        },
        price: {
          text: `বর্তমান বাজার দাম (প্রতি কুইন্টাল):\n\n🌾 গম: ৳২,১৫০ - ৳২,২০০\n🌾 চাল: ৳১,৯৫০ - ৳২,০৫০\n🥔 আলু: ৳৮০০ - ৳৯০০\n🧅 পেঁয়াজ: ৳১,২০০ - ৳১,৪০০\n🍅 টমেটো: ৳১,৫০০ - ৳১,৮০০\n\nদাম অঞ্চল এবং গুণমানের উপর নির্ভর করে পরিবর্তিত হয়। সঠিক দামের জন্য আপনার স্থানীয় মান্ডি চেক করুন।`,
          type: 'structured',
          title: 'বাজার দাম (৳/কুইন্টাল)',
          data: [
            { label: 'গম', value: '৳২,১৫০ - ৳২,২০০' },
            { label: 'চাল', value: '৳১,৯৫০ - ৳২,০৫০' },
            { label: 'আলু', value: '৳৮০০ - ৳৯০০' },
            { label: 'পেঁয়াজ', value: '৳১,২০০ - ৳১,৪০০' },
            { label: 'টমেটো', value: '৳১,৫০০ - ৳১,৮০০' }
          ]
        },
        default: `নমস্কার! আমি আপনার কৃষি সহায়ক AI। আমি আপনাকে সাহায্য করতে পারি:\n\n🌾 ফসল ব্যবস্থাপনা এবং সুপারিশ\n🐛 রোগ এবং পোকামাকড় সনাক্তকরণ\n🌤️ আবহাওয়ার পূর্বাভাস এবং কৃষি পরামর্শ\n💰 বাজার দাম এবং বিক্রয় কৌশল\n🧪 মাটি বিশ্লেষণ ব্যাখ্যা\n🌱 সার এবং পুষ্টি ব্যবস্থাপনা\n\nআজ কৃষি সম্পর্কে কী জানতে চান?`
      }
    };

    const userText = userMessage?.toLowerCase();
    const langResponses = responses?.[language] || responses?.en;

    if (userText?.includes('weather') || userText?.includes('আবহাওয়া')) {
      return langResponses?.weather;
    } else if (userText?.includes('disease') || userText?.includes('রোগ')) {
      return langResponses?.disease;
    } else if (userText?.includes('fertilizer') || userText?.includes('সার')) {
      return langResponses?.fertilizer;
    } else if (userText?.includes('price') || userText?.includes('দাম')) {
      return langResponses?.price;
    } else {
      return { text: langResponses?.default, type: 'text' };
    }
  }, []);

  // Load saved language and messages
  useEffect(() => {
    const savedLanguage = localStorage.getItem('krishiSakhiLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }

    const savedMessages = localStorage.getItem('krishiSakhiChatMessages');
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        setMessages(parsedMessages?.map(msg => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        })));
      } catch (error) {
        console.error('Error loading saved messages:', error);
      }
    }
  }, []);

  // Save messages to localStorage
  useEffect(() => {
    if (messages?.length > 0) {
      localStorage.setItem('krishiSakhiChatMessages', JSON.stringify(messages));
    }
  }, [messages]);

  const handleLanguageChange = (newLanguage) => {
    setCurrentLanguage(newLanguage);
    localStorage.setItem('krishiSakhiLanguage', newLanguage);
  };

  const handleSendMessage = (message) => {
    const userMessage = {
      ...message,
      sender: 'user',
      id: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse = getAIResponse(message?.text, currentLanguage);
      const aiMessage = {
        ...aiResponse,
        sender: 'ai',
        id: Date.now() + 1,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleVoiceInput = (isActive) => {
    setIsListening(isActive);
    
    if (isActive) {
      // Simulate voice recognition
      setTimeout(() => {
        setIsListening(false);
        // Mock voice input result
        const voiceMessage = {
          text: currentLanguage === 'bn' ?'আজকের আবহাওয়া কেমন?' :'What is today\'s weather like?',
          type: 'text',
          timestamp: new Date(),
          sender: 'user',
          id: Date.now()
        };
        handleSendMessage(voiceMessage);
      }, 3000);
    }
  };

  const handlePlayAudio = (text) => {
    const messageId = `audio-${Date.now()}`;
    setPlayingMessageId(messageId);
    
    // Simulate text-to-speech
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = currentLanguage === 'bn' ? 'bn-BD' : 'en-US';
      utterance.onend = () => setPlayingMessageId(null);
      speechSynthesis.speak(utterance);
    } else {
      // Fallback - just clear playing state after delay
      setTimeout(() => setPlayingMessageId(null), 3000);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    localStorage.removeItem('krishiSakhiChatMessages');
  };

  const handleQuickAction = (action) => {
    handleSendMessage(action);
  };

  return (
    <>
      <Helmet>
        <title>AI Agricultural Assistant - Krishi-Sakhi</title>
        <meta name="description" content="Chat with our AI assistant for farming advice, disease detection, weather updates, and agricultural guidance in multiple languages." />
      </Helmet>
      <div className="min-h-screen bg-background flex">
        {/* Sidebar */}
        <DashboardSidebar
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* Main Content */}
        <div 
          className={`flex-1 flex flex-col transition-smooth ${
            sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'
          }`}
        >
          {/* Chat Header */}
          <ChatHeader
            currentLanguage={currentLanguage}
            onLanguageChange={handleLanguageChange}
            onClearChat={handleClearChat}
            messageCount={messages?.length}
          />

          {/* Breadcrumb Navigation */}
          <div className="px-4 py-2 border-b border-border bg-card/50">
            <NavigationBreadcrumb />
          </div>

          {/* Quick Actions */}
          {messages?.length === 0 && (
            <QuickActions
              onActionClick={handleQuickAction}
              currentLanguage={currentLanguage}
            />
          )}

          {/* Chat Container */}
          <ChatContainer
            messages={messages}
            isTyping={isTyping}
            onPlayAudio={handlePlayAudio}
            playingMessageId={playingMessageId}
          />

          {/* Chat Input */}
          <ChatInput
            onSendMessage={handleSendMessage}
            onVoiceInput={handleVoiceInput}
            isListening={isListening}
            currentLanguage={currentLanguage}
            disabled={isTyping}
          />
        </div>

        {/* Floating Chat Button */}
        <FloatingChatButton isOpen={true} onToggle={() => {}} />
      </div>
    </>
  );
};

export default AIChatbot;