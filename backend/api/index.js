import { createServer } from 'http';
import { parse } from 'url';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createRequire } from 'module';

// Create require in ES module
const require = createRequire(import.meta.url);
const express = require('express');
const { specs, swaggerUi } = require('../config/swagger.cjs');

// Import route handlers
import destination from './destination.js';
import searchResults from './searchResults.js';

const app = express();

// Serve Swagger UI at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));

// Set up CORS middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

// API Routes
app.get('/api/destination', (req, res) => {
  destination(req, res);
});

app.get('/api/searchResults', (req, res) => {
  searchResults(req, res);
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`API documentation available at http://localhost:${PORT}/api-docs`);
});
