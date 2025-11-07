import React from 'react';
import { ChallengeCard } from './components/ChallengeCard';
import { Recommendation } from './components/Recommendation';
import { AgricultureIcon } from './components/icons/AgricultureIcon';
import { HealthIcon } from './components/icons/HealthIcon';
import { ClimateIcon } from './components/icons/ClimateIcon';
import type { ChallengePath } from './types';

const challengePaths: ChallengePath[] = [
  {
    title: "Agriculture Extension Chatbot",
    location: "Lesotho",
    description: "A mobile-friendly AI assistant for farmers and advisors, providing real-time crop guidance, market alerts, and farming advice via voice, text, or basic phones.",
    sdg: "Zero Hunger",
    deploymentPath: "Prototype → deploy through local agricultural networks.",
    icon: <AgricultureIcon />,
    pros: [
        "Directly impacts food security and farmer livelihoods.",
        "Leverages common tech (SMS/voice), ensuring wide reach.",
        "Clear, measurable success metrics (crop yield, income).",
    ],
    cons: [
        "Requires highly localized agricultural data.",
        "Adoption might be slow without strong community trust.",
    ]
  },
  {
    title: "NCD Prevention Chatbot",
    location: "The Gambia",
    description: "A multilingual AI assistant to prevent and manage chronic diseases like hypertension and tobacco-related risks, focusing on personalized health guidance.",
    sdg: "Good Health & Well-Being",
    deploymentPath: "Prototype → deploy through community health programs or clinics.",
    icon: <HealthIcon />,
    pros: [
        "Addresses a critical and growing health crisis in the region.",
        "Personalized guidance can significantly improve health outcomes.",
        "High potential for social good and saving lives.",
    ],
    cons: [
        "Dealing with sensitive health data raises privacy concerns.",
        "Behavior change is complex and hard to measure short-term.",
    ]
  },
  {
    title: "Extreme Weather Advisor",
    location: "Bangladesh",
    description: "An AI-powered tool to alert farmers about droughts, floods, and heatwaves, providing localized weather warnings and crop-specific risk mitigation tips.",
    sdg: "Climate Action",
    deploymentPath: "Prototype → deploy with local meteorological agencies.",
    icon: <ClimateIcon />,
    pros: [
        "Addresses an urgent, life-threatening issue with immediate impact.",
        "Technically compelling: combines predictive data with generative advice.",
        "Highly scalable to other climate-vulnerable regions.",
    ],
    cons: [
        "Reliant on accurate, real-time meteorological data feeds.",
        "The stakes are very high; misinformation could be disastrous.",
    ]
  }
];

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-primary mb-2">
            GenAI for Good Challenge
          </h1>
          <p className="text-lg md:text-xl text-brand-secondary">
            Analyzing Our Path Forward, Together.
          </p>
        </header>

        <main>
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-2 text-brand-dark">The Opportunity</h2>
            <p className="text-center text-gray-600 max-w-3xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Hey, partner! I've broken down the three challenge paths. I've added my thoughts on the pros and cons for each to help us decide. Let's find the best fit for our skills and where we can make the most impact.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {challengePaths.map((path, index) => (
                <ChallengeCard key={path.title} challenge={path} index={index} />
              ))}
            </div>
          </div>
          
          <Recommendation challengePaths={challengePaths} />

        </main>
        
        <footer className="text-center mt-16 py-6 border-t border-gray-200">
            <p className="text-gray-500">Built with passion by your partner in code. Let's do this.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;