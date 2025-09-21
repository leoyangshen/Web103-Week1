import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import launches from './public/scripts/data.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// This line correctly serves files from 'public' at the root of your application
app.use(express.static(path.join(__dirname, 'public')));

// API route to get all launches
app.get('/launches', (req, res) => {
    res.json(launches);
});

// API route to get a single launch by ID
app.get('/launches/:launchId', (req, res) => {
//    const launchId = parseInt(req.params.launchId);
//    const launch = launches.find(l => l.id === launchId);

//    if (launch) {
//        res.json(launch);
//    } else {
//        res.status(404).send('Launch not found');
//    }
      res.sendFile(path.join(__dirname, 'public', 'launch.html'));	
});
app.get('/api/launches/:launchId', (req, res) => {
    const launchId = parseInt(req.params.launchId);
    const launch = launches.find(l => l.id === launchId);
    if (launch) {
        res.json(launch); // <-- This sends JSON
    } else {
        res.status(404).send('Launch not found');
    }
});
// Fallback route to serve index.html for single-page application style routing
// app.get('*', (req, res) => {
  //   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
