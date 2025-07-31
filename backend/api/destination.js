const CITIES = [
  "New York", "London", "Paris", "Tokyo", "Sydney",
  "Dubai", "Singapore", "Rome", "Barcelona", "Istanbul"
];

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  res.status(200).json(CITIES);
};
