/**
 * @swagger
 * components:
 *   schemas:
 *     Hotel:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the hotel
 *           example: "Grand NYC Hotel"
 *         city:
 *           type: string
 *           description: The city where the hotel is located
 *           example: "New York"
 *         available_from:
 *           type: string
 *           format: date
 *           nullable: true
 *           description: Check-in date (YYYY-MM-DD)
 *           example: "2023-12-15"
 *         available_to:
 *           type: string
 *           format: date
 *           nullable: true
 *           description: Check-out date (YYYY-MM-DD)
 *           example: "2023-12-20"
 *         image_url:
 *           type: string
 *           format: uri
 *           description: URL of the hotel image
 *           example: "https://example.com/hotel1.jpg"
 */

/**
 * @swagger
 * /api/searchResults:
 *   get:
 *     summary: Search for hotels in a specific city
 *     description: Returns a list of hotels available in the specified city for the given dates
 *     tags: [Hotels]
 *     parameters:
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         required: true
 *         description: City to search for hotels
 *         example: "New York"
 *       - in: query
 *         name: from_date
 *         schema:
 *           type: string
 *           format: date
 *         description: Check-in date (YYYY-MM-DD)
 *         example: "2023-12-15"
 *       - in: query
 *         name: to_date
 *         schema:
 *           type: string
 *           format: date
 *         description: Check-out date (YYYY-MM-DD)
 *         example: "2023-12-20"
 *     responses:
 *       200:
 *         description: A list of available hotels
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Hotel'
 *       400:
 *         description: Missing required parameters
 */

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
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&auto=format&fit=crop"
];

/**
 * Search for hotels in a specific city
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const searchHotels = (req, res) => {
  const { city, from_date, to_date } = req.query;
  
  if (!city) {
    return res.status(400).json({ error: 'City parameter is required' });
  }
  
  const hotels = HOTELS[city] || [];
  const results = hotels.map((hotelName, index) => ({
    name: hotelName,
    city,
    available_from: from_date || null,
    available_to: to_date || null,
    image_url: sample_images[index % sample_images.length]
  }));
  
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(results);
};

export default searchHotels;
