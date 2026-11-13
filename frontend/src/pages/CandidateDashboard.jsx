import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { FileText, CheckCircle, Clock, AlertTriangle, ArrowUpRight, Upload } from 'lucide-react';
import api from '../services/api';

export default function CandidateDashboard() {
  const user = JSON.parse(localStorage.getItem('user') || '{"name": "Alex Mercer", "email": "candidate@smarthire.ai"}');
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await api.get('/applications');
      setApplications(res.data);
    } catch (err) {
      console.warn('Using default demo applications data:', err);
      setApplications([
        {
          id: 'app-1',
          jobTitle: 'Senior AI / Full-Stack Engineer',
          department: 'Engineering',
          company: 'SmartHire Core',
          appliedAt: '2026-11-12',
          matchScore: 92,
          status: 'shortlisted',
          matchedSkills: ['Python', 'FastAPI', 'React', 'PostgreSQL', 'Docker'],
          missingSkills: ['LangChain', 'Gemini API']
        },
        {
          id: 'app-2',
          jobTitle: 'Frontend Engineer (React / Next.js)',
          department: 'Product UI',
          company: 'Acme Systems',
          appliedAt: '2026-11-10',
          matchScore: 78,
          status: 'screening',
          matchedSkills: ['React', 'JavaScript', 'Tailwind CSS'],
          missingSkills: ['Jest', 'TypeScript']
        }
      ]);
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

  return (
    <div className="main-layout">
      <Sidebar role="candidate" />
      <div className="content-area">
        {/* Welcome Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 700 }}>Welcome back, {user.name}!</h1>
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
              {Math.round(applications.reduce((acc, a) => acc + (a.matchScore || 0), 0) / (applications.length || 1))}%
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>ATS compatibility</div>
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

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
                  <div style={{ fontWeight: 600, fontSize: '1rem' }}>{app.jobTitle}</div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                    {app.department} • Applied on {app.appliedAt}
                  </div>
                  {app.missingSkills && app.missingSkills.length > 0 && (
                    <div style={{ fontSize: '0.75rem', color: 'var(--warning)', marginTop: '0.4rem' }}>
                      Skill Gap identified: {app.missingSkills.join(', ')}
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Match Score</div>
                    <div style={{ fontWeight: 700, fontSize: '1.125rem', color: app.matchScore >= 80 ? 'var(--success)' : 'var(--warning)' }}>
                      {app.matchScore}%
                    </div>
                  </div>
                  <div>
                    {getStatusBadge(app.status)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
