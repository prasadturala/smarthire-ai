from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "SmartHire AI Service"
    HOST: str = "0.0.0.0"
    PORT: int = 8001
    GEMINI_API_KEY: str = ""
    DEFAULT_MODEL: str = "gemini-1.5-flash"
    EMBEDDING_MODEL: str = "models/text-embedding-004"

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()
