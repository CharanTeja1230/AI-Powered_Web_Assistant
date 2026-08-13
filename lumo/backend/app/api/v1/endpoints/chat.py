import json
from typing import List, Optional
from fastapi import APIRouter, Depends, Request
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from app.ai.service import ai_service

router = APIRouter()

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]
    model: Optional[str] = "lumo-oracle"
    stream: Optional[bool] = True

@router.post("/completions")
async def chat_completions(chat_req: ChatRequest):
    messages_payload = [{"role": msg.role, "content": msg.content} for msg in chat_req.messages]

    async def event_stream():
        async for chunk in ai_service.stream_chat_completion(messages_payload, model=chat_req.model):
            chunk_data = {
                "id": "chatcmpl-lumo",
                "object": "chat.completion.chunk",
                "model": chat_req.model,
                "choices": [{"delta": {"content": chunk}, "finish_reason": None}]
            }
            yield f"data: {json.dumps(chunk_data)}\n\n"
        yield "data: [DONE]\n\n"

    return StreamingResponse(event_stream(), media_type="text/event-stream")

@router.get("/models")
def list_models():
    return {
        "object": "list",
        "data": [
            {"id": "lumo-oracle", "name": "LUMO Oracle v1.0", "provider": "LUMO AI"},
            {"id": "gpt-4o", "name": "GPT-4o Multimodal", "provider": "OpenAI"},
            {"id": "claude-3-5-sonnet", "name": "Claude 3.5 Sonnet", "provider": "Anthropic"},
            {"id": "deepseek-r1", "name": "DeepSeek R1 Reasoning", "provider": "DeepSeek"}
        ]
    }
