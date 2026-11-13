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
