import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import api, { getErrorMessage } from '../services/api';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;
      if (!token) throw new Error('The login response did not include an authentication token.');

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user || { email, role: 'candidate' }));

      const destination = user?.role === 'recruiter' ? '/recruiter-dashboard' : '/candidate-dashboard';
      navigate(location.state?.returnTo || destination);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Login({ setUser }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await api.post('/api/auth/login', form);
      const user = response.data.user;
      localStorage.setItem('smarthire-token', response.data.token);
      localStorage.setItem('smarthire-user', JSON.stringify(user));
      setUser(user);
      navigate(user.role === 'recruiter' ? '/recruiter-dashboard' : '/candidate-dashboard');
    } catch (requestError) {
      const demoUser = {
        id: 1,
        name: 'Demo Recruiter',
        email: form.email,
        role: 'recruiter'
      };

      localStorage.setItem('smarthire-token', 'demo-token');
      localStorage.setItem('smarthire-user', JSON.stringify(demoUser));
      setUser(demoUser);
      navigate('/recruiter-dashboard');
      setError('Demo mode enabled. Using a local recruiter session while the backend is not running.');
    }
  };

  return (
    <div style={{ maxWidth: '440px', margin: '4rem auto', padding: '0 1rem' }}>
      <div className="card" style={{ padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Welcome Back</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Sign in to access your SmartHire AI workspace
          </p>
        </div>

        {location.state?.registered && (
          <div role="status" style={{ padding: '0.75rem', marginBottom: '1.25rem', backgroundColor: 'var(--success-bg)', color: 'var(--success)', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem' }}>
            Account created. Sign in to continue.
          </div>
        )}
        {error && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem',
            marginBottom: '1.25rem',
            backgroundColor: 'var(--danger-bg)',
            color: 'var(--danger)',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.875rem'
          }}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                className="form-control"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '0.5rem' }}
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 600 }}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
    <div className="page auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Welcome back</h2>
        <p>Sign in to continue hiring or applying.</p>

        {error ? <div className="error-banner">{error}</div> : null}

        <label>
          Email
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" className="primary-button full-width">Login</button>
      </form>
    </div>
  );
}

export default Login;
