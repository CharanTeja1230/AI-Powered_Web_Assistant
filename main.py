import os
import json
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, RedirectResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

# Initialize FastAPI App
app = FastAPI(title="LUMO AI Assistant", description="Learning Unified Multimodal Oracle by Charan Teja")

# Add CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load underlying g4f API routes for AI inference
try:
    from g4f.api import create_app
    g4f_app = create_app()
    app.mount("/v1", g4f_app)
    app.mount("/backend-api", g4f_app)
except Exception as e:
    print(f"Loaded g4f API endpoints: {e}")

# Static directory path
G4F_DEV_DIR = os.path.abspath("./g4f.dev")

@app.get("/", response_class=HTMLResponse)
@app.get("/index.html", response_class=HTMLResponse)
@app.get("/home.html", response_class=HTMLResponse)
async def serve_home():
    home_file = os.path.join(G4F_DEV_DIR, "home.html")
    if os.path.isfile(home_file):
        with open(home_file, "r", encoding="utf-8") as f:
            return HTMLResponse(content=f.read())
    return HTMLResponse(content="<h1>Welcome to LUMO AI Assistant</h1>")

@app.get("/login.html", response_class=HTMLResponse)
async def serve_login():
    login_file = os.path.join(G4F_DEV_DIR, "login.html")
    if os.path.isfile(login_file):
        with open(login_file, "r", encoding="utf-8") as f:
            return HTMLResponse(content=f.read())
    return RedirectResponse("/")

@app.get("/admin-dashboard.html", response_class=HTMLResponse)
async def serve_admin_dashboard():
    admin_file = os.path.join(G4F_DEV_DIR, "admin-dashboard.html")
    if os.path.isfile(admin_file):
        with open(admin_file, "r", encoding="utf-8") as f:
            return HTMLResponse(content=f.read())
    return RedirectResponse("/")

@app.get("/user-dashboard.html", response_class=HTMLResponse)
async def serve_user_dashboard():
    user_file = os.path.join(G4F_DEV_DIR, "user-dashboard.html")
    if os.path.isfile(user_file):
        with open(user_file, "r", encoding="utf-8") as f:
            return HTMLResponse(content=f.read())
    return RedirectResponse("/")

@app.get("/chat/", response_class=HTMLResponse)
@app.get("/chat/index.html", response_class=HTMLResponse)
async def serve_chat():
    chat_file = os.path.join(G4F_DEV_DIR, "chat", "index.html")
    if os.path.isfile(chat_file):
        with open(chat_file, "r", encoding="utf-8") as f:
            return HTMLResponse(content=f.read())
    return RedirectResponse("/")

# Mount static asset directories (dist, etc.)
if os.path.exists(os.path.join(G4F_DEV_DIR, "dist")):
    app.mount("/dist", StaticFiles(directory=os.path.join(G4F_DEV_DIR, "dist")), name="dist")

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8080))
    uvicorn.run(app, host="0.0.0.0", port=port)
