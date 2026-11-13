const users = [
  {
    id: 1,
    name: 'Recruiter Admin',
    email: 'recruiter@smarthire.ai',
    password: '$2a$10$Q4nzb3r/2Q2XgI8Q4J2N8eQib7l0SJOSnA5glR3t4lK4gP3nA1eje',
    role: 'recruiter',
    createdAt: new Date().toISOString()
  }
];

const jobs = [
  {
    id: 1,
    title: 'Senior Full Stack Engineer',
    company: 'SmartHire AI',
    location: 'Remote',
    salary: '$120k - $150k',
    description: 'Build scalable hiring workflows and improve resume screening using AI.',
    requirements: ['React', 'Node.js', 'PostgreSQL', 'Team leadership'],
    createdBy: 1,
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    title: 'Data Analyst',
    company: 'SmartHire AI',
    location: 'Hybrid',
    salary: '$90k - $110k',
    description: 'Analyze hiring trends and correlate candidate quality with role outcomes.',
    requirements: ['SQL', 'Python', 'Analytics', 'Communication'],
    createdBy: 1,
    createdAt: new Date().toISOString()
  }
];

const applications = [];

const seedData = () => {
  if (users.length === 0) {
    users.push({
      id: 1,
      name: 'Recruiter Admin',
      email: 'recruiter@smarthire.ai',
      password: '$2a$10$Q4nzb3r/2Q2XgI8Q4J2N8eQib7l0SJOSnA5glR3t4lK4gP3nA1eje',
      role: 'recruiter',
      createdAt: new Date().toISOString()
    });
  }

  if (jobs.length === 0) {
    jobs.push({
      id: 1,
      title: 'Senior Full Stack Engineer',
      company: 'SmartHire AI',
      location: 'Remote',
      salary: '$120k - $150k',
      description: 'Build scalable hiring workflows and improve resume screening using AI.',
      requirements: ['React', 'Node.js', 'PostgreSQL', 'Team leadership'],
      createdBy: 1,
      createdAt: new Date().toISOString()
    });
  }
};

module.exports = {
  users,
  jobs,
  applications,
  seedData
};
