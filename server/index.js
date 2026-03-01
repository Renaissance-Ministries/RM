const express = require('express');
const path = require('path');
const cors = require('cors');
const { loadEnv } = require('./config/env');
const { initializeDatabase } = require('./config/database');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');

// Load and validate environment
loadEnv();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json());

// Routes
app.use('/api', routes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'christos-voting-network' });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  const clientDist = path.resolve(__dirname, '../client/dist');
  app.use(express.static(clientDist));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

// Error handler
app.use(errorHandler);

// Initialize database and start server
initializeDatabase();

app.listen(PORT, () => {
  console.log(`Christos Voting Network server running on port ${PORT}`);
});
