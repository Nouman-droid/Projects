from sqlalchemy import Column, Integer, String
from database import Base

class Task(Base):
    _tablename_ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    status = Column(String)