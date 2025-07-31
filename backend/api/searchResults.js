const HOTELS = {
  "New York": ["Grand NYC Hotel", "Central Park Inn", "Empire Suites"],
  "London": ["Royal London Hotel", "Thames View Inn", "Buckingham Suites"],
  "Paris": ["Eiffel Hotel", "Louvre Palace", "Seine River Inn"],
  "Tokyo": ["Shinjuku Stay", "Tokyo Tower Hotel", "Sakura Inn"],
  "Sydney": ["Opera House Hotel", "Harbour View Inn", "Bondi Beach Suites"],
  "Dubai": ["Burj Al Arab Hotel", "Palm Resort", "Desert Oasis Inn"],
  "Singapore": ["Marina Bay Hotel", "Sentosa Suites", "Orchard Inn"],
  "Rome": ["Colosseum Hotel", "Vatican View Inn", "Roman Holiday Suites"],
  "Barcelona": ["Sagrada Familia Hotel", "Barceloneta Inn", "Gothic Quarter Suites"],
  "Istanbul": ["Blue Mosque Hotel", "Hagia Sophia Inn", "Bosphorus Suites"]
};

const sample_images = [
  "https://unsplash.com/photos/two-chairs-sitting-in-front-of-a-swimming-pool-k_My4rXk4Lc",
  "https://unsplash.com/photos/a-large-swimming-pool-surrounded-by-palm-trees-_pPHgeHz1uk",
  "https://unsplash.com/photos/brown-wooden-table-and-chairs-on-brown-wooden-deck-near-body-of-water-during-daytime-TAgGZWz6Qg8"
];

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { city, from_date, to_date } = req.query;
  const hotels = HOTELS[city] || [];
  const results = hotels.map((h, i) => ({
    name: h,
    city,
    available_from: from_date || null,
    available_to: to_date || null,
    image_url: sample_images[i % sample_images.length]
  }));
  
  res.status(200).json(results);
};
