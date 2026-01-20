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
import hotelDetails from './hotelDetails.js';
import bookHotel from './bookHotel.js';
import fetchBookings from './fetchBookings.js';


const app = express();
app.use(express.json()); // Enable JSON body parsing

// Serve Swagger UI at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));

// Set up CORS middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// API Routes
app.get('/api/destination', (req, res) => {
  destination(req, res);
});

app.get('/api/searchResults', (req, res) => {
  searchResults(req, res);
});

app.get('/api/hotelDetails', (req, res) => {
  hotelDetails(req, res);
});

app.post('/api/bookHotel', (req, res) => {
  bookHotel(req, res);
});

app.get('/api/fetch_bookings', (req, res) => {
  fetchBookings(req, res);
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
