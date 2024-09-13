from pydantic import BaseModel
from typing import List
from dotenv import load_dotenv
from sqlalchemy import Engine,create_engine,Column,UUID,String,Boolean,ForeignKey,Integer,TEXT
from sqlalchemy.orm import Mapped,mapped_column,session,sessionmaker,DeclarativeBase,Session,relationship
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
    disabled: Mapped[bool] = mapped_column(Boolean, default=True)

    tasks:Mapped[list["Tasks"]] = relationship(backref="tasks",passive_deletes=True)

    def __repr__(self) -> str:
        return f"User> id: {self.user_id}, name: {self.user_name}, pass: {self.user_pass}, is_admin: {self.is_admin}, disabled: {self.disabled}"
    
class Tasks(Base):
    __tablename__ = "tasks"
    task_id:Mapped[int] = mapped_column(primary_key=True,autoincrement=True)
    task_name:Mapped[str] = mapped_column(String(30))

    users:Mapped[int] = mapped_column(ForeignKey("users.user_id",ondelete="CASCADE"))

    def __repr__(self) -> str:
        return f"Task> id: {self.task_id}, name: {self.task_name}"
    


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