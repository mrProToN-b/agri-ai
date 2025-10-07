import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const EducationalContent = () => {
  const [activeTab, setActiveTab] = useState('common-diseases');

  const commonDiseases = [
    {
      id: 1,
      name: "Late Blight",
      crops: ["Tomato", "Potato"],
      symptoms: "Dark brown spots on leaves, white mold on undersides",
      prevention: "Improve air circulation, avoid overhead watering",
      image: "https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg"
    },
    {
      id: 2,
      name: "Powdery Mildew",
      crops: ["Cucumber", "Squash", "Pumpkin"],
      symptoms: "White powdery coating on leaves and stems",
      prevention: "Ensure good air flow, avoid overcrowding plants",
      image: "https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg"
    },
    {
      id: 3,
      name: "Bacterial Wilt",
      crops: ["Tomato", "Eggplant", "Pepper"],
      symptoms: "Sudden wilting of plants, brown vascular tissue",
      prevention: "Use disease-free seeds, practice crop rotation",
      image: "https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg"
    }
  ];

  const preventionTips = [
    {
      category: "Soil Management",
      tips: [
        "Maintain proper soil pH levels for optimal plant health",
        "Ensure good drainage to prevent waterlogged conditions",
        "Add organic matter to improve soil structure and fertility",
        "Practice crop rotation to break disease cycles"
      ]
    },
    {
      category: "Water Management",
      tips: [
        "Water at the base of plants to avoid wetting foliage",
        "Water early morning to allow leaves to dry quickly",
        "Use drip irrigation or soaker hoses when possible",
        "Avoid overwatering which can lead to root diseases"
      ]
    },
    {
      category: "Plant Care",
      tips: [
        "Provide adequate spacing between plants for air circulation",
        "Remove diseased plant material immediately",
        "Disinfect tools between plants to prevent spread",
        "Monitor plants regularly for early disease detection"
      ]
    }
  ];

  const identificationGuide = [
    {
      symptom: "Yellow Leaves",
      possibleCauses: ["Nutrient deficiency", "Overwatering", "Viral infection"],
      action: "Check soil moisture and nutrient levels"
    },
    {
      symptom: "Brown Spots",
      possibleCauses: ["Fungal infection", "Bacterial disease", "Sunscald"],
      action: "Examine spot patterns and apply appropriate treatment"
    },
    {
      symptom: "Wilting",
      possibleCauses: ["Root rot", "Bacterial wilt", "Water stress"],
      action: "Check root system and watering schedule"
    },
    {
      symptom: "White Coating",
      possibleCauses: ["Powdery mildew", "Downy mildew"],
      action: "Improve air circulation and apply fungicide"
    }
  ];

  const tabs = [
    { id: 'common-diseases', label: 'Common Diseases', icon: 'Bug' },
    { id: 'prevention', label: 'Prevention Tips', icon: 'Shield' },
    { id: 'identification', label: 'Quick ID Guide', icon: 'Search' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">Educational Resources</h3>
        <p className="text-sm text-muted-foreground">
          Learn about common crop diseases and prevention strategies
        </p>
      </div>
      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-muted rounded-lg p-1">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`
              flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-sm font-medium transition-smooth
              ${activeTab === tab?.id
                ? 'bg-card text-foreground shadow-minimal'
                : 'text-muted-foreground hover:text-foreground'
              }
            `}
          >
            <Icon name={tab?.icon} size={16} />
            <span className="hidden sm:inline">{tab?.label}</span>
          </button>
        ))}
      </div>
      {/* Tab Content */}
      <div className="space-y-4">
        {activeTab === 'common-diseases' && (
          <div className="space-y-4">
            {commonDiseases?.map((disease) => (
              <div key={disease?.id} className="border border-border rounded-lg p-4">
                <div className="flex items-start space-x-4">
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={disease?.image}
                      alt={disease?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground mb-2">{disease?.name}</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Affects: </span>
                        <span className="text-foreground">{disease?.crops?.join(', ')}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Symptoms: </span>
                        <span className="text-foreground">{disease?.symptoms}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Prevention: </span>
                        <span className="text-foreground">{disease?.prevention}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'prevention' && (
          <div className="space-y-6">
            {preventionTips?.map((category, index) => (
              <div key={index} className="border border-border rounded-lg p-4">
                <h4 className="font-medium text-foreground mb-3 flex items-center">
                  <Icon name="CheckCircle" size={16} className="mr-2 text-success" />
                  {category?.category}
                </h4>
                <ul className="space-y-2">
                  {category?.tips?.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start space-x-2 text-sm">
                      <Icon name="ArrowRight" size={14} className="text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'identification' && (
          <div className="space-y-4">
            {identificationGuide?.map((guide, index) => (
              <div key={index} className="border border-border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-medium text-foreground flex items-center">
                    <Icon name="AlertTriangle" size={16} className="mr-2 text-warning" />
                    {guide?.symptom}
                  </h4>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Possible causes: </span>
                    <span className="text-foreground">{guide?.possibleCauses?.join(', ')}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Recommended action: </span>
                    <span className="text-foreground">{guide?.action}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EducationalContent;