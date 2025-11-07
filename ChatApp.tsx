import React, { useState } from 'react';
import type { Language } from './types';
import { LanguageSelector } from './components/LanguageSelector';
import { ConsentScreen } from './components/ConsentScreen';
import { ChatFlow } from './components/ChatFlow';
import { PilotSummary } from './components/PilotSummary';

export const ChatApp: React.FC = () => {
  const [language, setLanguage] = useState<Language | null>(null);
  const [consentGiven, setConsentGiven] = useState<boolean>(false);
  const [conversationId, setConversationId] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const handleLanguageSelect = (selectedLanguage: Language) => {
    setLanguage(selectedLanguage);
  };

  const handleConsentAgree = () => {
    setConsentGiven(true);
  };

  const handleAssessmentComplete = () => {
    setIsFinished(true);
  };

  const handleReset = () => {
    setLanguage(null);
    setConsentGiven(false);
    setConversationId(null);
    setIsFinished(false);
  };

  if (!language) {
    return <LanguageSelector onSelectLanguage={handleLanguageSelect} />;
  }

  if (!consentGiven) {
    return <ConsentScreen language={language} onAgree={handleConsentAgree} onDecline={handleReset} />;
  }

  if (isFinished) {
    return <PilotSummary language={language} onReset={handleReset} />;
  }

  return (
    <ChatFlow
      language={language}
      onReset={handleReset}
      conversationId={conversationId}
      setConversationId={setConversationId}
      onComplete={handleAssessmentComplete}
    />
  );
};
