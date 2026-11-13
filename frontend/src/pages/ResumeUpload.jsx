import { useState } from 'react';

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

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!file) {
      setAnalysis(demoResult);
      return;
    }

    setAnalysis({
      ...demoResult,
      fileName: file.name,
      matchPercentage: 88
    });
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
