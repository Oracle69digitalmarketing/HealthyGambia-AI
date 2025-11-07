import React from 'react';
import type { Translations } from '../types';

interface FeedbackProps {
  translations: Pick<Translations, 'feedbackPrompt' | 'feedbackYes' | 'feedbackNo'>;
  onFeedback: (response: 'yes' | 'no') => void;
}

export const Feedback: React.FC<FeedbackProps> = ({ translations, onFeedback }) => {
  return (
    <div className="text-center p-4 my-4 bg-white rounded-lg shadow-md animate-fade-in-up">
      <p className="text-gray-700 font-semibold mb-3">{translations.feedbackPrompt}</p>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => onFeedback('yes')}
          className="px-6 py-2 bg-green-100 text-green-800 font-bold rounded-full hover:bg-green-200 transition-colors"
        >
          {translations.feedbackYes}
        </button>
        <button
          onClick={() => onFeedback('no')}
          className="px-6 py-2 bg-red-100 text-red-800 font-bold rounded-full hover:bg-red-200 transition-colors"
        >
          {translations.feedbackNo}
        </button>
      </div>
    </div>
  );
};