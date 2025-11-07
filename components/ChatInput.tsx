import React, { useState, useRef, useEffect } from 'react';

// FIX: Add a local interface for SpeechRecognition to resolve the "Cannot find name 'SpeechRecognition'" error.
interface SpeechRecognition {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onstart: () => void;
  onend: () => void;
  onerror: (event: any) => void;
  onresult: (event: any) => void;
  stop: () => void;
  start: () => void;
}

// SpeechRecognition API might be vendor-prefixed
// FIX: Rename constant to avoid shadowing the global SpeechRecognition type and cast window to any to avoid TypeScript errors for non-standard properties.
const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

const MicIcon: React.FC<{isListening: boolean}> = ({ isListening }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${isListening ? 'text-red-500' : ''}`} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm5 4a1 1 0 11-2 0V4a1 1 0 112 0v4zm-5 5a5 5 0 004 4.9V17a1 1 0 102 0v-2.1A5 5 0 005 9zm-1 0a1 1 0 011-1h4a1 1 0 110 2H5a1 1 0 01-1-1z" clipRule="evenodd" />
    </svg>
);


interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isSending: boolean;
  placeholder: string;
  disabled: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isSending, placeholder, disabled }) => {
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  // FIX: With the constant renamed to SpeechRecognitionAPI, SpeechRecognition now correctly refers to the interface type.
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if (!SpeechRecognitionAPI) {
      console.warn("Speech Recognition is not supported by this browser.");
      return;
    }
    const recognition = new SpeechRecognitionAPI();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US'; // This can be adapted later based on the selected language

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript.trim();
      if (transcript) {
        onSendMessage(transcript);
      }
    };
    
    recognitionRef.current = recognition;

  }, [onSendMessage]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !disabled) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleMicClick = () => {
    if (disabled || !recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };


  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-200 flex items-center gap-3">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="flex-grow p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-primary transition-shadow disabled:bg-gray-100"
      />
      {SpeechRecognitionAPI && (
          <button
            type="button"
            onClick={handleMicClick}
            disabled={disabled}
            className={`w-12 h-12 border rounded-full flex items-center justify-center flex-shrink-0 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors ${isListening ? 'border-red-500 animate-pulse' : 'border-gray-300'}`}
          >
            <MicIcon isListening={isListening} />
          </button>
      )}
      <button
        type="submit"
        disabled={disabled || !inputValue.trim()}
        className="w-12 h-12 bg-brand-primary text-white rounded-full flex items-center justify-center flex-shrink-0 disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-brand-dark transition-colors"
      >
        {isSending ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
        )}
      </button>
    </form>
  );
};
