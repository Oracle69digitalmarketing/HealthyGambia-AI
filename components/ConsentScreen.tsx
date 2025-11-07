import React from 'react';
import type { Language } from '../types';
import { translations } from '../lib/translations';
import { HealthIcon } from './icons/HealthIcon';

interface ConsentScreenProps {
  language: Language;
  onAgree: () => void;
  onDecline: () => void;
}

export const ConsentScreen: React.FC<ConsentScreenProps> = ({ language, onAgree, onDecline }) => {
  const currentTranslations = translations[language];
  const disclaimerPoints = currentTranslations.consentDisclaimer.split('\n');

  return (
    <div className="flex flex-col items-center justify-center h-full p-4 bg-brand-light text-center animate-fade-in-up">
      <div className="w-20 h-20 bg-brand-primary text-white rounded-full flex items-center justify-center mb-6 shadow-lg">
        <HealthIcon className="w-10 h-10" />
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
        {currentTranslations.consentTitle}
      </h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl text-left text-sm text-gray-700 space-y-3 mb-8">
        {disclaimerPoints.map((point, index) => (
            <p key={index}>{point}</p>
        ))}
      </div>

      <div className="flex gap-4 w-full max-w-md">
        <button
          onClick={onDecline}
          className="flex-1 p-4 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow-md hover:shadow-xl hover:bg-gray-300 transition-all duration-300 ease-in-out"
        >
          {currentTranslations.consentDecline}
        </button>
        <button
          onClick={onAgree}
          className="flex-1 p-4 bg-brand-primary text-white font-semibold rounded-lg shadow-md hover:shadow-xl hover:bg-brand-dark transition-all duration-300 ease-in-out transform hover:-translate-y-1"
        >
          {currentTranslations.consentAgree}
        </button>
      </div>
    </div>
  );
};