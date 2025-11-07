import React, { useState, useEffect, useRef } from 'react';
import type { Language, Message } from '../types';
import { translations } from '../lib/translations';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { Feedback } from './Feedback';

interface ChatFlowProps {
  language: Language;
  onReset: () => void;
  conversationId: number | null;
  setConversationId: (id: number | null) => void;
  onComplete: () => void;
}

export const ChatFlow: React.FC<ChatFlowProps> = ({
  language,
  onReset,
  conversationId,
  setConversationId,
  onComplete,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentTranslations = translations[language];

  // Send initial message to start conversation with backend
  useEffect(() => {
    if (messages.length === 0 && !conversationId) {
      // The backend will see an empty message with no conversationId
      // and know to send the first question.
      handleSendMessage('', true);
    }
  }, [language]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isBotTyping]);

  const handleSendMessage = async (text: string, isInitial = false) => {
    if ((!text.trim() && !isInitial) || isBotTyping || isFinished) return;

    if (!isInitial) {
      setMessages(prev => [...prev, { sender: 'user', text }]);
    }
    setIsBotTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          conversation_id: conversationId,
          language: language,
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();

      if (data.conversation_id && !conversationId) {
        setConversationId(data.conversation_id);
      }

      setMessages(prev => [
        ...prev,
        { sender: 'bot', text: data.response, audioContent: data.audio_content },
      ]);

      if (data.is_assessment_complete) {
        setIsFinished(true);
        // Delay showing feedback to allow the final message to be read
        setTimeout(() => setShowFeedback(true), 1000);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      const errorText = "I'm sorry, I'm having trouble connecting to our servers. Please check your connection and try again later.";
      setMessages(prev => [...prev, { sender: 'bot', text: errorText }]);
    } finally {
      setIsBotTyping(false);
    }
  };
  
  const handleFeedback = (response: 'yes' | 'no') => {
    // In a real app, we'd send this to the backend
    console.log(`Feedback received: ${response} for conversation ${conversationId}`);
    setShowFeedback(false);
    
    const feedbackText = currentTranslations.feedbackThanks;
    setMessages(prev => [...prev, { sender: 'bot', text: feedbackText }]);
    setTimeout(() => {
      onComplete();
    }, 2000);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="p-4 bg-white border-b border-gray-200 flex justify-between items-center shadow-sm shrink-0">
        <h1 className="text-xl font-bold text-brand-dark">{currentTranslations.welcome}</h1>
        <button
          onClick={() => {
            setConversationId(null); // Reset conversationId on start over
            onReset();
          }}
          className="text-sm font-semibold text-brand-primary hover:text-brand-dark"
        >
          {currentTranslations.resetButton}
        </button>
      </header>
      <main className="flex-1 overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto">
          {messages.map((msg, index) => (
            <ChatMessage key={index} message={msg} />
          ))}
          {isBotTyping && <ChatMessage message={{ sender: 'bot', text: '...' }} isTyping={true} />}
          {showFeedback && <Feedback translations={currentTranslations} onFeedback={handleFeedback} />}
          
          <div ref={messagesEndRef} />
        </div>
      </main>
      <footer className="shrink-0">
        <ChatInput
          onSendMessage={handleSendMessage}
          isSending={isBotTyping}
          placeholder={isFinished ? currentTranslations.inputPlaceholderFinished : currentTranslations.inputPlaceholder}
          disabled={isBotTyping || isFinished || showFeedback}
        />
      </footer>
    </div>
  );
};
