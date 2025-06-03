import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(join(__dirname, 'public')));

// API endpoint for profile information
app.get('/api/profile', (req, res) => {
  const profile = {
    name: 'Emmanuel Kesseh',
    title: 'Backend Software Developer',
    company: 'AmaliTech GmbH',
    focus: 'AWS Microservices',
    skills: [
      'Node.js',
      'Express',
      'AWS',
      'Microservices',
      'Database Design',
      'API Development',
      'Backend Architecture'
    ],
    education: 'Bachelor of Science in Actuarial Science',
    experience: '2+ years in backend development',
    about: 'Passionate backend developer with a focus on building scalable and efficient systems. Currently expanding my expertise in AWS microservices architecture with AmaliTech GmbH.'
  };
  
  res.json(profile);
});

// Serve the main HTML page for all routes (SPA approach)
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});