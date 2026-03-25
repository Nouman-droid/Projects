from fastapi import FastAPI
from fastapi import Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi import HTTPException
from sqlalchemy.orm import Session
from database import engine, Base, SessionLocal
from models import Task
from schemas import TaskSchema
from typing import List



app = FastAPI()

Base.metadata.create_all(bind=engine)

tasks = []

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Task Manager API is running"}

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
@app.get("/tasks", response_model=List[TaskSchema])
def get_tasks(db: Session = Depends(get_db)):
    tasks = db.query(Task).all()
    return tasks

@app.post("/tasks")
def create_task(task: dict, db: Session = Depends(get_db)):
    
    new_task = Task(
        title = task["title"],
        status = task["status"]
    )
    
    db.add(new_task)
    db.commit()
    db.refresh(new_task)

    return new_task

@app.delete("/tasks/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    
    task = db.query(Task).filter(Task.id == task_id).first()

    if not task:
        return {"error": "Task not found"}

    db.delete(task)
    db.commit()

    return {"message": "Task deleted"}


@app.put("/tasks/{task_id}")
def update_task(task_id: int, task: dict, db: Session = Depends(get_db)):
    
    db_task = db.query(Task).filter(Task.id == task_id).first()
    
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    db_task.status = task["status"]

    db.commit()
    db.refresh(db_task)

    return db_task


# @app.get("/tasks")
# def get_tasks():
#     return tasks

# @app.post("/tasks")
# def create_task(task: dict):
#     tasks.append(task)
#     return {"message": "Task created"}

# @app.delete("/tasks/{task_id}")
# def delete_task(task_id: int):
#     tasks.pop(task_id)    
#     return {"message": "Task deleted"}
