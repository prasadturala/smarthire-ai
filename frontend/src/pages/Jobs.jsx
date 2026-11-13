import { useEffect, useState } from 'react';
import api from '../services/api';
import JobCard from '../components/JobCard';

const fallbackJobs = [
  {
    id: 1,
    title: 'Senior Full Stack Engineer',
    company: 'SmartHire AI',
    location: 'Remote',
    salary: '$120k - $150k',
    description: 'Build scalable hiring workflows and improve resume screening with AI-assisted tooling.',
    requirements: ['React', 'Node.js', 'PostgreSQL', 'Leadership']
  },
  {
    id: 2,
    title: 'Product Analyst',
    company: 'Northstar Labs',
    location: 'Hybrid',
    salary: '$95k - $120k',
    description: 'Understand hiring patterns and improve decision support across recruiting funnel metrics.',
    requirements: ['SQL', 'Python', 'Stakeholder communication', 'Dashboards']
  },
  {
    id: 3,
    title: 'AI QA Specialist',
    company: 'VentureHire',
    location: 'Remote',
    salary: '$80k - $100k',
    description: 'Validate AI recommendations and ensure hiring intelligence quality stays reliable and explainable.',
    requirements: ['Evaluation', 'Prompt design', 'Quality assurance', 'Analytical thinking']
  }
];

function Jobs() {
  const [jobs, setJobs] = useState(fallbackJobs);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get('/api/jobs');
        if (Array.isArray(response.data.jobs) && response.data.jobs.length) {
          setJobs(response.data.jobs);
        }
      } catch (error) {
        setJobs(fallbackJobs);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Open positions</p>
          <h2>Browse jobs</h2>
        </div>
      </div>

      <div className="jobs-grid">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}

export default Jobs;
