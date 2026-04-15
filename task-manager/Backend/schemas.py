from pydantic import BaseModel

class TaskSchema(BaseModel):
    id: int
    title: str
    status: str
    
    class Config:
        orm_mode = True