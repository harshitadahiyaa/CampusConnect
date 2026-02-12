from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
import models
from security import get_current_user

router = APIRouter()

def get_db():
    db = SessionLocal()
    try: yield db
    finally: db.close()

# 1. PROFESSOR MARKS ATTENDANCE (Same as before)
@router.post("/attendance/mark")
def mark_attendance(student_id: int, subject: str, status: str, date: str, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    if current_user.role != "professor":
        raise HTTPException(status_code=403, detail="Only professors can mark attendance")
    
    new_entry = models.Attendance(student_id=student_id, subject=subject.lower(), status=status.capitalize(), date=date)
    db.add(new_entry)
    db.commit()
    return {"message": "Attendance marked successfully"}

# 2. STUDENT VIEWS STATS & PERCENTAGE
@router.get("/attendance/stats")
def get_attendance_stats(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    # Saare records fetch karo student ke liye
    records = db.query(models.Attendance).filter(models.Attendance.student_id == current_user.id).all()
    
    if not records:
        return {"total_classes": 0, "present_count": 0, "percentage": 0, "message": "No records found"}

    total_classes = len(records)
    present_count = len([r for r in records if r.status == "Present"])
    
    # Simple percentage formula
    percentage = (present_count / total_classes) * 100

    return {
        "total_classes": total_classes,
        "present_count": present_count,
        "absent_count": total_classes - present_count,
        "percentage": round(percentage, 2),
        "status_color": "green" if percentage >= 75 else "red", # 75% Criteria check
        "records": [
            {"subject": r.subject, "date": r.date, "status": r.status} for r in records
        ]
    }