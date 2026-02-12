from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from database import SessionLocal
import models
from security import get_current_user

router = APIRouter()

def get_db():
    db = SessionLocal()
    try: yield db
    finally: db.close()

@router.post("/doubts")
def ask_doubt(title: str, content: str, subject: str, 
              anonymous: bool = False, db: Session = Depends(get_db),
                current_user: models.User = Depends(get_current_user)):
    new_doubt = models.Doubt(title=title, content=content, subject=subject.lower(), is_anonymous=anonymous, student_id=current_user.id)
    db.add(new_doubt)
    db.commit()
    return {"message": "Doubt posted"}

@router.get("/doubts")
def view_doubts(subject: str = None, db: Session = Depends(get_db)):
    query = db.query(models.Doubt).options(joinedload(models.Doubt.replies))
    if subject:
        query = query.filter(models.Doubt.subject == subject.lower())
    
    doubts = query.all()
    result = []
    for d in doubts:
        result.append({
            "id": d.id,
            "title": d.title,
            "content": d.content,
            "subject": d.subject,
            "student_id": "Hidden" if d.is_anonymous else d.student_id,
            "replies": [{"content": r.content, "user_id": r.user_id} for r in d.replies]
        })
    return result

@router.post("/doubts/{doubt_id}/reply")
def reply_doubt(doubt_id: int, content: str,
                 db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    new_reply = models.Reply(content=content, doubt_id=doubt_id, user_id=current_user.id)
    db.add(new_reply)
    db.commit()
    return {"message": "Reply added"}