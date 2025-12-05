from fastapi import FastAPI
from fastapi.responses import JSONResponse
from src.generate.generate_route import generate_router

app: FastAPI = FastAPI()
app.include_router(generate_router)

@app.get("/v1/app/read_root")
async def read_root() -> JSONResponse:
  return JSONResponse(content={"Hello": "World"}, media_type="application/json; charset=utf-8")
