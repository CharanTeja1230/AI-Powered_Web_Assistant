# 🌌 LUMO (Learning Unified Multimodal Oracle)

LUMO is an ultra-premium, production-ready AI Assistant platform built with FastAPI, React, TypeScript, Tailwind CSS, and Python.

## Maintainer
**Maintainer**: Charan Teja (`charan.teja@lumo.ai`)

## 🛠️ Tech Stack
- **Backend**: FastAPI, Python 3.11+, Uvicorn, SQLAlchemy, PyJWT, Passlib, Python `g4f` dependency library
- **Frontend**: React, Vite, TypeScript, Tailwind CSS, Glassmorphism Design Tokens, Space Theme Live Canvas
- **Deployment**: Render, Docker, GitHub Actions

## 🚀 Running Locally

### Backend
```bash
cd lumo/backend
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8080 --reload
```

- **LUMO Space Homepage**: `http://localhost:8080/`
- **FastAPI Swagger Docs**: `http://localhost:8080/docs`
- **LUMO Chat Interface**: `http://localhost:8080/chat/`
