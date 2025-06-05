# Shield AI🛡️

## 📚 Table of Contents

- [🧠 Overview](#-overview)
- [🎯 Problem Statement](#-problem-statement)
- [✨ Features](#-features)
- [🧩 Architecture](#-architecture)
- [🐳 Data Utilization & AI](#-data-utilization--ai)
- [🏗️ Modules](#-modules)
- [🎥 Demo](#-demo)
- [🚀 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
  - [Run the App](#run-the-app)
- [🐲 Safety & Ethics](#safety--ethics)
- [📂 Directory Structure](#-directory-structure)
- [🧠 Future Improvements](#-future-improvements)
- [📸 Snapshots](#-snapshots)
- [📚 References](#-references)


## 🧠 Overview

Shield AI is an **AI-powered cybersecurity system prototype** designed to assist security analysts and IT teams. It enables **faster, more intelligent threat detection and response** through a user-friendly interface and AI-driven insights. This project aims to enhance security posture by leveraging Genkit and Large Language Models.

## 🎯 Problem Statement

Modern cyber threats are increasing in volume and sophistication, often overwhelming security teams. Shield AI addresses this by:
- Providing **AI-assisted analysis** of threat data.
- Offering **intelligent response suggestions** for security incidents.
- Centralizing threat information and logs for **efficient management**.
- Reducing manual effort and time-to-response for security analysts.

## ✨ Features

- 📊 **Interactive Dashboard**: Visualizes system status, active threats, security scores, and trends.
- 💧 **Data Lake (Threat Intelligence Aggregation)**: Central hub for users to input and get AI-powered summaries, risk assessments, and recommendations from aggregated cybersecurity data.
- 🤖 **Real-time Defense (AI-Powered)**: Enables review of detected anomalies and uses AI (Genkit flow) to generate comprehensive response strategies.
- ⚙️ **Alert Configuration**: Allows users to define custom thresholds and settings for triggering security alerts.
- 🛡️ **Data Protection**: Implements secure protocols for handling sensitive cybersecurity data. (Note: Not GDPR-compliant yet).
- 📜 **Historical Threat Logs**: Maintains a manageable log of resolved and ongoing risks with notes, facilitating quick diagnosis for recurrences.


## 🧩 Architecture

Shield AI follows modern web application architecture:

1.  **Frontend (User Interface)**:
    *   Built with Next.js (App Router), React, TypeScript.
    *   Styled with ShadCN UI components and Tailwind CSS.
    *   Hosted on Firebase App Hosting.
    *   Key Pages: Dashboard, Data Lake, Real-time Defense, Alert Configuration, Threat Logs.
2.  **Backend Logic (Next.js Server)**:
    *   Utilizes Next.js Server Components and Server Actions for server-side rendering and data mutations.
    *   Handles API requests from the frontend.
3.  **AI Orchestration (Genkit)**:
    *   Manages AI workflows defined in `src/ai/flows/`.
    *   Interfaces with AI models for tasks like summarization and suggestion.
4.  **AI Models (Google Gemini)**:
    *   Leverages large language models for natural language understanding, text generation, and structured data output.
5.  **Data Flow (Example: Data Lake Analysis)**:
    *   User inputs data on Data Lake Page (UI) → Next.js Server Action → `summarizeThreatData` Genkit Flow → Google Gemini Model → Genkit Flow returns results → Next.js Server Action updates UI.

## 🐳 Data Utilization & AI
Shield AI leverages Genkit and Google Gemini for its intelligent features:

- **Threat Data Summarization (`summarizeThreatData` flow)**:
    -   Processes aggregated cybersecurity data (logs, alerts).
    -   Generates a concise summary.
    -   Assesses the risk level (low, medium, high, critical).
    -   Provides actionable recommendations.
- **Response Suggestion (`suggestResponse` flow)**:
    -   Takes details of a detected threat/anomaly as input.
    -   Suggests a detailed remediation strategy.
    -   Estimates the impact of the strategy.
    -   Lists required resources.
    -   Proposes a communication plan.
- **Threat Briefing Generation (`generateThreatBriefing` flow)**:
    -   (Conceptual) Can generate comprehensive threat landscape briefings from provided data.
  

## 🏗️ Modules

| Component/Module                 | Description                                                                    |
|----------------------------------|--------------------------------------------------------------------------------|
| `src/app/(pages)/page.tsx`       | Individual page components for UI (Dashboard, Data Lake, etc.)                 |
| `src/components/AppLayout.tsx`   | Main application shell, sidebar navigation, and overall page structure.          |
| `src/ai/genkit.ts`               | Initializes and configures the Genkit AI framework with necessary plugins.     |
| `src/ai/flows/*.ts`              | Defines specific AI-powered workflows (e.g., summarizing data, suggesting responses). Each flow orchestrates calls to LLMs with defined inputs/outputs. |
| `src/app/globals.css`            | Defines the global styling and ShadCN UI theme variables for the application.  |
| `next.config.ts`                 | Configuration file for the Next.js framework.                                  |
| `package.json`                   | Lists project dependencies and defines scripts for running/building the app.   |


## 🧪 Key Technologies

- **Frontend**: Next.js, React, TypeScript, ShadCN UI, Tailwind CSS, Recharts, Lucide React
- **Backend/Server Logic**: Next.js (Server Actions, Server Components)
- **AI Orchestration**: Genkit
- **AI Models**: Google Gemini (via `@genkit-ai/googleai`)
- **Hosting**: Firebase App Hosting
- **Styling/UI**: Inter Font, Minimalist Icons (Lucide)
- **Theme Colors**:
    -   Primary: Deep Blue (`#3F51B5`)
    -   Background: Light Gray (`#ECEFF1`)
    -   Accent: Teal (`#009688`)


## 🎥 Demo

A short demo video to guide through Shield AI:

[(shieldai_pikachu)](https:

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or newer recommended)
- npm or yarn
- Firebase CLI (for deployment, optional for local dev)

### Setup

1.  **Clone the repository (if applicable) or use the Firebase Studio environment.**
2.  **Install dependencies:**
    ```bash
    npm install
    ```
    or
    ```bash
    yarn install
    ```
3.  **Environment Variables:**
    *   Create a `.env` file in the root of the project.
    *   Add any necessary environment variables, especially `GOOGLE_API_KEY` for Genkit to access Google AI Studio models:
        ```env
        GOOGLE_API_KEY=your_google_ai_studio_api_key
        ```
4.  **Initialize Genkit (if running locally for development without Firebase emulators for Genkit):**
    *   Genkit flows are typically started with a development server. Check `package.json` for scripts like `genkit:dev` or `genkit:watch`.
    *   Run in a separate terminal:
        ```bash
        npm run genkit:dev

### Run the App

```bash
npm run dev
```
The application should now be running, typically on `http://localhost:9002`.


## 🐲 Safety & Ethics

- **AI as Assistant**: AI-generated suggestions are intended for review and validation by security professionals, not as fully autonomous actions in the current prototype.
- **Data Security**: Focus on secure handling of sensitive data (though GDPR compliance is a future goal).
- **User Control**: Users maintain control over configurations and final actions based on AI recommendations.

## 📂 Directory Structure
```
shield-ai/
├── src/
│   ├── app/                  # Next.js App Router: Pages and layouts
│   │   ├── (page-name)/page.tsx # Individual page components
│   │   ├── layout.tsx        # Root layout
│   │   └── globals.css       # Global styles and ShadCN theme
│   ├── components/           # Reusable React components
│   │   ├── ui/               # ShadCN UI pre-built components
│   │   └── AppLayout.tsx     # Main application shell/sidebar
│   ├── ai/                   # Genkit AI related files
│   │   ├── flows/            # Genkit flow definitions (e.g., summarize-threat-data.ts)
│   │   ├── genkit.ts         # Genkit initialization
│   │   └── dev.ts            # Genkit development server entry point
│   ├── lib/                  # Utility functions (e.g., cn.ts)
│   └── hooks/                # Custom React hooks (e.g., use-toast.ts)
├── public/                   # Static assets
├── .env                      # Environment variables (Gitignored)
├── next.config.ts            # Next.js configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
├── package.json              # Project dependencies and scripts
└── README.md                 # This file
```


## 🧠 Future Improvements

-   Advanced automated response actions (with strict human oversight).
-   Deeper integration with SIEM/SOAR tools.
-   Achieve GDPR compliance for data handling.
-   More sophisticated and customizable data visualizations.
-   Enhanced AI memory for contextual understanding across sessions.
-   Support for more data sources and automated ingestion.

## 📸 Snapshots


Shield AI provides a clean, modern web interface for interacting with its cybersecurity features. Key views include:
-   **Dashboard**: Overview of security posture with charts and key metrics.
-   **Data Lake**: Interface for inputting raw threat data and receiving AI-driven analysis.
-   **Real-time Defense**: Page to review anomalies and get AI-suggested response plans.
-   **Alert Configuration**: Forms to customize alert thresholds.
-   **Threat Logs**: Table-based view for managing historical incident logs.
The UI uses a consistent theme based on deep blue, light gray, and teal, with a focus on clarity and ease of use.

## 📚 References

This project builds upon a wide array of open-source tools, models, and libraries. 

---

- **Gemma** – Google's lightweight LLM (via Ollama)
  > Google. *Gemma: Lightweight Open Models for Responsible AI*. 2024.  
  [arXiv:2403.10600](https://arxiv.org/abs/2403.10600)




---
