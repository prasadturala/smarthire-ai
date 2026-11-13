import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from matcher import match_skills
from skill_extractor import extract_skills

def test_perfect_match():
    candidate_skills = ["Python", "FastAPI", "Docker", "PostgreSQL"]
    required_skills = ["Python", "FastAPI", "Docker", "PostgreSQL"]
    result = match_skills(candidate_skills, required_skills)
    assert result["match_score"] == 100, f"Expected 100, got {result['match_score']}"
    assert len(result["missing_skills"]) == 0
    assert len(result["matched_skills"]) == 4

def test_partial_match():
    candidate_skills = ["Python", "FastAPI", "Git"]
    required_skills = ["Python", "FastAPI", "Docker", "Kubernetes"]
    result = match_skills(candidate_skills, required_skills)
    assert result["match_score"] == 50, f"Expected 50, got {result['match_score']}"
    assert "Docker" in result["missing_skills"]
    assert "Kubernetes" in result["missing_skills"]
    assert "Python" in result["matched_skills"]

def test_no_match():
    candidate_skills = ["Photoshop", "Figma", "Illustrator"]
    required_skills = ["Python", "FastAPI", "PostgreSQL"]
    result = match_skills(candidate_skills, required_skills)
    assert result["match_score"] == 0
    assert len(result["missing_skills"]) == 3
    assert len(result["matched_skills"]) == 0

def test_empty_requirements():
    result = match_skills(["Python"], [])
    assert result["match_score"] == 0
    assert result["matched_skills"] == []

def test_case_insensitivity():
    candidate_skills = ["python", "FASTAPI"]
    required_skills = ["Python", "FastAPI"]
    result = match_skills(candidate_skills, required_skills)
    assert result["match_score"] == 100

def test_skill_extractor():
    sample_text = "Experienced Senior Developer with hands-on expertise in Python, React, and Docker on AWS cloud."
    skills = extract_skills(sample_text)
    assert "Python" in skills
    assert "React" in skills
    assert "Docker" in skills
    assert "AWS" in skills

if __name__ == "__main__":
    tests = [
        test_perfect_match,
        test_partial_match,
        test_no_match,
        test_empty_requirements,
        test_case_insensitivity,
        test_skill_extractor
    ]
    print("Running Python AI Service Unit Tests...")
    passed = 0
    for t in tests:
        try:
            t()
            print(f"  [PASS] {t.__name__}")
            passed += 1
        except Exception as e:
            print(f"  [FAIL] {t.__name__}: {e}")
    print(f"\nResults: {passed}/{len(tests)} tests passed successfully.")
