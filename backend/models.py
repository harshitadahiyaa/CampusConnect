from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True)
    password = Column(String)
    role = Column(String)   # professor | cr | student

class Announcement(Base):
    __tablename__ = "announcements"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    content = Column(String)
    created_by = Column(Integer)

class Doubt(Base):
    __tablename__ = "doubts"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    content = Column(String)
    subject = Column(String, index=True) # Filters
    is_anonymous = Column(Boolean, default=False)
    student_id = Column(Integer, ForeignKey("users.id"))
    
    replies = relationship("Reply", back_populates="parent_doubt")

class Reply(Base):
    __tablename__ = "replies"
    id = Column(Integer, primary_key=True, index=True)
    content = Column(String)
    doubt_id = Column(Integer, ForeignKey("doubts.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    parent_doubt = relationship("Doubt", back_populates="replies")

class Material(Base):
    __tablename__ = "materials"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    subject = Column(String, index=True) # Filters
    file_path = Column(String)
    uploaded_by = Column(Integer)