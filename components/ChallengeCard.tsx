
import React from 'react';
import type { ChallengePath } from '../types';

interface ChallengeCardProps {
  challenge: ChallengePath;
  index: number;
}

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);

const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 flex-shrink-0 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
    </svg>
);

export const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge, index }) => {
  return (
    <div 
        className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out flex flex-col p-6 border-t-4 border-brand-accent animate-fade-in-up"
        style={{ animationDelay: `${0.4 + index * 0.1}s` }}
    >
      <div className="flex items-start mb-4">
        <div className="w-12 h-12 bg-brand-light text-brand-primary rounded-full flex items-center justify-center mr-4 flex-shrink-0">
          {challenge.icon}
        </div>
        <div>
          <h3 className="text-xl font-bold text-brand-dark">{challenge.title}</h3>
          <p className="text-sm font-semibold text-brand-secondary">{challenge.location}</p>
        </div>
      </div>
      
      <p className="text-gray-600 mb-4 text-sm leading-relaxed">{challenge.description}</p>
      
      <div className="mt-auto space-y-4">
        <div className="text-xs p-2 bg-gray-100 rounded-md">
            <p><span className="font-bold">SDG Focus:</span> {challenge.sdg}</p>
            <p><span className="font-bold">Path:</span> {challenge.deploymentPath}</p>
        </div>
        
        <div>
          <h4 className="font-bold text-sm text-gray-700 mb-2">My Take:</h4>
          <ul className="space-y-1.5 text-xs text-gray-600">
            {challenge.pros.map(pro => (
              <li key={pro} className="flex items-start"><CheckIcon /> {pro}</li>
            ))}
            {challenge.cons.map(con => (
              <li key={con} className="flex items-start"><XIcon /> {con}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
