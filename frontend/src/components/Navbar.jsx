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
