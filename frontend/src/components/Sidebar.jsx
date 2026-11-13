import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Briefcase, FileUp, CheckCircle, BarChart3, Settings } from 'lucide-react';

export default function Sidebar({ role = 'candidate' }) {
  const candidateLinks = [
    { to: '/candidate-dashboard', label: 'My Dashboard', icon: <LayoutDashboard size={18} /> },
    { to: '/jobs', label: 'Browse Jobs', icon: <Briefcase size={18} /> },
    { to: '/upload-resume', label: 'Resume Analyzer', icon: <FileUp size={18} /> },
  ];

  const recruiterLinks = [
    { to: '/recruiter-dashboard', label: 'Recruiter Hub', icon: <LayoutDashboard size={18} /> },
    { to: '/jobs', label: 'Manage Jobs', icon: <Briefcase size={18} /> },
    { to: '/upload-resume', label: 'Screen Resume', icon: <CheckCircle size={18} /> },
  ];

  const links = role === 'recruiter' ? recruiterLinks : candidateLinks;

  return (
    <aside style={{
      width: '240px',
      backgroundColor: '#ffffff',
      borderRight: '1px solid var(--border)',
      padding: '1.5rem 1rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    }}>
      <div style={{ padding: '0 0.5rem 0.75rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {role === 'recruiter' ? 'Recruiter Navigation' : 'Candidate Navigation'}
      </div>
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.625rem 0.875rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.875rem',
            fontWeight: 500,
            color: isActive ? 'var(--primary)' : 'var(--secondary)',
            backgroundColor: isActive ? 'var(--primary-light)' : 'transparent',
            transition: 'all 0.15s ease'
          })}
        >
          {link.icon}
import { NavLink } from 'react-router-dom';

function Sidebar({ role }) {
  const links =
    role === 'recruiter'
      ? [
          { to: '/recruiter-dashboard', label: 'Overview' },
          { to: '/jobs', label: 'Open roles' },
          { to: '/resume-upload', label: 'Resume analysis' }
        ]
      : [
          { to: '/candidate-dashboard', label: 'Overview' },
          { to: '/jobs', label: 'Browse jobs' },
          { to: '/resume-upload', label: 'Upload resume' }
        ];

  return (
    <aside className="sidebar">
      <p className="sidebar-label">Navigation</p>
      {links.map((link) => (
        <NavLink key={link.to} to={link.to} className="sidebar-link">
          {link.label}
        </NavLink>
      ))}
    </aside>
  );
}

export default Sidebar;
