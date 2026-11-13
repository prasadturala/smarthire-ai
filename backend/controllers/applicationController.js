const { jobs, applications } = require('../dataStore');
const { analyzeResume } = require('../services/aiService');

const submitApplication = (req, res) => {
  const { jobId, resumeSummary } = req.body;

  if (!jobId) {
    return res.status(400).json({ message: 'A jobId is required.' });
  }

  const job = jobs.find((candidate) => candidate.id === Number(jobId));
  if (!job) {
    return res.status(404).json({ message: 'Job not found.' });
  }

  const application = {
    id: applications.length ? applications[applications.length - 1].id + 1 : 1,
    jobId: Number(jobId),
    jobTitle: job.title,
    candidateId: req.user.id,
    candidateName: req.user.name,
    resumeSummary: resumeSummary || 'Resume submitted for review.',
    status: 'pending',
    submittedAt: new Date().toISOString()
  };

  applications.push(application);

  return res.status(201).json({
    message: 'Application submitted successfully',
    application
  });
};

const getApplications = (req, res) => {
  if (req.user.role === 'candidate') {
    const candidateApplications = applications.filter(
      (application) => application.candidateId === req.user.id
    );
    return res.status(200).json({ count: candidateApplications.length, applications: candidateApplications });
  }

  return res.status(200).json({ count: applications.length, applications });
};

const analyzeResumeUpload = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Please upload a resume file.' });
  }

  const text = req.file.buffer.toString('utf8');
  const analysis = analyzeResume({ fileName: req.file.originalname, text });

  return res.status(200).json({
    message: 'Resume analyzed successfully',
    analysis
  });
};

module.exports = { submitApplication, getApplications, analyzeResumeUpload };
