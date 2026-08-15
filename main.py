import os
import sys
import json
import asyncio
from typing import AsyncGenerator
from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import HTMLResponse, StreamingResponse, JSONResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import g4f

# Initialize LUMO FastAPI Application
app = FastAPI(
    title="LUMO - AI Assistant",
    description="Learning Unified Multimodal Oracle Platform by Charan",
    version="1.0.0"
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root Web Directory Path
G4F_DEV_DIR = os.path.join(os.path.dirname(__file__), "g4f.dev")

# Serve Static Assets (/dist)
if os.path.exists(os.path.join(G4F_DEV_DIR, "dist")):
    app.mount("/dist", StaticFiles(directory=os.path.join(G4F_DEV_DIR, "dist")), name="dist")

# Page Routes for LUMO Web UI
@app.get("/", response_class=HTMLResponse)
async def read_root():
    home_file = os.path.join(G4F_DEV_DIR, "home.html")
    if os.path.exists(home_file):
        return FileResponse(home_file)
    return HTMLResponse("<h1>LUMO AI Assistant Platform Live</h1>")

@app.get("/home.html", response_class=HTMLResponse)
async def read_home():
    return FileResponse(os.path.join(G4F_DEV_DIR, "home.html"))

@app.get("/login.html", response_class=HTMLResponse)
async def read_login():
    return FileResponse(os.path.join(G4F_DEV_DIR, "login.html"))

@app.get("/admin-dashboard.html", response_class=HTMLResponse)
async def read_admin():
    return FileResponse(os.path.join(G4F_DEV_DIR, "admin-dashboard.html"))

@app.get("/user-dashboard.html", response_class=HTMLResponse)
async def read_user_dashboard():
    return FileResponse(os.path.join(G4F_DEV_DIR, "user-dashboard.html"))

@app.get("/members.html", response_class=HTMLResponse)
async def read_members():
    return FileResponse(os.path.join(G4F_DEV_DIR, "members.html"))

@app.get("/chat/", response_class=HTMLResponse)
@app.get("/chat/index.html", response_class=HTMLResponse)
async def read_chat():
    return FileResponse(os.path.join(G4F_DEV_DIR, "chat", "index.html"))

# Health & Telemetry Routes
@app.get("/api/health")
async def health_check():
    return {"status": "ok", "app": "LUMO AI Assistant", "maintainer": "Charan", "version": "1.0.0"}

# Streaming AI API Route powered by g4f python library
@app.post("/v1/chat/completions")
@app.post("/backend-api/v2/conversation")
async def chat_completions(request: Request):
    try:
        body = await request.json()
        messages = body.get("messages", [])
        model = body.get("model", "gpt-4o")
        stream = body.get("stream", True)

        if not messages:
            messages = [{"role": "user", "content": body.get("prompt", "Hello")}]

        def generate_stream():
            try:
                response = g4f.ChatCompletion.create(
                    model=model,
                    messages=messages,
                    stream=True
                )
                for chunk in response:
                    if chunk:
                        yield f"data: {json.dumps({'choices': [{'delta': {'content': chunk}}]})}\n\n"
                yield "data: [DONE]\n\n"
            except Exception as e:
                yield f"data: {json.dumps({'error': str(e)})}\n\n"

        if stream:
            return StreamingResponse(generate_stream(), media_type="text/event-stream")
        else:
            response = g4f.ChatCompletion.create(model=model, messages=messages, stream=False)
            return JSONResponse({"choices": [{"message": {"role": "assistant", "content": str(response)}}]})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8080))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
