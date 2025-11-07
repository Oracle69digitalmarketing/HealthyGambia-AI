import React from 'react';
import type { Language } from '../types';
import { translations } from '../lib/translations';
import { HealthIcon } from './icons/HealthIcon';

interface PilotSummaryProps {
  language: Language;
  onReset: () => void;
}

const StatCard: React.FC<{ label: string, value: string, icon: React.ReactNode, delay: number }> = ({ label, value, icon, delay }) => (
    <div className="bg-white p-4 rounded-lg shadow-md text-center animate-fade-in-up" style={{ animationDelay: `${delay}ms`}}>
        <div className="w-12 h-12 bg-brand-light text-brand-primary rounded-full flex items-center justify-center mx-auto mb-3">
            {icon}
        </div>
        <p className="text-2xl font-bold text-brand-dark">{value}</p>
        <p className="text-sm text-gray-600">{label}</p>
    </div>
);

export const PilotSummary: React.FC<PilotSummaryProps> = ({ language, onReset }) => {
    const currentTranslations = translations[language];

    return (
        <div className="flex flex-col items-center justify-center h-full p-4 bg-brand-light text-center animate-fade-in-up">
            <div className="w-20 h-20 bg-brand-primary text-white rounded-full flex items-center justify-center mb-6 shadow-lg">
                <HealthIcon className="w-10 h-10" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-brand-dark mb-2">
                {currentTranslations.summaryTitle}
            </h1>
            <p className="text-md text-brand-secondary mb-8 max-w-xl">
                {currentTranslations.summarySubtitle}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl mb-8">
                <StatCard 
                    label={currentTranslations.summaryMetricTotal}
                    value="1,254" 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>}
                    delay={200}
                />
                <StatCard 
                    label={currentTranslations.summaryMetricFeedback} 
                    value="92%" 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.085a2 2 0 00-1.736.986l-3.5 7m7-10l-3.5 7" /></svg>}
                    delay={400}
                />
                <StatCard 
                    label={currentTranslations.summaryMetricLanguages} 
                    value="4" 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m4 13l4-4M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" /></svg>}
                    delay={600}
                />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                <button
                    disabled
                    className="flex-1 p-4 bg-gray-300 text-gray-500 font-semibold rounded-lg cursor-not-allowed"
                >
                    {currentTranslations.summaryReportButton}
                </button>
                <button
                    onClick={onReset}
                    className="flex-1 p-4 bg-brand-primary text-white font-semibold rounded-lg shadow-md hover:shadow-xl hover:bg-brand-dark transition-all duration-300 ease-in-out"
                >
                    {currentTranslations.summaryResetButton}
                </button>
            </div>
        </div>
    );
};