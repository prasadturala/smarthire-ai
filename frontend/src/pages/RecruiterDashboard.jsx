import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { PlusCircle, Users, Briefcase, CheckCircle, Search, Filter, RefreshCw } from 'lucide-react';
import api, { getErrorMessage, getItems } from '../services/api';

export default function RecruiterDashboard() {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const [candidates, setCandidates] = useState([]);
  const [activeJobCount, setActiveJobCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showJobModal, setShowJobModal] = useState(false);
  const [newJob, setNewJob] = useState({
    title: '',
    department: 'Engineering',
    location: 'Remote',
    description: '',
    requirements: '',
    skills_required: ''
  });
  const [notification, setNotification] = useState('');

  useEffect(() => {
    fetchCandidates();
    fetchJobs();
  }, []);

  const fetchCandidates = async () => {
    setError('');
    try {
      const res = await api.get('/applications');
      setCandidates(getItems(res.data, 'applications'));
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const fetchJobs = async () => {
    try {
      const { data } = await api.get('/jobs');
      setActiveJobCount(getItems(data, 'jobs').length);
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    setError('');
    try {
      await api.patch(`/applications/${id}/status`, { status: newStatus });
    } catch (err) {
      setError(getErrorMessage(err));
      return;
    }
    setCandidates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
    setNotification(`Candidate status updated to ${newStatus}`);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleCreateJob = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const payload = {
        ...newJob,
        skills_required: newJob.skills_required.split(',').map((s) => s.trim())
      };
      await api.post('/jobs', payload);
      setNotification('New Job posted successfully!');
      setShowJobModal(false);
      setNewJob({ title: '', department: 'Engineering', location: 'Remote', description: '', requirements: '', skills_required: '' });
    } catch (err) {
      setError(getErrorMessage(err));
    }
    setTimeout(() => setNotification(''), 3500);
  };
  const getMatchScore = (candidate) =>
    candidate.matchScore ?? candidate.match_score ?? candidate.analysis?.match_score ?? candidate.resumeAnalysis?.match_score;
  const getMissingSkills = (candidate) =>
    candidate.missingSkills || candidate.missing_skills || candidate.analysis?.missing_skills || [];

  return (
    <div className="main-layout">
      <Sidebar role="recruiter" />
      <div className="content-area">
        {/* Recruiter Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 700 }}>Recruiter Talent Hub</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              Logged in as {user?.name || user?.email || 'recruiter'}
            </p>
          </div>
          <button onClick={() => setShowJobModal(true)} className="btn btn-primary">
            <PlusCircle size={16} /> Post New Job
          </button>
        </div>

        {notification && (
          <div style={{
            padding: '0.75rem 1rem',
            marginBottom: '1.5rem',
            backgroundColor: 'var(--success-bg)',
            color: 'var(--success)',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.875rem',
            fontWeight: 500
          }}>
            {notification}
          </div>
        )}
        {error && <div role="alert" className="error-message">{error}</div>}

        {/* Statistics */}
        <div className="grid-cols-3" style={{ marginBottom: '2rem' }}>
          <div className="card">
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 600 }}>ACTIVE JOBS</div>
            <div style={{ fontSize: '2rem', fontWeight: 700, marginTop: '0.25rem' }}>{activeJobCount}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--primary)', marginTop: '0.25rem' }}>Open positions</div>
          </div>
          <div className="card">
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 600 }}>TOTAL APPLICANTS</div>
            <div style={{ fontSize: '2rem', fontWeight: 700, marginTop: '0.25rem' }}>{candidates.length}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Applications received</div>
          </div>
          <div className="card">
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 600 }}>SHORTLIST RATE</div>
            <div style={{ fontSize: '2rem', fontWeight: 700, marginTop: '0.25rem', color: 'var(--success)' }}>
              {Math.round((candidates.filter(c => c.status === 'shortlisted').length / (candidates.length || 1)) * 100)}%
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Marked by your team</div>
          </div>
        </div>

        {/* Candidates Table */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Applications & skills insights</h2>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '0.75rem' }}>Candidate</th>
                <th style={{ padding: '0.75rem' }}>Target Job</th>
                <th style={{ padding: '0.75rem' }}>Match Score</th>
                <th style={{ padding: '0.75rem' }}>Skill Analysis</th>
                <th style={{ padding: '0.75rem' }}>Status</th>
                <th style={{ padding: '0.75rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && <tr><td colSpan="6" style={{ padding: '1rem' }}>Loading applications...</td></tr>}
              {!loading && !error && candidates.length === 0 && <tr><td colSpan="6" style={{ padding: '1rem' }}>No applications have been received yet.</td></tr>}
              {candidates.map((c) => (
                <tr key={c.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '0.75rem' }}>
                    <div style={{ fontWeight: 600 }}>{c.candidateName || c.candidate?.name || c.user?.name || 'Candidate'}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{c.email || c.candidate?.email || c.user?.email || ''}</div>
                  </td>
                  <td style={{ padding: '0.75rem' }}>{c.jobTitle || c.job_title || c.job?.title || 'Job application'}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <span style={{
                      fontWeight: 700,
                      color: 'var(--primary)'
                    }}>
                      {getMatchScore(c) == null ? '—' : `${getMatchScore(c)}%`}
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      <strong>Skills not identified:</strong> {getMissingSkills(c).join(', ') || 'None'}
                    </div>
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <span className={`badge ${
                      c.status === 'shortlisted' ? 'badge-success' :
                      c.status === 'rejected' ? 'badge-danger' : 'badge-warning'
                    }`}>
                      {c.status || 'submitted'}
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '0.35rem' }}>
                      <button
                        onClick={() => handleStatusUpdate(c.id, 'shortlisted')}
                        className="btn btn-secondary btn-sm"
                        style={{ color: 'var(--success)', borderColor: 'var(--success)' }}
                      >
                        Shortlist
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(c.id, 'rejected')}
                        className="btn btn-secondary btn-sm"
                        style={{ color: 'var(--danger)', borderColor: 'var(--danger)' }}
                      >
                        Reject
                      </button>
                    </div>
                  </td>
import Sidebar from '../components/Sidebar';

const applicants = [
  { name: 'Maya Singh', role: 'Frontend Engineer', score: '92%' },
  { name: 'Daniel Kim', role: 'Product Analyst', score: '88%' },
  { name: 'Aisha Patel', role: 'AI QA Specialist', score: '90%' }
];

function RecruiterDashboard() {
  return (
    <div className="page dashboard-layout">
      <Sidebar role="recruiter" />

      <div className="dashboard-content">
        <div className="page-header">
          <div>
            <p className="eyebrow">Recruiter dashboard</p>
            <h2>Hiring pipeline</h2>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <span>Open roles</span>
            <strong>18</strong>
          </div>
          <div className="stat-card">
            <span>Shortlisted</span>
            <strong>44</strong>
          </div>
          <div className="stat-card">
            <span>Avg fit</span>
            <strong>89%</strong>
          </div>
        </div>

        <div className="list-card">
          <h3>Top applicants</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Fit score</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map((applicant) => (
                <tr key={applicant.name}>
                  <td>{applicant.name}</td>
                  <td>{applicant.role}</td>
                  <td>{applicant.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal for Creating New Job */}
        {showJobModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div className="card" style={{ width: '540px', maxWidth: '90%' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>Create New Job Opening</h3>
              <form onSubmit={handleCreateJob}>
                <div className="form-group">
                  <label className="form-label">Job Title</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Senior Backend Engineer"
                    value={newJob.title}
                    onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                    required
                  />
                </div>
                <div className="grid-cols-2">
                  <div className="form-group">
                    <label className="form-label">Department</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newJob.department}
                      onChange={(e) => setNewJob({ ...newJob, department: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Location</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newJob.location}
                      onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Role responsibilities and expectations..."
                    value={newJob.description}
                    onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Required Skills (comma separated)</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Python, FastAPI, Docker, PostgreSQL"
                    value={newJob.skills_required}
                    onChange={(e) => setNewJob({ ...newJob, skills_required: e.target.value })}
                    required
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                  <button type="button" onClick={() => setShowJobModal(false)} className="btn btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Post Job
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecruiterDashboard;
