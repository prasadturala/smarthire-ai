import React, { useState, useEffect } from 'react';
import JobCard from '../components/JobCard';
import { Search, Briefcase } from 'lucide-react';
import api, { getErrorMessage, getItems } from '../services/api';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const isRecruiter = user?.role === 'recruiter';

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await api.get('/jobs');
      setJobs(getItems(res.data, 'jobs'));
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = String(job.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          String(job.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = departmentFilter === 'All' || job.department === departmentFilter;
    return matchesSearch && matchesDept;
  });

  return (
    <div style={{ maxWidth: '1100px', margin: '2rem auto', padding: '0 1rem' }}>
      {/* Title & Filter Bar */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Active Job Openings</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>
          Explore opportunities and evaluate your resume compatibility with our AI matcher.
        </p>

        {error && <div role="alert" className="error-message">{error}</div>}

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              className="form-control"
              placeholder="Search by role or keywords..."
              style={{ paddingLeft: '2.5rem' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="form-control"
            style={{ width: '200px' }}
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
          >
            <option value="All">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Product UI">Product UI</option>
          </select>
        </div>
      </div>

      {/* Job Cards Grid */}
      {loading ? <div className="card">Loading open positions...</div> : !error && <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              isRecruiter={isRecruiter}
            />
          ))
        ) : (
          <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
            <Briefcase size={36} color="var(--text-muted)" style={{ margin: '0 auto 1rem' }} />
            <p style={{ color: 'var(--text-muted)' }}>No jobs found matching your criteria.</p>
          </div>
        )}
      </div>}
    </div>
  );
}
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
