# HealthyGambia AI - NCD Prevention Chatbot

This repository contains the source code for the **HealthyGambia AI** project, an entry for the **GenAI for Good Challenge**.

Our objective is to build a generative AI-powered, multilingual chatbot to support the prevention and management of non-communicable diseases (NCDs) in The Gambia. The solution is designed to be accessible via Web, SMS, and WhatsApp, ensuring it reaches even low-tech environments.

For a deep dive into our technical approach, please see our **[Technical Blueprint](./TECHNICAL_BLUEPRINT.md)**.

---

## Guiding Principles

-   **Evidence-Based:** All health guidance is grounded in authoritative sources from the WHO and The Gambia's Ministry of Health.
-   **Accessibility First:** The solution is designed for multilingual support and multi-channel delivery (Web, SMS, WhatsApp).
-   **Responsible AI:** We prioritize user privacy, data security, and transparent, reliable AI behavior through a Retrieval-Augmented Generation (RAG) pipeline.
-   **Open Source:** The project is fully open-source to encourage collaboration, transparency, and scalability.

---

## Key Features

-   **Multilingual Support:** English, Mandinka, Wolof, and Fula.
-   **Personalized Risk Assessment:** A structured questionnaire to provide tailored health feedback.
-   **Evidence-Based Guidance:** AI responses are grounded in a curated knowledge base of WHO and national health guidelines.
-   **Text-to-Speech (TTS):** An accessibility feature to have messages read aloud.
-   **Multi-Channel Ready:** Backend architecture supports Web, SMS, and WhatsApp.
-   **Pilot Analytics:** A summary screen to visualize the potential impact of the pilot.

---

## Tech Stack

-   **Frontend:** React (TypeScript), Tailwind CSS
-   **Backend:** Python, FastAPI, SQLModel (for database interaction)
-   **AI:** Google Gemini API (for conversation and TTS)
-   **Database:** PostgreSQL (managed via SQLModel)
-   **Deployment:** Docker

---

## Deployment with Docker

The backend application is containerized for easy and consistent deployment.

### Prerequisites

-   Docker installed on your machine.
-   A `.env` file in the `backend/` directory with your `API_KEY`.

### Build the Docker Image

Navigate to the project's root directory and run:

```bash
docker build -t healthygambia-ai-backend -f backend/Dockerfile .
```

### Run the Docker Container

Once the image is built, run it with:

```bash
docker run -d -p 8000:8000 --env-file backend/.env healthygambia-ai-backend
```

The API will be accessible at `http://localhost:8000`.

---

## Project Alignment

This project is developed in alignment with:
-   The **WHO–ITU “Be He@lthy, Be Mobile” initiative**.
-   **The Gambia’s National Digital Health Investment Case**.

It is a collaborative effort aimed at leveraging generative AI to create a tangible, positive impact on community health in The Gambia.
