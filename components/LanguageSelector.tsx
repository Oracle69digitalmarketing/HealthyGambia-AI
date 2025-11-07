import React from 'react';
import type { Language } from '../types';
import { HealthIcon } from './icons/HealthIcon';

interface LanguageSelectorProps {
  onSelectLanguage: (language: Language) => void;
}

const languages: Language[] = ['English', 'Mandinka', 'Wolof', 'Fula'];

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onSelectLanguage }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4 bg-brand-light text-center">
       <div className="w-20 h-20 bg-brand-primary text-white rounded-full flex items-center justify-center mb-6 shadow-lg">
          <HealthIcon className="w-10 h-10" />
       </div>
      <h1 className="text-3xl md:text-4xl font-bold text-brand-dark mb-2">
        Welcome to HealthyGambia AI
      </h1>
      <p className="text-lg text-brand-secondary mb-8 max-w-md">
        Please select your preferred language to begin your health assessment.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
        {languages.map((lang) => (
          <button
            key={lang}
            onClick={() => onSelectLanguage(lang)}
            className="p-4 bg-white text-brand-dark font-semibold rounded-lg shadow-md hover:shadow-xl hover:bg-brand-primary hover:text-white transition-all duration-300 ease-in-out transform hover:-translate-y-1 animate-fade-in-up"
            style={{ animationDelay: `${languages.indexOf(lang) * 100}ms`}}
          >
            {lang}
          </button>
        ))}
      </div>
       <p className="text-xs text-gray-500 mt-12">
        Your trusted partner for NCD prevention and management.
      </p>
    </div>
  );
};