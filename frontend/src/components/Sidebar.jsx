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
