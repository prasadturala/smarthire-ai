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

const analyzeResume = ({ fileName, text = '' }) => {
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
