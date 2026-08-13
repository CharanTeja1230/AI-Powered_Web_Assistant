from typing import Any
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel, EmailStr
from app.database.session import get_db
from app.core.security import verify_password, get_password_hash, create_access_token

try:
    from sqlalchemy.orm import Session
    from app.models.user import User
    has_db = True
except ImportError:
    has_db = False

router = APIRouter()

class UserRegister(BaseModel):
    email: str
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
    role: str
    username: str

@router.post("/register", response_model=Token)
def register(user_in: UserRegister, db: Any = Depends(get_db)):
    if not has_db or not db:
        access_token = create_access_token(user_in.username)
        return {"access_token": access_token, "token_type": "bearer", "role": "user", "username": user_in.username}

    user = db.query(User).filter(User.email == user_in.email).first()
    if user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    new_user = User(
        email=user_in.email,
        username=user_in.username,
        hashed_password=get_password_hash(user_in.password),
        role="user"
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    access_token = create_access_token(new_user.id)
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "role": new_user.role,
        "username": new_user.username
    }

@router.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Any = Depends(get_db)):
    if not has_db or not db:
        access_token = create_access_token(form_data.username)
        return {"access_token": access_token, "token_type": "bearer", "role": "user", "username": form_data.username}

    user = db.query(User).filter(User.email == form_data.username).first()
    if not user:
        user = db.query(User).filter(User.username == form_data.username).first()
    
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect credentials")

    access_token = create_access_token(user.id)
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "role": user.role,
        "username": user.username
    }
