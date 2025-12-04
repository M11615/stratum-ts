import asyncio
from fastapi.responses import StreamingResponse
from fastapi import APIRouter, Request
from src.generate.request.user_generate_request import UserGenerateRequest
from src.lib.inference import inference

generate_router: APIRouter = APIRouter()

@generate_router.post("/v1/generate/user_generate")
async def user_generate(request: Request, requestBody: UserGenerateRequest) -> StreamingResponse:
  async def stream_generator():
    output: str = inference(requestBody.input)
    for ch in output:
      if await request.is_disconnected():
        break
      yield ch
      await asyncio.sleep(0.01)

  return StreamingResponse(stream_generator(), media_type="text/plain")
