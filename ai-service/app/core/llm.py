import json
import logging
from typing import Any, Dict, Optional
from app.core.config import settings

logger = logging.getLogger(__name__)

class LLMClient:
    def __init__(self):
        self.api_key = settings.GEMINI_API_KEY
        self.client = None
        if self.api_key:
            try:
                import google.generativeai as genai
                genai.configure(api_key=self.api_key)
                self.client = genai.GenerativeModel(settings.DEFAULT_MODEL)
                logger.info(f"Initialized Gemini model: {settings.DEFAULT_MODEL}")
            except Exception as e:
                logger.warning(f"Could not initialize Gemini SDK: {e}. Will use fallback engine.")
        else:
            logger.info("No GEMINI_API_KEY set; AI service running with fallback heuristics.")

    async def generate_json(self, prompt: str, system_instruction: Optional[str] = None) -> Dict[str, Any]:
        """Generate structured JSON response from LLM or heuristic fallback."""
        if self.client:
            try:
                full_prompt = f"{system_instruction}\n\n{prompt}" if system_instruction else prompt
                response = self.client.generate_content(
                    full_prompt,
                    generation_config={"response_mime_type": "application/json"}
                )
                return json.loads(response.text)
            except Exception as e:
                logger.error(f"Error querying Gemini API: {e}")
        
        # Fallback return
        return {"status": "fallback", "message": "Simulated AI response - configure GEMINI_API_KEY for live LLM"}

llm_client = LLMClient()
