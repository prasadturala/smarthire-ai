import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, AlertCircle } from 'lucide-react';
import api, { getErrorMessage } from '../services/api';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'candidate' // 'candidate' or 'recruiter'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/register', formData);
      const { token, user } = response.data;

      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user || formData));
        navigate(formData.role === 'recruiter' ? '/recruiter-dashboard' : '/candidate-dashboard');
      } else {
        navigate('/login', { state: { registered: true } });
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Register({ setUser }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'candidate' });
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await api.post('/api/auth/register', form);
      const user = response.data.user;
      localStorage.setItem('smarthire-token', response.data.token);
      localStorage.setItem('smarthire-user', JSON.stringify(user));
      setUser(user);
      navigate(user.role === 'recruiter' ? '/recruiter-dashboard' : '/candidate-dashboard');
    } catch (requestError) {
      const demoUser = {
        id: Date.now(),
        name: form.name,
        email: form.email,
        role: form.role
      };

      localStorage.setItem('smarthire-token', 'demo-token');
      localStorage.setItem('smarthire-user', JSON.stringify(demoUser));
      setUser(demoUser);
      navigate(form.role === 'recruiter' ? '/recruiter-dashboard' : '/candidate-dashboard');
      setError('Demo mode enabled. Account creation was simulated locally because the backend is unavailable.');
    }
  };

  return (
    <div style={{ maxWidth: '480px', margin: '3.5rem auto', padding: '0 1rem' }}>
      <div className="card" style={{ padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Create an Account</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Join SmartHire AI as a Candidate or Recruiter
          </p>
        </div>

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

        <form onSubmit={handleSubmit}>
          {/* Role selector */}
          <div className="form-group">
            <label className="form-label">I am joining as:</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'candidate' })}
                style={{
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  border: `2px solid ${formData.role === 'candidate' ? 'var(--primary)' : 'var(--border)'}`,
                  backgroundColor: formData.role === 'candidate' ? 'var(--primary-light)' : '#ffffff',
                  color: formData.role === 'candidate' ? 'var(--primary)' : 'var(--secondary)',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  cursor: 'pointer'
                }}
              >
                Candidate
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'recruiter' })}
                style={{
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  border: `2px solid ${formData.role === 'recruiter' ? 'var(--primary)' : 'var(--border)'}`,
                  backgroundColor: formData.role === 'recruiter' ? 'var(--primary-light)' : '#ffffff',
                  color: formData.role === 'recruiter' ? 'var(--primary)' : 'var(--secondary)',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  cursor: 'pointer'
                }}
              >
                Recruiter
              </button>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Work or Personal Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="name@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Create Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="At least 8 characters"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '0.5rem' }}
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
    <div className="page auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Create an account</h2>
        <p>Start finding jobs or screening talent.</p>

        {error ? <div className="error-banner">{error}</div> : null}

        <label>
          Full name
          <input type="text" name="name" value={form.name} onChange={handleChange} required />
        </label>

        <label>
          Email
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </label>

        <label>
          Password
          <input type="password" name="password" value={form.password} onChange={handleChange} required />
        </label>

        <label>
          Account type
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="candidate">Candidate</option>
            <option value="recruiter">Recruiter</option>
          </select>
        </label>

        <button type="submit" className="primary-button full-width">Register</button>
      </form>
    </div>
  );
}

export default Register;
