import { createServer } from 'http';
import { parse } from 'url';
import destination from './destination.js';
import searchResults from './searchResults.js';

const server = createServer((req, res) => {
  const { pathname, query } = parse(req.url, true);
  
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', '*');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Route requests
  if (pathname === '/api/destination' && req.method === 'GET') {
    return destination(req, res);
  } else if (pathname === '/api/searchResults' && req.method === 'GET') {
    req.query = query;
    return searchResults(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
