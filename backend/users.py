from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
import models
from database import SessionLocal
from security import hash_password, verify_password, create_access_token, get_current_user #

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close() #

@router.post("/users")
def create_user(name: str, email: str, password: str, role: str, db: Session = Depends(get_db)):
    # FIX: Check for duplicate email
    if db.query(models.User).filter(models.User.email == email).first():
        raise HTTPException(status_code=400, detail="Email already registered")

    user = models.User(
        name=name,
        email=email,
        password=hash_password(password), #
        role=role
    )
    db.add(user)
    db.commit()
    return {"message": "User created"} #

@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    # Swagger sends email in 'username' field
    user = db.query(models.User).filter(models.User.email == form_data.username).first()

    if not user or not verify_password(form_data.password, user.password): #
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"id": user.id}) #
    return {"access_token": token, "token_type": "bearer"}