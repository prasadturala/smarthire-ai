import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, UserCheck, LogOut, FileText, LayoutDashboard, PlusCircle } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('user') || 'null');
  } catch {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav style={{
      backgroundColor: '#ffffff',
      borderBottom: '1px solid var(--border)',
      padding: '0.75rem 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1.25rem', color: 'var(--primary)' }}>
          <Briefcase size={26} color="var(--primary)" />
          <span>SmartHire <span style={{ color: '#0f172a' }}>AI</span></span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <Link to="/jobs" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--secondary)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Briefcase size={16} /> Jobs
          </Link>
          <Link to="/candidate-dashboard" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--secondary)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <LayoutDashboard size={16} /> Candidate Portal
          </Link>
          <Link to="/recruiter-dashboard" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--secondary)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <UserCheck size={16} /> Recruiter Portal
          </Link>
          <Link to="/upload-resume" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--secondary)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <FileText size={16} /> Analyze Resume
          </Link>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {token && user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>{user.name || user.email}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>
                {user.role || 'Member'}
              </div>
            </div>
            <button onClick={handleLogout} className="btn btn-secondary btn-sm" title="Log Out">
              <LogOut size={16} /> Logout
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Link to="/login" className="btn btn-secondary btn-sm">Sign In</Link>
            <Link to="/register" className="btn btn-primary btn-sm">Get Started</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
import { Link, NavLink } from 'react-router-dom';

function Navbar({ user, onLogout }) {
  return (
    <header className="topbar">
      <div className="brand-wrap">
        <Link to="/" className="brand">SmartHire AI</Link>
      </div>

      <nav className="main-nav" aria-label="Main navigation">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/jobs">Jobs</NavLink>
        <NavLink to="/resume-upload">Resume Upload</NavLink>

        {!user ? (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        ) : (
          <>
            <NavLink to={user.role === 'recruiter' ? '/recruiter-dashboard' : '/candidate-dashboard'}>
              Dashboard
            </NavLink>
            <button type="button" className="logout-button" onClick={onLogout}>
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
