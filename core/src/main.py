from typing import Dict
from pydantic import BaseModel
from fastapi import FastAPI
from inference import inference

app: FastAPI = FastAPI()

@app.get("/", response_model=Dict[str, str])
async def read_root() -> Dict[str, str]:
  return {"Hello": "World"}

class UserGenerateRequest(BaseModel):
  input: str

class UserGenerateResponse(BaseModel):
  output: str

@app.post("/v1/user_generate", response_model=UserGenerateResponse)
async def user_generate(request: UserGenerateRequest) -> UserGenerateResponse:
  input: str = request.input
  output: str = inference(input)

  return UserGenerateResponse(output=output)
