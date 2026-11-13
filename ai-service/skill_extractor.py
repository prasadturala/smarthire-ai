import re
from typing import List

KNOWN_SKILLS = [
    # Languages
    "Python", "JavaScript", "TypeScript", "Java", "C++", "C#", "Go", "Rust", "PHP", "Ruby", "SQL",
    # Frontend
    "React", "React.js", "Next.js", "Vue.js", "Angular", "HTML", "CSS", "Tailwind CSS", "Bootstrap", "Redux",
    # Backend
    "Node.js", "Express.js", "FastAPI", "Django", "Flask", "Spring Boot", "NestJS", "GraphQL", "REST APIs",
    # Databases & Caching
    "PostgreSQL", "MySQL", "MongoDB", "Redis", "SQLite", "Prisma", "SQLAlchemy",
    # Cloud & DevOps
    "Docker", "Kubernetes", "AWS", "Azure", "GCP", "CI/CD", "Git", "GitHub", "Linux",
    # AI / ML
    "Machine Learning", "Deep Learning", "NLP", "LLM", "TensorFlow", "PyTorch", "LangChain", "Gemini API", "Scikit-learn"
]

def extract_skills(text: str) -> List[str]:
    """
    Scan extracted resume text and extract known technical skills.
    """
    if not text:
        return []

    found = []
    text_lower = f" {text.lower()} "

    for skill in KNOWN_SKILLS:
        # Regex boundary match so e.g. "go" matches " go " and not "good"
        pattern = r'(?<![a-zA-Z0-9_])' + re.escape(skill.lower()) + r'(?![a-zA-Z0-9_])'
        if re.search(pattern, text_lower):
            found.append(skill)

    return list(dict.fromkeys(found))
