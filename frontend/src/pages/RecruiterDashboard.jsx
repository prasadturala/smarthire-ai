import Sidebar from '../components/Sidebar';

const applicants = [
  { name: 'Maya Singh', role: 'Frontend Engineer', score: '92%' },
  { name: 'Daniel Kim', role: 'Product Analyst', score: '88%' },
  { name: 'Aisha Patel', role: 'AI QA Specialist', score: '90%' }
];

function RecruiterDashboard() {
  return (
    <div className="page dashboard-layout">
      <Sidebar role="recruiter" />

      <div className="dashboard-content">
        <div className="page-header">
          <div>
            <p className="eyebrow">Recruiter dashboard</p>
            <h2>Hiring pipeline</h2>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <span>Open roles</span>
            <strong>18</strong>
          </div>
          <div className="stat-card">
            <span>Shortlisted</span>
            <strong>44</strong>
          </div>
          <div className="stat-card">
            <span>Avg fit</span>
            <strong>89%</strong>
          </div>
        </div>

        <div className="list-card">
          <h3>Top applicants</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Fit score</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map((applicant) => (
                <tr key={applicant.name}>
                  <td>{applicant.name}</td>
                  <td>{applicant.role}</td>
                  <td>{applicant.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RecruiterDashboard;
