import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import type { ChallengePath } from '../types';

interface RecommendationProps {
    challengePaths: ChallengePath[];
}

const RecommendationContent: React.FC<{ content: string }> = ({ content }) => {
    // A more robust markdown-to-JSX parser to handle lists correctly.
    const lines = content.split('\n').filter(p => p.trim() !== '');
    const elements: React.ReactNode[] = [];
    let currentList: { type: 'ul' | 'ol', items: string[] } | null = null;

    const flushList = () => {
        if (currentList) {
            const ListTag = currentList.type;
            const key = `list-${elements.length}`;
            elements.push(
                <ListTag key={key} className={`${ListTag === 'ul' ? 'list-disc' : 'list-decimal'} list-inside ml-4 space-y-1`}>
                    {currentList.items.map((item, i) => <li key={`${key}-${i}`} dangerouslySetInnerHTML={{ __html: item }} />)}
                </ListTag>
            );
            currentList = null;
        }
    };

    lines.forEach((line, index) => {
        // Process bold syntax
        const formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        if (line.startsWith('* ') || line.startsWith('- ')) {
            if (currentList?.type !== 'ul') {
                flushList();
                currentList = { type: 'ul', items: [] };
            }
            currentList.items.push(formattedLine.substring(2));
        } else if (/^\d+\.\s/.test(line)) {
            if (currentList?.type !== 'ol') {
                flushList();
                currentList = { type: 'ol', items: [] };
            }
            currentList.items.push(formattedLine.substring(line.indexOf(' ')+1));
        } else {
            flushList(); // End any existing list before processing a non-list item
            if (line.startsWith('###')) {
                elements.push(<h3 key={index} className="text-xl font-bold text-brand-dark mt-4 mb-2" dangerouslySetInnerHTML={{ __html: formattedLine.substring(3).trim() }}></h3>);
            } else if (line.startsWith('##')) {
                elements.push(<h2 key={index} className="text-2xl font-bold text-brand-dark mt-4 mb-2" dangerouslySetInnerHTML={{ __html: formattedLine.substring(2).trim() }}></h2>);
            } else {
                elements.push(<p key={index} className="mb-4" dangerouslySetInnerHTML={{ __html: formattedLine }}></p>);
            }
        }
    });

    flushList(); // Flush any remaining list at the end

    return <>{elements}</>;
};


export const Recommendation: React.FC<RecommendationProps> = ({ challengePaths }) => {
    const [recommendation, setRecommendation] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getRecommendation = async () => {
            try {
                // FIX: Removed unnecessary API key check, as per guidelines it's assumed to be present.
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

                // Clean up data for the prompt (remove ReactNode icon)
                const promptData = challengePaths.map(({ icon, ...rest }) => rest);

                const prompt = `
You are a world-class senior developer acting as a friendly and collaborative partner. We need to decide which project to pursue for the 'GenAI for Good Challenge'. I've laid out the three options below with my initial pros and cons.

Analyze these paths from the perspective of a two-person team with strong technical skills. Give me your definitive recommendation and a compelling, well-reasoned argument for why it's the best choice for us. Focus on:
1.  **Immediate & Measurable Impact:** Which project saves lives or dramatically improves livelihoods the fastest?
2.  **Technical Challenge & Innovation:** Which project is the most engaging for us as engineers and allows us to build something truly innovative?
3.  **Scalability & Future-Proofing:** Which solution has the greatest potential to be adapted and used globally?

Address me directly as your partner. Keep the tone encouraging, decisive, and collaborative. Conclude by asking if I'm in. Use markdown for formatting, like ## for headings and * for list items.

Here are the options:
---
${JSON.stringify(promptData, null, 2)}
---
`;

                const response = await ai.models.generateContent({
                    model: 'gemini-2.5-pro',
                    contents: prompt,
                });
                
                setRecommendation(response.text);

            } catch (e) {
                console.error(e);
                // FIX: Updated error message to be more generic and not mention API keys.
                setError('I had a little trouble analyzing the paths. The AI might be taking a coffee break. Please try refreshing.');
            } finally {
                setLoading(false);
            }
        };

        getRecommendation();
    }, [challengePaths]);

    const renderBody = () => {
        if (loading) {
            return (
                <div className="text-center">
                    <p className="text-lg text-brand-secondary animate-pulse">Thinking... I'm analyzing the options to find our best path forward.</p>
                </div>
            );
        }

        if (error) {
            return (
                <div className="text-center text-red-600 bg-red-100 p-4 rounded-lg">
                    <h3 className="font-bold">Oops!</h3>
                    <p>{error}</p>
                </div>
            );
        }

        return (
            <div className="space-y-4 text-gray-700 text-left">
                <RecommendationContent content={recommendation} />
            </div>
        );
    };

    return (
        <div className="bg-white rounded-xl shadow-2xl p-8 border-l-8 border-brand-primary animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left">
                <div className="w-20 h-20 bg-brand-primary text-white rounded-full flex items-center justify-center mb-6 md:mb-0 md:mr-8 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                </div>
                <div>
                    <h2 className="text-3xl font-bold text-brand-dark mb-4">My Recommendation</h2>
                    {renderBody()}
                </div>
            </div>
        </div>
    );
};