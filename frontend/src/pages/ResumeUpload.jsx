import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { UploadCloud, AlertTriangle, RefreshCw, Sparkles, Check } from 'lucide-react';
import api, { getErrorMessage, getItems } from '../services/api';

export default function ResumeUpload() {
  const [searchParams] = useSearchParams();
  const preselectedJobId = searchParams.get('jobId') || '';
  const [availableJobs, setAvailableJobs] = useState([]);
  const [file, setFile] = useState(null);
  const [selectedJob, setSelectedJob] = useState(preselectedJobId);
  const [isUploading, setIsUploading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState('');
  const [loadingJobs, setLoadingJobs] = useState(true);

  useEffect(() => {
    api.get('/jobs')
      .then(({ data }) => setAvailableJobs(getItems(data, 'jobs')))
      .catch((requestError) => setError(getErrorMessage(requestError)))
      .finally(() => setLoadingJobs(false));
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      if (selected.type === 'application/pdf' || selected.name.toLowerCase().endsWith('.pdf')) {
        if (selected.size > 10 * 1024 * 1024) {
          setFile(null);
          setError('Resume files must be 10 MB or smaller.');
          return;
        }
        setFile(selected);
        setError('');
      } else {
        setFile(null);
        setError('Please upload a valid PDF document.');
      }
    }
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!file || !selectedJob) {
      setError('Select a role and a PDF resume before submitting.');
      return;
    }

    setIsUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('resume', file);
      formData.append('jobId', selectedJob);

      const { data } = await api.post('/applications', formData);
      setAnalysisResult(data.analysis || data.resumeAnalysis || data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsUploading(false);
    }
  };

  const matchScore = analysisResult?.match_score ?? analysisResult?.matchScore;
  const matchedSkills = analysisResult?.matched_skills || analysisResult?.matchedSkills || [];
  const missingSkills = analysisResult?.missing_skills || analysisResult?.missingSkills || [];

  return (
    <div style={{ maxWidth: '900px', margin: '2rem auto', padding: '0 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Resume & Skills Match</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem', marginTop: '0.25rem' }}>
          Apply with a PDF resume and review a transparent comparison of the skills requested for the role.
        </p>
      </div>

      {error && (
        <div style={{
          padding: '0.75rem 1rem',
          backgroundColor: 'var(--danger-bg)',
          color: 'var(--danger)',
          borderRadius: 'var(--radius-sm)',
          marginBottom: '1.5rem',
          fontSize: '0.875rem'
        }}>
          {error}
        </div>
      )}

      {/* Upload Box Card */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <form onSubmit={handleAnalyze}>
          <div className="form-group">
            <label className="form-label">Select Job Position</label>
            <select
              className="form-control"
              value={selectedJob}
              onChange={(e) => setSelectedJob(e.target.value)}
              required
              disabled={loadingJobs}
            >
              <option value="">{loadingJobs ? 'Loading open positions...' : 'Choose an open position'}</option>
              {availableJobs.map(job => (
                <option key={job.id} value={job.id}>
                  {job.title}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Upload Resume (PDF)</label>
            <div style={{
              border: '2px dashed var(--border)',
              borderRadius: 'var(--radius-md)',
              padding: '2.5rem 1rem',
              textAlign: 'center',
              backgroundColor: '#fafafa',
              cursor: 'pointer',
              position: 'relative'
            }}>
              <input
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFileChange}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  opacity: 0,
                  cursor: 'pointer'
                }}
              />
              <UploadCloud size={40} color="var(--primary)" style={{ margin: '0 auto 0.75rem' }} />
              <div style={{ fontWeight: 600, fontSize: '0.9375rem' }}>
                {file ? file.name : 'Click or drag & drop your resume PDF here'}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Supports PDF files up to 10 MB
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.25rem' }}>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isUploading || !file || !selectedJob || loadingJobs}
              style={{ minWidth: '180px' }}
            >
              {isUploading ? (
                <>
                  <RefreshCw size={16} className="spin" /> Analyzing Resume...
                </>
              ) : (
                <>
                  <Sparkles size={16} /> Run AI Matcher
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Analysis Results Display */}
      {analysisResult && (
        <div className="card" style={{ border: '2px solid var(--border)', animation: 'fadeIn 0.3s ease' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <span className="badge badge-primary">Analysis Completed</span>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 700, marginTop: '0.25rem' }}>
                Application submitted
              </h2>
            </div>

            {/* Circular / Big Match Score */}
            <div style={{ textAlign: 'center', minWidth: '120px' }}>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: 800,
                color: 'var(--primary)',
                lineHeight: 1
              }}>
                {matchScore == null ? '—' : `${matchScore}%`}
              </div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginTop: '0.25rem' }}>
                Skills Match
              </div>
            </div>
          </div>

          <div style={{
            padding: '1rem',
            backgroundColor: 'var(--background)',
            borderRadius: 'var(--radius-sm)',
            marginBottom: '1.5rem',
            fontSize: '0.875rem',
            lineHeight: 1.5
          }}>
            This comparison is supporting information only. It does not determine who gets hired.
          </div>

          {/* Matched vs Missing Skills breakdown */}
          <div className="grid-cols-2" style={{ marginBottom: '1.5rem' }}>
            {/* Matched Skills */}
            <div style={{
              border: '1px solid #bbf7d0',
              backgroundColor: '#f0fdf4',
              padding: '1rem',
              borderRadius: 'var(--radius-sm)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--success)', fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.75rem' }}>
                <Check size={18} /> Matched Skills ({matchedSkills.length})
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                {matchedSkills.map((skill, i) => (
                  <span key={i} style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #86efac',
                    color: '#15803d',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: 600
                  }}>
                    ✓ {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing Skills */}
            <div style={{
              border: '1px solid #fed7aa',
              backgroundColor: '#fff7ed',
              padding: '1rem',
              borderRadius: 'var(--radius-sm)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--warning)', fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.75rem' }}>
                <AlertTriangle size={18} /> Skills Not Identified ({missingSkills.length})
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                {missingSkills.map((skill, i) => (
                  <span key={i} style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #fdba74',
                    color: '#c2410c',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: 600
                  }}>
                    ✗ {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
            <button onClick={() => { setAnalysisResult(null); setFile(null); }} className="btn btn-secondary btn-sm">
              Apply to another role
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
