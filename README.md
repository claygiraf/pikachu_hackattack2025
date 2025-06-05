# SHEILD AI

## 📚 Table of Contents

- [🧠 Overview](#-overview)
- [🎯 Problem Statement](#-problem-statement)
- [✨ Features](#-features)
- [🧩 Architecture](#-architecture)
- [🐳 Data Utilization](#-data-utilization)
- [🐼Personalization Strategies](#-personalization-strategies)
- [🏗️ Modules](#-modules)
- [🧪 Key Technologies](#-key-technologies)
- [🧠 AI Intelligence](#-ai-intelligence)
- [🎥 Demo](#-demo)
- [🚀 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
  - [Run the App](#run-the-app)
- [🛡️ Safety & Ethics](#-safety--ethics)
- [📂 Directory Structure](#-directory-structure)
- [🧠 Future Improvements](#-future-improvements)
- [🎍 Preliminary Judging](#preliminary-judging)
- [📸 Snapshots](#-snapshots)
- [📚 Citations & References](#-citations--references)


## 🧠 Overview

This project is a **voice-controlled assistant prototype** designed for **Grab driver-partners (DAX)**, enabling **hands-free interactions** with the Grab platform. It empowers drivers with AI support in **noisy, real-world environments**, ensuring both **safety** and **productivity** on the road.

Built for the **UMHackathon 2025**, this solution addresses the *"Economic Empowerment through AI"* theme by allowing DAX users to:
- Navigate efficiently 🚗
- Accept ride requests 🛎️
- Chat with passengers 💬
- Mark passengers as fetched ✅
- Control these features via **voice commands** 🗣️

## 🎯 Problem Statement

Drivers currently rely on manual input or screen-based interfaces, which are unsafe while driving. This assistant solves that by:
- Supporting **voice-first interactions**
- Functioning in **challenging audio conditions**
- Adapting to **regional dialects, accents, and colloquialisms**
- Delivering **real-time transcription and intent detection**
- Providing **audio feedback** in local languages

## ✨ Features

- 🔊 **Noise-Resilient Voice Recorder** with real-time VAD + noise suppression
- 🧠 **Intent Prediction Engine** using language-detect + LLM (Gemma via Ollama)
- 📣 **Multilingual Text-to-Speech (TTS)** with support for English, Malay, and Chinese
- 🎨 Dual-theme GUI (Light & Dark modes)
- 📱 Android-style GUI with stacked pages and custom buttons
- 🔄 Context-aware navigation (back/home/intents)

## 🧩 Architecture
```
Voice Input → [Noise Reduction + VAD] → Whisper Transcription →→
Language Detection → LLM Intent Classification → → UI Navigation / Voice Feedback (Edge-TTS)
```

## 🐳 Data Utilization
Current prototype does not yet implement data integration, however the team had implemented Large Language Models (LLMs) in a way to achieve data utilization for intelligent, real-time data usage.

i. Real-Time Context Awareness  
LLMs can interpret live trip data—such as ride status, location, and traffic patterns—to generate contextually smart responses. For example, Grab driver could say:
```commandline
“Are there any heavy traffic within 1km?”
or
“You’ve just accepted a ride. Want to open navigation now?”
```
ii. 📌 Dynamic Command Handling  
As LLMs are flexible with natural language input, they can handle a wide variety of voice commands without needing pre-set phrases. Drivers can speak naturally with native tones, and the assistant will still understand based on context.

iii. 📊 Driver Behavior Insights  
LLMs can learn from historical driver behavior data to optimize workflow including predicting driver prefers to take breaks or proactively offering to toggle for instance Do Not Disturb when a ride starts.

## 🐼Personalization Strategies
By securely storing and referencing past driver conversations, it can offer deep personalization with LLMs in the loop—adapting responses and actions based on individual usage patterns.

i. Conversational Memory🗣️   
With stored interactions, model can “remember” preferences over time:
```commandline
“You usually prefer Waze for navigation—opening it now.”
or
“Last time you muted the passenger chat while driving—should I do that again?”
```
ii. Tone and Style Adaptation📚  
LLMs can fine-tune the assistant’s voice and tone to match the driver's style whether more casual, efficient or friendly—making the experience feel more natural and human-like.

iii. Custom Workflow Shortcuts🛠️  
By learning from past commands, it can offer personalized shortcuts or automations:
```commandline
“You often accept back-to-back rides want me to auto-accept the next one?”
```
## 🏗️ Modules

| Module | Description |
|--------|-------------|
| `audio_recorder.py` | Handles voice activity detection, noise reduction, and WAV recording |
| `transcription.py` | Uses OpenAI Whisper for speech-to-text |
| `intent_predictor.py` | LLM-based intent classification with multilingual prompt support |
| `tts_engine.py` | Uses Edge TTS for responsive speech synthesis |
| `main_app.py` | PyQt5 GUI with interactive pages and theme switching |

## 🧪 Key Technologies

- `PyQt5` – for GUI components
- `webrtcvad`, `noisereduce`, `sounddevice` – for audio preprocessing
- `whisper` – for transcription
- `langdetect`, `langchain`, `Ollama` – for language & intent modeling
- `pygame`, `edge-tts` – for multilingual TTS

## 🧠 AI Intelligence

- **Zero-Shot Intent Recognition** using `distilbert` (fallback)
- **Multilingual Prompt Templates** for language-specific intent grounding
- **Colloquial Slang & Accent Adaptability** (via LLM prompt tuning)

## 🎥 Demo

A short demo video is included to illustrate:
- Voice interaction workflow
- Intent recognition
- Multilingual feedback
- UI transitions & safety logic

[DAX Assistant Demo Team Pikachu (UM Hackathon 2025)](https://www.youtube.com/watch?v=h32cmeKhhBU)

## 🚀 Getting Started

### Prerequisites

- Python 3.9+
- Ollama

### Setup

download gemma3
```commandline
Ollama run gemma3:latest
```
Install Python Dependencies
```commandline
pip install -r srcs/requirements.txt
```

### Run the App

```bash
python srcs/main_app.py
```

## 🛡️ Safety & Ethics
- Hands-free only: No visual distractions for drivers
- Polite fallback prompts to clarify misheard commands
- Avoids unsafe instructions by design

## 📂 Directory Structure
```
srcs
├── main_app.py               # GUI logic
├── audio_recorder.py         # Audio capture and VAD
├── transcription.py          # Whisper-based STT
├── intent_predictor.py       # LLM-based intent detection
├── tts_engine.py             # Edge-TTS for feedback
└── data/                     # Recorded audio + TTS outputs
```

## 🎍Preliminary Judging 
Below is pikachu team pitch slide

[Click here]


## 🧠 Future Improvements

- Next-Level Noise Reduction with Krisp API

- Switching to Locally trained Malaysian-Centric STT Model

- Adding AI Memory for Context awareness and personalization

## 📸 Snapshots

### 🟢 Normal Mode – Home Dashboard
Voice mode is off, and the driver can interact with the interface using buttons.

![normal mode](snapshots%2Fimg.png)

### 🎤 Voice Mode Activated
The app switches to dark theme when voice mode is active to signal listening state.

![voice mode](snapshots%2Fimg_1.png)

### 🧪 Example Voice Interactions

🧠 The assistant supports multilingual commands (English, Chinese, Malay) and can understand colloquial instructions, returning relevant actions with natural voice feedback.

```commandline
Transcribed [recorded_audio_1.wav]: Can you navigate me to the closest hospital?
[Edge-TTS] Speaking in en: Okay, navigating you to the closest hospital. Just one moment…
(Slight pause – simulating map lookup)
Okay, the closest hospital is Pusat Perubatan Universiti Malaya, approximately 5 kilometers away. I’m sending the route to your navigation system now.
Predicted intent: navigation
```
```
Transcribed [recorded_audio_1.wav]: 跟乘客讲模要到了就要到快点出来等
[Edge-TTS] Speaking in zh-cn: 好的，明白。
“好的，我来帮您跟乘客沟通。您说‘模要到了就要到快点出来等’，我来代替您说：‘乘客，请您尽快出来等待。’ 稍后我会提醒您注意安全。”
Predicted intent: chat_passenger
```
```
Transcribed [recorded_audio_2.wav]: 翻回主界面
[Edge-TTS] Speaking in cn: 好的，没问题。
“好的，正在返回主界面。”
Predicted intent: back
```

## 📚 Citations & References

This project builds upon a wide array of open-source tools, models, and libraries. We gratefully acknowledge the following:

---

- **Gemma** – Google's lightweight LLM (via Ollama)
  > Google. *Gemma: Lightweight Open Models for Responsible AI*. 2024.  
  [arXiv:2403.10600](https://arxiv.org/abs/2403.10600)

- **Whisper** – Multilingual Speech Recognition by OpenAI  
  > Radford et al. *Robust Speech Recognition via Large-Scale Weak Supervision*. 2022.  
  [arXiv:2212.04356](https://arxiv.org/abs/2212.04356)

- **DistilBERT** – Transformer for fallback zero-shot classification  
  > Sanh, V., Debut, L., Chaumond, J., Wolf, T. *DistilBERT, a distilled version of BERT: smaller, faster, cheaper and lighter*. 2019.  
  [arXiv:1910.01108](https://arxiv.org/abs/1910.01108)

- **LangChain** – LLM orchestration framework  
  > Harrison Chase et al. *LangChain: Building Applications with LLMs through Composability*. 2023.  
  [https://github.com/langchain-ai/langchain](https://github.com/langchain-ai/langchain)

- **LangDetect**  
  > Nakatani, Shuyo. *Language Detection Library for Java (ported to Python)*. 2010.  
  [https://github.com/Mimino666/langdetect](https://github.com/Mimino666/langdetect)

- **PyQt5** – Qt GUI framework for Python  
  > Riverbank Computing. *PyQt Documentation*.  
  [https://www.riverbankcomputing.com/software/pyqt/intro](https://www.riverbankcomputing.com/software/pyqt/intro)

- **WebRTC VAD**  
  > Google WebRTC. *Voice Activity Detection (VAD)*.  
  [https://webrtc.org](https://webrtc.org)

- **noisereduce**  
  > Tim Sainburg. *Noise reduction using spectral gating*. 2020.  
  [GitHub](https://github.com/timsainb/noisereduce)

- **SoundDevice**  
  > Matthias Geier. *python-sounddevice: PortAudio bindings for Python*.  
  [https://python-sounddevice.readthedocs.io](https://python-sounddevice.readthedocs.io)

- **Edge-TTS**  
  > Uses Microsoft Edge Neural Voices via unofficial API  
  [GitHub](https://github.com/rany2/edge-tts)

- **Pygame**  
  > Pygame Community. *Pygame – Python Game Development*.  
  [https://www.pygame.org](https://www.pygame.org)

- **SciPy & NumPy**  
  > Virtanen, P. et al. *SciPy 1.0: Fundamental Algorithms for Scientific Computing in Python*. 2020.  
  [Nature Methods, 17, 261–272](https://www.nature.com/articles/s41592-019-0686-2)

---
