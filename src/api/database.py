from pydantic import BaseModel
from typing import List
from dotenv import load_dotenv
from sqlalchemy import create_engine, Column, Integer, String, DateTime, ForeignKey, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
import os

SQLALCHEMY_DATABASE_URL = "sqlite:///./sql_app.db"

engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
session_local = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class Users(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, index=True)
    user_mail = Column(String, unique=True, index=True)
    user_name = Column(String)
    user_pass = Column(String)
    is_admin = Column(Boolean, default=False)
    disabled = Column(Boolean, default=False)

    brags = relationship("Brags", back_populates="user")

class Brags(Base):
    __tablename__ = "brags"

    brag_id = Column(Integer, primary_key=True, index=True)
    brag_name = Column(String)
    brag_desc = Column(String)
    brag_designation = Column(String)
    brag_tags = Column(String)
    brag_img = Column(String)
    brag_start_date = Column(String)
    brag_end_date = Column(String)
    created_time = Column(DateTime)
    updated_time = Column(DateTime)
    is_soft_deleted = Column(Boolean, default=False)
    brag_prev = Column(Integer, ForeignKey("brags.brag_id"), nullable=True)
    brag_next = Column(Integer, ForeignKey("brags.brag_id"), nullable=True)
    users = Column(Integer, ForeignKey("users.user_id"))

    user = relationship("Users", back_populates="brags")
    prev_brag = relationship("Brags", foreign_keys=[brag_prev], remote_side=[brag_id], uselist=False)
    next_brag = relationship("Brags", foreign_keys=[brag_next], remote_side=[brag_id], uselist=False)

load_dotenv()

def get_db():
    db = session_local()
    try:
        yield db
    finally:
        db.close()

try:
    connection_url = os.getenv('database_url')
    if connection_url:
        engine = create_engine(connection_url)
        session_local = sessionmaker(autoflush=False, autocommit=False, bind=engine)
except Exception as e:
    print(f"Error setting up database connection: {e}")

try:
    Base.metadata.create_all(bind=engine)
except Exception as e:
    print(f"Error creating database tables: {e}")