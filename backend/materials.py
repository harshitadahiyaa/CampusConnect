import os
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from database import SessionLocal
import models
from security import get_current_user

router = APIRouter()
UPLOAD_DIR = "uploads"

def get_db():
    db = SessionLocal()
    try: yield db
    finally: db.close()

@router.post("/materials/upload")
async def upload_material(
    title: str, 
    subject: str,
    file: UploadFile = File(...), 
    db: Session = Depends(get_db), 
    current_user: models.User = Depends(get_current_user)
):
    if current_user.role != "professor":
        raise HTTPException(status_code=403, detail="Only professors can upload")

    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as f:
        f.write(await file.read())

    new_material = models.Material(title=title, subject=subject.lower(), file_path=file_path, uploaded_by=current_user.id)
    db.add(new_material)
    db.commit()
    return {"message": "Uploaded successfully"}

@router.get("/materials")
def list_materials(subject: str = None, db: Session = Depends(get_db)):
    query = db.query(models.Material)
    if subject:
        query = query.filter(models.Material.subject == subject.lower())
    return query.all()