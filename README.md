# 🪐 LUMO – AI Chat Interface

[![Live Demo](https://img.shields.io/badge/Live_Demo-https%3A%2F%2Flumo--ai--assistant.onrender.com-00f3ff.svg?style=for-the-badge&logo=render)](https://lumo-ai-assistant.onrender.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-purple.svg)](LICENSE)
[![Maintainer: Charan](https://img.shields.io/badge/Maintainer-Charan-a855f7.svg)](#credits)

<p align="center">
  <strong style="font-size: 1.4rem;">Designed, Developed & Maintained by Charan</strong><br>
  <em>Creative developer, AI Engineer & Software Engineer | Hyderabad, Telangana, India</em><br>
  🚀 <strong>Live Production Deployment</strong>: <a href="https://lumo-ai-assistant.onrender.com" target="_blank">https://lumo-ai-assistant.onrender.com</a>
</p>

---

## 🌐 Live Production Application

- 🌐 **Live Website**: [https://lumo-ai-assistant.onrender.com](https://lumo-ai-assistant.onrender.com)
- 💬 **Live Chat Interface**: [https://lumo-ai-assistant.onrender.com/chat/](https://lumo-ai-assistant.onrender.com/chat/)
- 🔑 **Login Portal**: [https://lumo-ai-assistant.onrender.com/login.html](https://lumo-ai-assistant.onrender.com/login.html)
- 🛡️ **Admin Console**: [https://lumo-ai-assistant.onrender.com/admin-dashboard.html](https://lumo-ai-assistant.onrender.com/admin-dashboard.html)

---

## 📌 Project Overview & Purpose

**LUMO** is a state-of-the-art, high-performance AI Chat & Multimodal Assistant web platform built for seamless interaction, role-based access, and modern aesthetic elegance. Developed using **FastAPI**, **Uvicorn**, **Python**, and custom **Liquid Glass UI** design systems, LUMO delivers real-time streaming AI capabilities wrapped in a premium visual experience.

Key highlights of the platform include:
- **Live Animated Space Wallpaper Engine**: Hardware-accelerated Canvas background with floating astronaut silhouettes, Earth and gas giant planets, twinkling stars, satellites, and shooting comet trails.
- **Dual-Theme Support**: Instant switching between **Dark Mode** (Deep midnight cosmic indigo `#040408` with electric neon accents) and **Light Mode** (Airy pastel gradient with soft lavender glows).
- **Role-Based Authentication & Dashboards**:
  - **Admin Management Console**: Real-time live telemetry metrics, system configuration, and user directory.
  - **User Workspace**: Profile status, Pro tier badges, and personal settings.
  - **High-Visibility Guest Mode**: Single-click access to a simplified chat interface without login requirements.
- **Slim Frosted Glass Sidebar (72px)**: Smooth collapsible vertical navigation bar with vertically centered buttons, soft violet-blue hover glows, and 100% "LUMO" branding.

---

## 🛠️ Tech Stack & Architecture

- **Backend**: Python 3.10+, FastAPI, Uvicorn, AsyncIO, REST API & Streaming Telemetry
- **Frontend**: Vanilla HTML5, Advanced CSS3 (Liquid Glass, Backdrop Blur, Dynamic Tokens), JavaScript (ES6+), HTML5 Canvas 2D Engine
- **Development & IDE**: Antigravity IDE
- **Deployment**: Render, Vercel, Docker

---

## ✨ Features & Key Contributions

1. **Space-Themed Live Background**: Dynamic 60 FPS live canvas rendering twinkling stars, drifting satellites, rotating planets, vector astronaut suit, and comets.
2. **Pure Liquid Glass Aesthetic**: Semi-transparent frosted glass panels (`backdrop-filter: blur(...)`) ensuring maximum legibility while showcasing background canvas animations.
3. **Role-Based Security Guards**: Route protection for Admin, User, and Guest sessions with instant login/logout token purging.
4. **Clean UI & Zero Overlapping**: Fluid responsive layout with auto-resizing viewports and high-contrast typography.

---

## 🚀 Deployment Instructions

### 1. Deploy on Render (Recommended)

LUMO is configured out-of-the-box for seamless one-click web service deployment on **Render**:

1. Log in to [Render.com](https://render.com) using your GitHub account.
2. Click **New +** ➔ **Web Service**.
3. Select your repository: `CharanTeja1230/AI-Powered_Web_Assistant`.
4. Configure service build settings:
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `python -m lumo --port $PORT`
5. Click **Create Web Service**. Your application will be live instantly on Render!

### 2. Local Environment Setup

To run LUMO locally:

```bash
# 1. Clone repository
git clone https://github.com/CharanTeja1230/AI-Powered_Web_Assistant.git
cd AI-Powered_Web_Assistant

# 2. Install dependencies
pip install -r requirements.txt

# 3. Launch local server
python -m lumo --port 8080
```

Access the local server at:
- **Homepage**: `http://localhost:8080/home.html`
- **Login Portal**: `http://localhost:8080/login.html`
- **Chat Interface**: `http://localhost:8080/chat/`
- **Admin Dashboard**: `http://localhost:8080/admin-dashboard.html`
- **User Dashboard**: `http://localhost:8080/user-dashboard.html`

### 3. Docker Deployment

```bash
docker build -t lumo-ai-assistant .
docker run -p 8080:8080 lumo-ai-assistant
```

---

## 👨‍💻 Credits & Project Ownership

- **Lead Developer & Maintainer**: **Charan**
- **Role**: Creative developer, AI Engineer & Software Engineer
- **Location**: Hyderabad, Telangana, India
- **Project**: LUMO – AI Chat Interface
- **Repository**: [https://github.com/CharanTeja1230/AI-Powered_Web_Assistant.git](https://github.com/CharanTeja1230/AI-Powered_Web_Assistant.git)

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Copyright (c) 2026 **Charan**. All Rights Reserved.
