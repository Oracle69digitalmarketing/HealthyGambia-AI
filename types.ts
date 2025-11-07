import type React from 'react';

export type Language = 'English' | 'Mandinka' | 'Wolof' | 'Fula';

export interface Message {
  sender: 'user' | 'bot';
  text: string;
  audioContent?: string;
}

// FIX: Define and export the missing ChallengePath type based on its usage in App.tsx.
export interface ChallengePath {
  title: string;
  location: string;
  description: string;
  sdg: string;
  deploymentPath: string;
  icon: React.ReactNode;
  pros: string[];
  cons: string[];
}

export interface Translations {
  welcome: string;
  resetButton: string;
  inputPlaceholder: string;
  inputPlaceholderFinished: string;
  consentTitle: string;
  consentDisclaimer: string;
  consentAgree: string;
  consentDecline: string;
  generatingSummary: string;
  questions: string[];
  feedbackPrompt: string;
  feedbackYes: string;
  feedbackNo: string;
  feedbackThanks: string;
  summaryTitle: string;
  summarySubtitle: string;
  summaryMetricTotal: string;
  summaryMetricFeedback: string;
  summaryMetricLanguages: string;
  summaryReportButton: string;
  summaryResetButton: string;
}
