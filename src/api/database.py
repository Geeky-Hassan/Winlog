from pydantic import BaseModel
from typing import List
from dotenv import load_dotenv
from sqlalchemy import Engine,create_engine,Column,UUID,String,Boolean,ForeignKey,Integer,TEXT,DateTime,func
from sqlalchemy.orm import Mapped,mapped_column,session,sessionmaker,DeclarativeBase,Session,relationship
from datetime import datetime

import os

class Base(DeclarativeBase):
    pass
class Users(Base):
    __tablename__ = "users"
    user_id:Mapped[int] = mapped_column(primary_key=True,autoincrement=True)
    user_mail:Mapped[str] = mapped_column(String(30))
    user_name:Mapped[str] = mapped_column(String(30))
    user_pass:Mapped[str] = mapped_column(String(255))
    is_admin: Mapped[bool] = mapped_column(Boolean, default=False)
    disabled: Mapped[bool] = mapped_column(Boolean, default=False)

    brags:Mapped[list["Brags"]] = relationship(backref="brags",passive_deletes=True)

    def __repr__(self) -> str:
        return f"User> id: {self.user_id}, name: {self.user_name}, pass: {self.user_pass}, is_admin: {self.is_admin}, disabled: {self.disabled}"
    
class Brags(Base):
    __tablename__ = "brags"
    brag_id:Mapped[int] = mapped_column(primary_key=True,autoincrement=True)
    brag_name:Mapped[str] = mapped_column(String(100))
    brag_desc:Mapped[str] = mapped_column(TEXT)
    brag_img:Mapped[str] = mapped_column(String(100),nullable=True)
    brag_start_date:Mapped[datetime] = mapped_column(DateTime,nullable=True)
    brag_end_date:Mapped[datetime] = mapped_column(DateTime,nullable=True)
    created_time:Mapped[datetime] = mapped_column(DateTime,default=func.now())
    updated_time:Mapped[datetime] = mapped_column(DateTime,default=func.now(),onupdate=func.now())

    users:Mapped[int] = mapped_column(ForeignKey("users.user_id",ondelete="CASCADE"))

    def __repr__(self) -> str:
        return f"Brags> id: {self.brag_id}, name: {self.brag_name}"


load_dotenv()
try:
    connection_url:str = os.getenv('database_url')
    engine:Engine = create_engine(connection_url)
    global session_local
    session_local = sessionmaker(autoflush=False,autocommit=False,bind=engine)        
except Exception as e:
    print(e)

try:
    Base.metadata.create_all(bind=engine)
except Exception as e:
    print(e)