import Sidebar from '../components/Sidebar';

const applications = [
  { role: 'Senior Frontend Engineer', status: 'Interview scheduled', score: '91%' },
  { role: 'Product Designer', status: 'Application review', score: '84%' },
  { role: 'Systems Analyst', status: 'Shortlisted', score: '88%' }
];

function CandidateDashboard() {
  return (
    <div className="page dashboard-layout">
      <Sidebar role="candidate" />

      <div className="dashboard-content">
        <div className="page-header">
          <div>
            <p className="eyebrow">Candidate dashboard</p>
            <h2>Application overview</h2>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <span>Applications</span>
            <strong>12</strong>
          </div>
          <div className="stat-card">
            <span>Interviews</span>
            <strong>3</strong>
          </div>
          <div className="stat-card">
            <span>Profile fit</span>
            <strong>86%</strong>
          </div>
        </div>

        <div className="list-card">
          <h3>Recent applications</h3>
          <table>
            <thead>
              <tr>
                <th>Role</th>
                <th>Status</th>
                <th>Fit score</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application) => (
                <tr key={application.role}>
                  <td>{application.role}</td>
                  <td>{application.status}</td>
                  <td>{application.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CandidateDashboard;
