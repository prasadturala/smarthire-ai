import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Zap, Bot, Database } from 'lucide-react';

export default function Home() {
  return (
    <div style={{ maxWidth: '1100px', margin: '2rem auto', padding: '0 1rem' }}>
      {/* Hero Section */}
      <div style={{ textAlign: 'center', padding: '3.5rem 1rem 2.5rem' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          backgroundColor: 'var(--primary-light)',
          color: 'var(--primary)',
          padding: '0.35rem 0.85rem',
          borderRadius: '9999px',
          fontSize: '0.8125rem',
          fontWeight: 600,
          marginBottom: '1.25rem'
        }}>
          <Sparkles size={16} /> Clear, transparent skills insights
        </div>
        
        <h1 style={{ fontSize: '3rem', fontWeight: 800, lineHeight: 1.15, marginBottom: '1.25rem', color: 'var(--text-main)' }}>
          Better matches with <span style={{ color: 'var(--primary)' }}>people-first</span> hiring
        </h1>
        
        <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)', maxWidth: '680px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
          Compare role requirements with resume skills and get clear supporting insights. Candidates and recruiters stay in control of every decision.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/upload-resume" className="btn btn-primary" style={{ padding: '0.75rem 1.75rem', fontSize: '1rem' }}>
            Try Resume Analyzer <ArrowRight size={18} />
          </Link>
          <Link to="/jobs" className="btn btn-secondary" style={{ padding: '0.75rem 1.75rem', fontSize: '1rem' }}>
            Browse Active Jobs
          </Link>
        </div>
      </div>

      {/* 3 Pillars / Architecture cards */}
      <div className="grid-cols-3" style={{ marginTop: '3rem' }}>
        <div className="card">
          <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
            <Zap size={22} />
          </div>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>React 18 Frontend</h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            Clean dashboards for both job applicants and talent acquisition teams with real-time score visualization.
          </p>
        </div>

        <div className="card">
          <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#ecfdf5', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
            <Database size={22} />
          </div>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>Node.js & PostgreSQL</h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            Express and Prisma backend orchestrating authentication, job listings, application status, and result persistence.
          </p>
        </div>

        <div className="card">
          <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#fdf2f8', color: '#db2777', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
            <Bot size={22} />
          </div>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>Python AI Engine</h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            FastAPI microservice parsing PDF resumes with PyMuPDF, extracting skill vectors, and calculating transparent match scores.
          </p>
        </div>
      </div>
    </div>
  );
}
import { Link } from 'react-router-dom';

const stats = [
  { label: 'Jobs matched', value: '1.4k+' },
  { label: 'Resume scans', value: '8.2k' },
  { label: 'Hiring efficiency', value: '42%' }
];

function Home() {
  return (
    <div className="page home-page">
      <section className="hero-panel">
        <div>
          <p className="eyebrow">AI-powered recruitment</p>
          <h1>Hire faster with smarter candidate screening.</h1>
          <p className="lead">
            Match talent to open roles using AI-assisted resume analysis, job visibility,
            and recruiter workflows built for modern teams.
          </p>
          <div className="cta-row">
            <Link to="/register" className="primary-button">Create account</Link>
            <Link to="/jobs" className="secondary-button">Browse jobs</Link>
          </div>
        </div>

        <div className="hero-metrics">
          {stats.map((stat) => (
            <div key={stat.label} className="metric-card">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="feature-grid">
        <article className="feature-card">
          <h3>Resume scoring</h3>
          <p>Detect missing skills, highlight strengths, and rank applicants more efficiently.</p>
        </article>
        <article className="feature-card">
          <h3>Role matching</h3>
          <p>Compare candidate profiles with job requirements to surface the best-fit applicants.</p>
        </article>
        <article className="feature-card">
          <h3>Faster hiring</h3>
          <p>Coordinate recruiter and candidate workflows from a single platform.</p>
        </article>
      </section>
    </div>
  );
}

export default Home;
