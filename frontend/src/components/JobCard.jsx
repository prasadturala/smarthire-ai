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
