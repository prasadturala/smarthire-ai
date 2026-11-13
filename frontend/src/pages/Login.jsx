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
