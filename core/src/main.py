from typing import Dict
from fastapi import FastAPI
from src.generate.generate_route import generate_router

app: FastAPI = FastAPI()
app.include_router(generate_router)

@app.get("/v1/app/read_root")
async def read_root() -> Dict[str, str]:
  return {"Hello": "World"}
