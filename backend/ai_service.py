import os
import google.generativeai as genai
from dotenv import load_dotenv
from backend.models import Message
from typing import List

load_dotenv()

genai.configure(api_key=os.getenv("API_KEY"))

# For now, we'll use a simplified knowledge base.
# In a real implementation, this would be a sophisticated retrieval system.
def get_knowledge(prompt: str) -> str:
    """Retrieves knowledge from a knowledge base."""
    # This is a placeholder. A real implementation would use a vector database.
    if "hypertension" in prompt.lower() or "blood pressure" in prompt.lower():
        return "WHO Guideline: Reducing daily salt intake to less than 5 grams can lower blood pressure."
    return ""

def generate_response(conversation_history: List[Message], user_prompt: str) -> str:
    """Generates a response from the AI."""
    model = genai.GenerativeModel('gemini-1.5-flash')

    # RAG: Retrieve knowledge
    retrieved_knowledge = get_knowledge(user_prompt)

    # RAG: Augment the prompt
    augmented_prompt = f"""
    System Instruction: You are a helpful AI assistant for health-related queries.
    Your responses should be grounded in the provided context.

    Context from Knowledge Base:
    {retrieved_knowledge}

    Conversation History:
    """
    for msg in conversation_history:
        role = "User" if msg.is_user else "Bot"
        augmented_prompt += f"{role}: {msg.text}\n"

    augmented_prompt += f"User: {user_prompt}\nBot:"


    try:
        response = model.generate_content(augmented_prompt)
        return response.text
    except Exception as e:
        print(f"Error generating response: {e}")
        return "I'm sorry, I'm having trouble connecting to the AI service right now."
