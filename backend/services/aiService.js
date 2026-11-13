const axios = require('axios');

const DEFAULT_SKILLS = [
  'javascript',
  'node',
  'react',
  'python',
  'sql',
  'postgresql',
  'express',
  'api',
  'communication',
  'teamwork'
];

const getAiServiceBaseUrl = () => {
  const configuredUrl = process.env.AI_SERVICE_URL || 'http://localhost:8000';
  return configuredUrl.replace(/\/$/, '');
};

const analyzeResume = async ({ fileName, text = '' }) => {
  const aiServiceUrl = getAiServiceBaseUrl();

  try {
    const response = await axios.post(`${aiServiceUrl}/analyze`, {
      file_name: fileName || 'resume.pdf',
      text: text || ''
    }, {
      timeout: 5000
    });

    if (response?.data) {
      return response.data;
    }
  } catch (error) {
    console.warn('AI service unavailable, using local resume analysis fallback.', error.message);
  }

  const normalizedText = (text || '').toLowerCase();
  const matchedSkills = DEFAULT_SKILLS.filter((skill) => normalizedText.includes(skill));
  const missingSkills = DEFAULT_SKILLS.filter((skill) => !normalizedText.includes(skill));
  const resumeName = fileName || 'resume.pdf';
  const qualityScore = Math.min(
    100,
    Math.max(55, Math.round((matchedSkills.length / DEFAULT_SKILLS.length) * 100))
  );

  return {
    fileName: resumeName,
    matchPercentage: qualityScore,
    matchedSkills,
    missingSkills: missingSkills.slice(0, 5),
    summary: `Resume analysis for ${resumeName} suggests ${qualityScore}% alignment with the job profile.`,
    strengths: matchedSkills.length > 0 ? matchedSkills : ['Strong communication'],
    recommendedNextStep: qualityScore >= 75 ? 'Proceed to interview stage.' : 'Improve key skill gaps before follow-up.'
  };
};

module.exports = { analyzeResume };
