from typing import List, Dict, Any

def match_skills(resume_skills: List[str], required_skills: List[str]) -> Dict[str, Any]:
    """
    Compare candidate skills with job requirements.
    Calculates match percentage, identified matches, and missing skill gaps.
    """
    if not required_skills:
        return {
            "match_score": 0,
            "matched_skills": [],
            "missing_skills": []
        }

    # Normalize for comparison while preserving display labels
    req_map = {skill.lower(): skill for skill in required_skills}
    res_set = {skill.lower() for skill in resume_skills}

    matched_keys = set(req_map.keys()) & res_set
    missing_keys = set(req_map.keys()) - res_set

    matched = [req_map[k] for k in matched_keys]
    missing = [req_map[k] for k in missing_keys]

    score = round(len(matched) / len(required_skills) * 100)

    return {
        "match_score": score,
        "matched_skills": matched,
        "missing_skills": missing
    }
