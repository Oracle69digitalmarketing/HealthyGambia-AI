import React, { useState } from 'react';
import type { Message } from '../types';
import { HealthIcon } from './icons/HealthIcon';
import { decodeAudioData, playAudio } from '../lib/audio';

interface ChatMessageProps {
  message: Message;
  isTyping?: boolean;
}

const SpeakerIcon: React.FC<{isPlaying: boolean}> = ({ isPlaying }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      {isPlaying ? (
        <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.383-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
      ) : (
        <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.383-.217zM14.5 8.5a4.5 4.5 0 010 3" clipRule="evenodd" />
      )}
    </svg>
);


export const ChatMessage: React.FC<ChatMessageProps> = ({ message, isTyping = false }) => {
  const isBot = message.sender === 'bot';
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  const handlePlayAudio = async () => {
    if (!message.audioContent || isPlaying) return;

    setIsPlaying(true);
    // FIX: Cast window to any to support webkitAudioContext for older browsers.
    const ctx = audioContext || new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    if (!audioContext) setAudioContext(ctx);

    try {
      const audioBuffer = await decodeAudioData(message.audioContent, ctx);
      await playAudio(audioBuffer, ctx);
    } catch (error) {
      console.error("Failed to play audio:", error);
    } finally {
      setIsPlaying(false);
    }
  };
  
  return (
    <div className="flex items-start gap-3 my-4 animate-fade-in-up">
      <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center ${isBot ? 'bg-brand-primary text-white' : 'bg-gray-200 text-gray-600'}`}>
        {isBot ? (
          <HealthIcon className="w-6 h-6" />
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        )}
      </div>
      <div className={`p-4 rounded-xl max-w-lg break-words shadow-md ${isBot ? 'bg-white text-gray-800' : 'bg-brand-primary text-white'}`}>
        {isTyping ? (
          <div className="flex items-center space-x-1">
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0s'}}></span>
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
          </div>
        ) : (
          <>
            {message.text.split('\n').map((line, index) => (
              <p key={index} className="text-sm leading-relaxed">{line || '\u00A0'}</p>
            ))}
            {isBot && message.audioContent && (
              <button 
                onClick={handlePlayAudio}
                disabled={isPlaying}
                className="mt-3 flex items-center gap-2 text-sm font-semibold text-brand-primary hover:text-brand-dark disabled:text-gray-400 transition-colors"
              >
                <SpeakerIcon isPlaying={isPlaying} />
                {isPlaying ? 'Playing...' : 'Play Audio'}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};