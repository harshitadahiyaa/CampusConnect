from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
import models
from security import get_current_user

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ======================
# CREATE ANNOUNCEMENT
# professor + CR only
# ======================
@router.post("/announcement")
def create_announcement(
    title: str,
    content: str,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):

    if current_user.role not in ["professor", "cr"]:
        raise HTTPException(status_code=403, detail="Not allowed")

    ann = models.Announcement(
        title=title,
        content=content,
        created_by=current_user.id
    )

    db.add(ann)
    db.commit()
    db.refresh(ann)

    return {"message": "Announcement created"}


# ======================
# GET ANNOUNCEMENTS
# everyone
# ======================
@router.get("/announcement")
def get_announcements(db: Session = Depends(get_db)):
    return db.query(models.Announcement).all()