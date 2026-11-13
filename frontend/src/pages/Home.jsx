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
