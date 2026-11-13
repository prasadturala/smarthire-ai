from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health_check():
    response = client.get('/health')
    assert response.status_code == 200
    assert response.json()['status'] == 'ok'


def test_analysis_endpoint():
    payload = {
        'file_name': 'candidate-resume.txt',
        'text': 'Experienced React developer with strong communication and Node.js skills.'
    }

    response = client.post('/analyze', json=payload)
    assert response.status_code == 200
    assert response.json()['matchPercentage'] >= 55
    assert 'communication' in response.json()['matchedSkills']
