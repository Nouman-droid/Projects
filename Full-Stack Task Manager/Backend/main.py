from fastapi import FastAPI
from database import engine, Base

app = FastAPI()

Base.metadata.create_all(bind=engine)

@app.get("/")
def home():
    return {"message": "Task Manager API is running"}

# tasks = []

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
