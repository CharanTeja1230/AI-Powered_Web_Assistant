import os
from typing import List
from pydantic import BaseModel

class Settings(BaseModel):
    PROJECT_NAME: str = "LUMO - Learning Unified Multimodal Oracle"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    AUTHOR: str = "Charan Teja"
    
    SECRET_KEY: str = os.getenv("SECRET_KEY", "lumo-super-secret-production-key-charan-teja-2026")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./lumo.db")
    CORS_ORIGINS: List[str] = ["*"]

settings = Settings()
