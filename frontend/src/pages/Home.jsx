import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Zap, Bot, Database } from 'lucide-react';

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
          <Sparkles size={16} /> Powered by Python FastAPI & Gemini AI
        </div>
        
        <h1 style={{ fontSize: '3rem', fontWeight: 800, lineHeight: 1.15, marginBottom: '1.25rem', color: 'var(--text-main)' }}>
          Hire Top Talent Faster with <span style={{ color: 'var(--primary)' }}>AI-Powered</span> Screening
        </h1>
        
        <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)', maxWidth: '680px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
          SmartHire AI bridges candidates and recruiters with automated PDF resume parsing, semantic skill gap analysis, and real-time ATS match scoring.
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
