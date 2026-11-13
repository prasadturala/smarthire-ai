const { jobs } = require('../dataStore');

const getJobs = (req, res) => {
  return res.status(200).json({
    count: jobs.length,
    jobs
  });
};

const createJob = (req, res) => {
  const { title, company, location, salary, description, requirements } = req.body;

  if (!title || !company || !location || !description) {
    return res.status(400).json({
      message: 'Title, company, location and description are required.'
    });
  }

  const job = {
    id: jobs.length ? jobs[jobs.length - 1].id + 1 : 1,
    title: String(title).trim(),
    company: String(company).trim(),
    location: String(location).trim(),
    salary: salary ? String(salary).trim() : 'Negotiable',
    description: String(description).trim(),
    requirements: Array.isArray(requirements) ? requirements : [],
    createdBy: req.user.id,
    createdAt: new Date().toISOString()
  };

  jobs.push(job);

  return res.status(201).json({
    message: 'Job created successfully',
    job
  });
};

module.exports = { getJobs, createJob };
