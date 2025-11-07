# HealthyGambia AI - Technical Blueprint & Architecture

**Version:** 1.0
**Date:** October 16, 2025
**Project:** GenAI for Good Challenge - NCD Prevention Chatbot (The Gambia)

---

## 1. Project Overview & Objective

This document outlines the technical architecture for **HealthyGambia AI**, a generative AI-powered, multilingual chatbot designed to support the prevention and management of non-communicable diseases (NCDs) in The Gambia.

The primary objective is to create a responsible, scalable, and accessible health tool that integrates authoritative medical knowledge with a user-friendly conversational interface. The system is designed to operate effectively in low-tech environments and align with The Gambia's national health strategy and the WHO-ITU "Be He@lthy, Be Mobile" initiative.

## 2. System Architecture

The system is designed with a modern, decoupled architecture, separating the frontend user interface from the backend logic and AI services. This ensures scalability, maintainability, and the ability to support multiple user-facing channels.

![High-Level Architecture](./architecture.svg)

### 2.1. Core Components

1.  **Frontend (Web UI):** A responsive web application built with **React (TypeScript)** and styled with **Tailwind CSS**. It serves as the primary interface for the prototype, showcasing the full user journey from language selection to the pilot summary.

2.  **Backend (API Server):** A robust API server built with **Python (FastAPI)**. It is the central nervous system of the application, responsible for:
    *   Managing user sessions and conversations.
    *   Handling business logic for the NCD risk assessment.
    *   Interacting with the database.
    *   Orchestrating calls to the AI service and knowledge base.

3.  **Database:** A **PostgreSQL** database managed via **SQLModel**. It stores all persistent data, including:
    *   `Conversation`: Tracks a single user's assessment journey.
    *   `Message`: Stores each user and bot message, linked to a conversation.
    *   (Future) `Feedback`, `AnalyticsEvents`.

4.  **Knowledge Base:** A curated collection of **structured JSON files** derived from authoritative sources (WHO Handbooks, Gambian National Guidelines). This is a read-only data store that serves as the "ground truth" for the AI.

5.  **AI Service:** A dedicated Python module that encapsulates all interactions with the **Google Gemini API**. This service is responsible for constructing prompts, calling the AI model, and processing the responses.

6.  **Multi-Channel Webhooks:** Dedicated API endpoints (`/sms/webhook`, `/whatsapp/webhook`) designed to receive and process incoming messages from low-tech channels via services like Twilio.

## 3. Data Flow & AI Pipeline

Our architecture is built around a **Retrieval-Augmented Generation (RAG)** pipeline to ensure all AI-generated advice is evidence-based, safe, and relevant.

**Step-by-Step Data Flow:**

1.  **User Interaction:** A user sends a message to the chatbot via the Web UI, SMS, or WhatsApp.
2.  **Request Reception:** The FastAPI backend receives the request at the appropriate endpoint (`/chat` or a webhook).
3.  **CRUD Operation (Save):** The user's message is saved to the database, associated with their current conversation.
4.  **Context Retrieval (Database):** The backend retrieves the recent history of the conversation from the database.
5.  **Knowledge Retrieval (RAG - Step 1):** The user's message and conversation context are used to perform a search against our **Knowledge Base**. This step finds the most relevant facts, guidelines, or pre-approved messages (e.g., finding hypertension advice when the user mentions blood pressure).
6.  **Prompt Augmentation (RAG - Step 2):** A detailed prompt is constructed for the Gemini API. This prompt includes:
    *   The **System Instruction** (defining the AI's persona).
    *   The **Conversation History**.
    *   The **Retrieved Knowledge Base Context** (the "augmented" part).
    *   The user's latest **Message**.
7.  **AI Generation (RAG - Step 3):** The augmented prompt is sent to the Gemini API via our **AI Service**. The model generates a response that is grounded in the specific, authoritative context provided.
8.  **Response Processing & Saving:** The AI's response is received by the backend, saved to the database, and formatted for the appropriate channel.
9.  **Response Delivery:** The final response is sent back to the user's device.

## 4. Knowledge Base Structure

The knowledge base is the foundation of our responsible AI strategy. Data extracted from the provided resources will be structured into clear, queryable JSON files.

**Example Schema (`hypertension_guidelines.json`):**

```json
[
  {
    "id": "HYP-001",
    "category": "Diet",
    "topic": "Salt Reduction",
    "guideline": "Reducing daily salt intake to less than 5 grams (about one teaspoon) can significantly lower blood pressure.",
    "keywords": ["salt", "sodium", "diet", "food", "hypertension"],
    "source": "WHO Guideline on Sodium Intake for Adults and Children"
  },
  {
    "id": "HYP-002",
    "category": "Physical Activity",
    "topic": "Regular Exercise",
    "guideline": "Aim for at least 150 minutes of moderate-intensity aerobic activity, such as brisk walking, each week.",
    "keywords": ["exercise", "activity", "walking", "fitness", "hypertension"],
    "source": "WHO Global Recommendations on Physical Activity for Health"
  }
]
```

This structure allows our `KnowledgeBase` service to perform efficient keyword-based searches to find the most relevant context for the RAG pipeline.

## 5. Prototype Deployment Plan

The project will be deployed in four distinct phases:

-   **Phase 1: Core Prototype:** Develop the full-featured, web-first prototype with a functional backend API that includes database persistence and live AI integration.
-   **Phase 2: AI & Knowledge Base Integration:** Construct the full knowledge base from the provided resources and implement the RAG pipeline to ensure evidence-based responses.
-   **Phase 3: Multilingual & Multi-Channel Support:** Implement the webhook handlers for SMS/WhatsApp and explore the Text-to-Speech stretch goal to maximize accessibility.
-   **Phase 4: Pilot Deployment & Analytics:** Prepare the application for deployment in the GENIE.AI sandbox, connect the analytics dashboard to live data, and conduct a pilot with local health partners.

This phased approach allows for iterative development, testing, and validation at each stage, ensuring a robust and impactful final product.
