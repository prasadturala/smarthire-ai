require('dotenv').config();

const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const { seedData } = require('./dataStore');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));

seedData();

app.get('/', (req, res) => {
  res.json({
    name: 'SmartHire AI API',
    version: '1.0.0',
    status: 'running'
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'smarthire-ai-backend' });
});

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: err.message || 'Something went wrong.'
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`SmartHire AI backend listening on http://localhost:${PORT}`);
  });
}

module.exports = app;
