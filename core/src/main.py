from typing import Dict
from pydantic import BaseModel
from fastapi import FastAPI
from inference import inference

app: FastAPI = FastAPI()

@app.get("/v1/read_root", response_model=Dict[str, str])
async def read_root() -> Dict[str, str]:
  return {"Hello": "World"}

class UserGenerateRequest(BaseModel):
  input: str

class UserGenerateResponse(BaseModel):
  output: str

@app.post("/v1/user_generate", response_model=UserGenerateResponse)
async def user_generate(request: UserGenerateRequest) -> UserGenerateResponse:
  return UserGenerateResponse(output=inference(request.input))
