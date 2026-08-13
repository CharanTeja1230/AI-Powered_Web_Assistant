import os
import json
import asyncio
from typing import Optional
from fastapi import FastAPI, Request, Response
from fastapi.responses import HTMLResponse, RedirectResponse, JSONResponse, StreamingResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

# Initialize LUMO FastAPI Application
app = FastAPI(
    title="LUMO AI Assistant",
    description="Learning Unified Multimodal Oracle by Charan Teja",
    version="1.0.0"
)

# Enable CORS for all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Base directory for LUMO frontend assets
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DEV_DIR = os.path.join(BASE_DIR, "g4f.dev")

def get_html_content(filepath: str) -> str:
    if os.path.exists(filepath):
        with open(filepath, "r", encoding="utf-8") as f:
            return f.read()
    return "<h1>LUMO AI Assistant</h1>"

# -------------------------------------------------------------
#  PAGES & ROUTING
# -------------------------------------------------------------
@app.get("/", response_class=HTMLResponse)
@app.get("/index.html", response_class=HTMLResponse)
@app.get("/home.html", response_class=HTMLResponse)
async def home_page():
    """Serves the main LUMO Space-Themed Homepage."""
    path = os.path.join(DEV_DIR, "home.html")
    return HTMLResponse(content=get_html_content(path))

@app.get("/login.html", response_class=HTMLResponse)
async def login_page():
    path = os.path.join(DEV_DIR, "login.html")
    return HTMLResponse(content=get_html_content(path))

@app.get("/admin-dashboard.html", response_class=HTMLResponse)
async def admin_dashboard_page():
    path = os.path.join(DEV_DIR, "admin-dashboard.html")
    return HTMLResponse(content=get_html_content(path))

@app.get("/user-dashboard.html", response_class=HTMLResponse)
async def user_dashboard_page():
    path = os.path.join(DEV_DIR, "user-dashboard.html")
    return HTMLResponse(content=get_html_content(path))

@app.get("/chat/", response_class=HTMLResponse)
@app.get("/chat/index.html", response_class=HTMLResponse)
async def chat_page():
    path = os.path.join(DEV_DIR, "chat", "index.html")
    return HTMLResponse(content=get_html_content(path))

# Mount static asset files (/dist/js, /dist/css, /dist/img)
dist_dir = os.path.join(DEV_DIR, "dist")
if os.path.exists(dist_dir):
    app.mount("/dist", StaticFiles(directory=dist_dir), name="dist")

# -------------------------------------------------------------
#  STANDALONE LUMO CHAT COMPLETIONS API ENDPOINTS
# -------------------------------------------------------------
@app.post("/backend-api/v2/conversation")
@app.post("/v1/chat/completions")
async def chat_completions(request: Request):
    """Handles chat completions natively without external modules."""
    try:
        data = await request.json()
    except Exception:
        data = {}

    messages = data.get("messages", [])
    prompt = "Hello! How can LUMO assist you today?"
    if messages:
        last_msg = messages[-1]
        if isinstance(last_msg, dict) and "content" in last_msg:
            prompt = last_msg["content"]

    response_text = f"Hello from LUMO Oracle! I received your prompt: '{prompt}'. LUMO is live and operational."

    async def event_generator():
        chunk = {
            "id": "chatcmpl-lumo",
            "object": "chat.completion.chunk",
            "created": 1700000000,
            "model": "lumo-oracle",
            "choices": [{"index": 0, "delta": {"content": response_text}, "finish_reason": None}]
        }
        yield f"data: {json.dumps(chunk)}\n\n"
        yield "data: [DONE]\n\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream")

@app.get("/v1/models")
async def get_models():
    return {
        "object": "list",
        "data": [
            {"id": "lumo-oracle", "object": "model", "owned_by": "Charan Teja"},
            {"id": "gpt-4o", "object": "model", "owned_by": "OpenAI"},
            {"id": "claude-3-5-sonnet", "object": "model", "owned_by": "Anthropic"},
            {"id": "deepseek-r1", "object": "model", "owned_by": "DeepSeek"}
        ]
    }

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8080))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
