import os
import sys
from fastapi import FastAPI
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

# Adjust python sys.path to allow importing from backend app package
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
if parent_dir not in sys.path:
    sys.path.insert(0, parent_dir)

from app.core.config import settings
from app.api.v1.router import api_router
from app.database.session import Base, engine

# Initialize database tables if SQLAlchemy engine is active
if engine is not None:
    Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount API V1 router
app.include_router(api_router, prefix=settings.API_V1_STR)

# Root LUMO static directory
G4F_DEV_DIR = os.path.abspath(os.path.join(parent_dir, "..", "g4f.dev"))

def load_static_html(filename: str) -> str:
    path = os.path.join(G4F_DEV_DIR, filename)
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            return f.read()
    return f"<h1>{settings.PROJECT_NAME}</h1>"

@app.get("/", response_class=HTMLResponse)
@app.get("/index.html", response_class=HTMLResponse)
@app.get("/home.html", response_class=HTMLResponse)
async def serve_home():
    return HTMLResponse(content=load_static_html("home.html"))

@app.get("/login.html", response_class=HTMLResponse)
async def serve_login():
    return HTMLResponse(content=load_static_html("login.html"))

@app.get("/admin-dashboard.html", response_class=HTMLResponse)
async def serve_admin_dashboard():
    return HTMLResponse(content=load_static_html("admin-dashboard.html"))

@app.get("/user-dashboard.html", response_class=HTMLResponse)
async def serve_user_dashboard():
    return HTMLResponse(content=load_static_html("user-dashboard.html"))

@app.get("/chat/", response_class=HTMLResponse)
@app.get("/chat/index.html", response_class=HTMLResponse)
async def serve_chat():
    path = os.path.join("chat", "index.html")
    return HTMLResponse(content=load_static_html(path))

# Mount static distribution directory (/dist)
dist_path = os.path.join(G4F_DEV_DIR, "dist")
if os.path.exists(dist_path):
    app.mount("/dist", StaticFiles(directory=dist_path), name="dist")

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8080))
    uvicorn.run("app.main:app", host="0.0.0.0", port=port, reload=True)
