from pydantic import BaseModel

class UserGenerateRequest(BaseModel):
  input: str
