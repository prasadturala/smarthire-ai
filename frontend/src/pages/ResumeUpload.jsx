import { useState } from 'react';
import api from '../services/api';

const demoResult = {
  fileName: 'resume.pdf',
  matchPercentage: 82,
  matchedSkills: ['React', 'JavaScript', 'Communication', 'SQL'],
  missingSkills: ['Python', 'Node.js', 'Leadership'],
  summary: 'The candidate shows strong front-end and communication skills with a few gaps in backend tooling.',
  recommendedNextStep: 'Proceed to interview stage.'
};

function ResumeUpload() {
  const [analysis, setAnalysis] = useState(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      setError('Please select a resume file before analyzing.');
      setAnalysis(demoResult);
      return;
    }

    const formData = new FormData();
    formData.append('resume', file);

    try {
      setError('');
      const response = await api.post('/api/applications/resume-analysis', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setAnalysis(response.data.analysis);
    } catch (requestError) {
      setAnalysis({
        ...demoResult,
        fileName: file.name,
        matchPercentage: 74,
        summary: 'The AI pipeline is temporarily unavailable, so the demo analysis is being displayed.'
      });
      setError('The backend analysis service is unavailable right now. Showing the local fallback result.');
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Resume intelligence</p>
          <h2>Upload a resume</h2>
        </div>
      </div>

      <div className="resume-layout">
        <form className="auth-card" onSubmit={handleSubmit}>
          <label>
            Resume file
            <input type="file" onChange={(event) => setFile(event.target.files[0])} />
          </label>

          {error ? <div className="error-banner">{error}</div> : null}

          <button type="submit" className="primary-button full-width">Analyze resume</button>
        </form>

        {analysis ? (
          <div className="result-card">
            <h3>{analysis.fileName}</h3>
            <div className="score-row">
              <strong>{analysis.matchPercentage}%</strong>
              <span>match score</span>
            </div>

            <p>{analysis.summary}</p>

            <div className="skill-pills">
              {analysis.matchedSkills.map((skill) => (
                <span key={skill} className="pill success">{skill}</span>
              ))}
            </div>

            <div className="skill-pills">
              {analysis.missingSkills.map((skill) => (
                <span key={skill} className="pill muted">{skill}</span>
              ))}
            </div>

            <p>
              <strong>Next step:</strong> {analysis.recommendedNextStep}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ResumeUpload;
