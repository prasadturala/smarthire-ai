import { MapPin, DollarSign, Clock, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function JobCard({ job, isRecruiter = false }) {
  const skills = Array.isArray(job.skills_required) 
    ? job.skills_required 
    : (typeof job.skills_required === 'string' ? JSON.parse(job.skills_required || '[]') : []);

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', transition: 'box-shadow 0.2s ease' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <span className="badge badge-primary" style={{ marginBottom: '0.5rem' }}>
            {job.department || 'Engineering'}
          </span>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-main)', marginTop: '0.25rem' }}>
            {job.title}
          </h3>
        </div>
        <span className={`badge ${job.status === 'active' ? 'badge-success' : 'badge-warning'}`}>
          {job.status || 'Active'}
        </span>
      </div>

      <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
        {job.description?.slice(0, 160)}...
      </p>

      {/* Meta tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <MapPin size={15} /> {job.location || 'Remote'}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <Clock size={15} /> {job.job_type || 'Full-time'}
        </div>
        {(job.salary_min || job.salary_max) && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <DollarSign size={15} /> ${job.salary_min?.toLocaleString()} - ${job.salary_max?.toLocaleString()}
          </div>
        )}
      </div>

      {/* Skills tags */}
      {skills.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
          {skills.slice(0, 5).map((skill, index) => (
            <span key={index} style={{
              fontSize: '0.75rem',
              backgroundColor: '#f1f5f9',
              color: '#334155',
              padding: '0.2rem 0.5rem',
              borderRadius: '4px',
              fontWeight: 500
            }}>
              {skill}
            </span>
          ))}
          {skills.length > 5 && (
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', alignSelf: 'center' }}>
              +{skills.length - 5} more
            </span>
          )}
        </div>
      )}

      {/* Actions */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem', borderTop: '1px solid var(--border)', paddingTop: '0.75rem' }}>
        {isRecruiter ? (
          <Link to="/recruiter-dashboard" className="btn btn-secondary btn-sm">
            Review Applications
          </Link>
        ) : (
          <>
            <Link to={`/upload-resume?jobId=${job.id}`} className="btn btn-secondary btn-sm">
              Check Match Score
            </Link>
            <Link to={`/upload-resume?jobId=${encodeURIComponent(job.id)}`} className="btn btn-primary btn-sm">
              Apply with Resume <ChevronRight size={15} />
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
function JobCard({ job }) {
  return (
    <article className="job-card">
      <div className="job-card-header">
        <div>
          <p className="eyebrow">{job.company}</p>
          <h3>{job.title}</h3>
        </div>
        <span className="job-badge">{job.location}</span>
      </div>

      <p className="job-text">{job.description}</p>

      <div className="job-meta">
        <span>{job.salary}</span>
        <span>{job.type || 'Full-time'}</span>
      </div>

      <ul className="requirements-list">
        {(job.requirements || []).map((requirement) => (
          <li key={requirement}>{requirement}</li>
        ))}
      </ul>

      <button type="button" className="primary-button">
        Apply now
      </button>
    </article>
  );
}

export default JobCard;
