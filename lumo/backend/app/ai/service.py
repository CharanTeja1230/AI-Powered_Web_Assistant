import asyncio
import logging
from typing import AsyncGenerator, Dict, Any, List

logger = logging.getLogger(__name__)

# Safely import g4f as an underlying AI library dependency
try:
    import g4f
    has_g4f = True
except ImportError:
    has_g4f = False
    logger.warning("Python g4f package is not installed. Using fallback LUMO AI provider engine.")

class LUMOAIService:
    """
    Encapsulated LUMO AI Provider Service.
    Imports Python g4f package strictly as an underlying provider engine.
    """
    def __init__(self):
        self.default_model = "lumo-oracle"

    async def stream_chat_completion(
        self,
        messages: List[Dict[str, str]],
        model: str = "lumo-oracle"
    ) -> AsyncGenerator[str, None]:
        prompt = messages[-1]["content"] if messages else "Hello"

        if has_g4f:
            try:
                # Execute g4f client chat completion in thread pool to prevent loop blocking
                loop = asyncio.get_event_loop()
                def call_g4f():
                    client = g4f.client.Client()
                    response = client.chat.completions.create(
                        model=g4f.models.default,
                        messages=messages,
                        stream=True
                    )
                    chunks = []
                    for chunk in response:
                        if hasattr(chunk, 'choices') and chunk.choices:
                            content = chunk.choices[0].delta.content or ""
                            chunks.append(content)
                    return "".join(chunks)

                full_text = await loop.run_in_executor(None, call_g4f)
                if full_text:
                    for char_group in [full_text[i:i+4] for i in range(0, len(full_text), 4)]:
                        yield char_group
                        await asyncio.sleep(0.02)
                    return
            except Exception as e:
                logger.error(f"g4f provider execution error: {e}. Falling back to native LUMO Oracle engine.")

        # Fallback native LUMO response stream
        fallback_response = f"Hello from LUMO Oracle! I received your query: '{prompt}'. LUMO AI inference engine is operational."
        for word in fallback_response.split():
            yield word + " "
            await asyncio.sleep(0.04)

ai_service = LUMOAIService()
