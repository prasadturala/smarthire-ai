import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { FileText, CheckCircle, Clock, AlertTriangle, ArrowUpRight, Upload } from 'lucide-react';
import api, { getErrorMessage, getItems } from '../services/api';

export default function CandidateDashboard() {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await api.get('/applications');
      setApplications(getItems(res.data, 'applications'));
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'shortlisted':
        return <span className="badge badge-success">Shortlisted</span>;
      case 'screening':
        return <span className="badge badge-warning">Under Review</span>;
      case 'rejected':
        return <span className="badge badge-danger">Not Selected</span>;
      default:
        return <span className="badge badge-primary">Submitted</span>;
    }
  };
  const getMatchScore = (application) =>
    application.matchScore ?? application.match_score ?? application.analysis?.match_score ?? application.resumeAnalysis?.match_score;
  const scoredApplications = applications.filter((application) => getMatchScore(application) != null);
  const averageMatch = scoredApplications.length
    ? Math.round(scoredApplications.reduce((total, application) => total + Number(getMatchScore(application)), 0) / scoredApplications.length)
    : null;

  return (
    <div className="main-layout">
      <Sidebar role="candidate" />
      <div className="content-area">
        {/* Welcome Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 700 }}>Welcome back, {user?.name || user?.email || 'there'}!</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              Track your job applications and AI resume match evaluations
            </p>
          </div>
          <Link to="/upload-resume" className="btn btn-primary">
            <Upload size={16} /> Analyze New Resume
          </Link>
        </div>

        {/* Stats Row */}
        <div className="grid-cols-3" style={{ marginBottom: '2rem' }}>
          <div className="card">
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 600 }}>APPLICATIONS</div>
            <div style={{ fontSize: '2rem', fontWeight: 700, marginTop: '0.25rem' }}>{applications.length}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--success)', marginTop: '0.25rem' }}>Active submissions</div>
          </div>
          <div className="card">
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 600 }}>SHORTLISTED</div>
            <div style={{ fontSize: '2rem', fontWeight: 700, marginTop: '0.25rem', color: 'var(--success)' }}>
              {applications.filter(a => a.status === 'shortlisted').length}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Ready for interview</div>
          </div>
          <div className="card">
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 600 }}>AVG MATCH SCORE</div>
            <div style={{ fontSize: '2rem', fontWeight: 700, marginTop: '0.25rem', color: 'var(--primary)' }}>
              {averageMatch === null ? '—' : `${averageMatch}%`}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Informational skills match</div>
          </div>
        </div>

        {/* Applications List */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Your Job Applications</h2>
            <Link to="/jobs" style={{ fontSize: '0.875rem', color: 'var(--primary)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              Browse more jobs <ArrowUpRight size={15} />
            </Link>
          </div>

          {error && <div role="alert" className="error-message">{error}</div>}
          {loading ? <p>Loading your applications...</p> : applications.length === 0 && !error ? (
            <p className="text-muted">You have not applied to any roles yet. Explore open positions to get started.</p>
          ) : !error && <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {applications.map((app) => (
              <div
                key={app.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: '#ffffff'
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: '1rem' }}>{app.job?.title || app.jobTitle || app.job_title || 'Job application'}</div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                    {app.department || app.job?.department || ''} {app.appliedAt ? `• Applied on ${app.appliedAt}` : ''}
                  </div>
                  {(app.missingSkills || app.missing_skills || app.analysis?.missing_skills)?.length > 0 && (
                    <div style={{ fontSize: '0.75rem', color: 'var(--warning)', marginTop: '0.4rem' }}>
                      Skills not identified: {(app.missingSkills || app.missing_skills || app.analysis?.missing_skills).join(', ')}
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Match Score</div>
                    <div style={{ fontWeight: 700, fontSize: '1.125rem', color: 'var(--primary)' }}>
                      {getMatchScore(app) == null ? '—' : `${getMatchScore(app)}%`}
                    </div>
                  </div>
                  <div>
                    {getStatusBadge(app.status)}
                  </div>
                </div>
              </div>
            ))}
          </div>}
import Sidebar from '../components/Sidebar';

const applications = [
  { role: 'Senior Frontend Engineer', status: 'Interview scheduled', score: '91%' },
  { role: 'Product Designer', status: 'Application review', score: '84%' },
  { role: 'Systems Analyst', status: 'Shortlisted', score: '88%' }
];

function CandidateDashboard() {
  return (
    <div className="page dashboard-layout">
      <Sidebar role="candidate" />

      <div className="dashboard-content">
        <div className="page-header">
          <div>
            <p className="eyebrow">Candidate dashboard</p>
            <h2>Application overview</h2>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <span>Applications</span>
            <strong>12</strong>
          </div>
          <div className="stat-card">
            <span>Interviews</span>
            <strong>3</strong>
          </div>
          <div className="stat-card">
            <span>Profile fit</span>
            <strong>86%</strong>
          </div>
        </div>

        <div className="list-card">
          <h3>Recent applications</h3>
          <table>
            <thead>
              <tr>
                <th>Role</th>
                <th>Status</th>
                <th>Fit score</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application) => (
                <tr key={application.role}>
                  <td>{application.role}</td>
                  <td>{application.status}</td>
                  <td>{application.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CandidateDashboard;
