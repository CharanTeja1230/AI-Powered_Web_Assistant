import json
import base64
import hashlib
from datetime import datetime, timedelta, timezone
from app.core.config import settings

try:
    from passlib.context import CryptContext
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    def verify_password(plain_password: str, hashed_password: str) -> bool:
        return pwd_context.verify(plain_password, hashed_password)
    def get_password_hash(password: str) -> str:
        return pwd_context.hash(password)
except ImportError:
    def verify_password(plain_password: str, hashed_password: str) -> bool:
        return hashlib.sha256(plain_password.encode()).hexdigest() == hashed_password
    def get_password_hash(password: str) -> str:
        return hashlib.sha256(password.encode()).hexdigest()

try:
    from jose import jwt
    def create_access_token(subject: str, expires_delta: timedelta = None) -> str:
        expire = datetime.now(timezone.utc) + (expires_delta or timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES))
        return jwt.encode({"exp": expire, "sub": str(subject)}, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
except ImportError:
    def create_access_token(subject: str, expires_delta: timedelta = None) -> str:
        payload = {"sub": str(subject), "exp": (datetime.now(timezone.utc) + timedelta(days=7)).timestamp()}
        return base64.urlsafe_b64encode(json.dumps(payload).encode()).decode()
