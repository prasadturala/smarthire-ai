import re
import io
from typing import Dict, Any, List
import pypdf
from app.core.llm import llm_client

class ResumeParser:
    """Extracts raw text and structures resume content."""

    @staticmethod
    def extract_text_from_pdf(file_bytes: bytes) -> str:
        reader = pypdf.PdfReader(io.BytesIO(file_bytes))
        text = ""
        for page in reader.pages:
            extracted = page.extract_text()
            if extracted:
                text += extracted + "\n"
        return text.strip()

    @staticmethod
    def extract_contact_info(text: str) -> Dict[str, str]:
        email_pattern = r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+'
        phone_pattern = r'(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}'

        emails = re.findall(email_pattern, text)
        phones = re.findall(phone_pattern, text)

        return {
            "email": emails[0] if emails else "",
            "phone": phones[0] if phones else ""
        }

    @staticmethod
    def extract_skills_heuristic(text: str) -> List[str]:
        common_skills = [
            "Python", "JavaScript", "TypeScript", "React", "Next.js", "Node.js",
            "FastAPI", "Django", "Flask", "PostgreSQL", "MySQL", "MongoDB",
            "Docker", "Kubernetes", "AWS", "GCP", "Azure", "Git", "CI/CD",
            "Machine Learning", "NLP", "LLM", "TensorFlow", "PyTorch", "Tailwind CSS",
            "GraphQL", "REST API", "Redis"
        ]
        text_lower = text.lower()
        found = [skill for skill in common_skills if skill.lower() in text_lower]
        return list(set(found))

    async def parse(self, file_bytes: bytes, filename: str) -> Dict[str, Any]:
        """Full pipeline: text extraction + contact info + skill parsing + optional LLM structuring."""
        if filename.lower().endswith(".pdf"):
            raw_text = self.extract_text_from_pdf(file_bytes)
        else:
            raw_text = file_bytes.decode("utf-8", errors="ignore")

        contact = self.extract_contact_info(raw_text)
        skills = self.extract_skills_heuristic(raw_text)

        # First line or header is usually name
        lines = [line.strip() for line in raw_text.split("\n") if line.strip()]
        candidate_name = lines[0] if lines else "Candidate"

        structured = {
            "name": candidate_name[:50],
            "email": contact["email"],
            "phone": contact["phone"],
            "skills": skills,
            "raw_text_length": len(raw_text),
            "summary": raw_text[:300] + "..." if len(raw_text) > 300 else raw_text
        }

        # If LLM is available, enrich parsing
        if llm_client.client:
            prompt = f"""
            Analyze the following resume text and extract candidate information as JSON with keys:
            "name", "email", "phone", "skills" (list), "experience_years" (number), "education" (list), "summary".
            Resume Text:
            {raw_text[:3000]}
            """
            enriched = await llm_client.generate_json(prompt)
            if enriched and "name" in enriched:
                structured.update(enriched)

        return structured

resume_parser = ResumeParser()
