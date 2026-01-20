/**
 * @swagger
 * /api/hotelDetails:
 *   get:
 *     summary: Get details of a specific hotel
 *     description: Returns detailed information for a specific hotel based on hotelId
 *     tags: [Hotels]
 *     parameters:
 *       - in: query
 *         name: hotelId
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier of the hotel (e.g., "New York_1")
 *         example: "New York_1"
 *     responses:
 *       200:
 *         description: Detailed information about the hotel
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "New York_1"
 *                 name:
 *                   type: string
 *                   example: "Grand NYC Hotel"
 *                 city:
 *                   type: string
 *                   example: "New York"
 *                 description:
 *                   type: string
 *                   example: "A luxurious stay in the heart of the city."
 *                 amenities:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["WiFi", "Pool", "Spa"]
 *                 price_per_night:
 *                   type: number
 *                   example: 250
 *                 rating:
 *                   type: number
 *                   example: 4.5
 *                 policies:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["No smoking", "Check-in after 2PM"]
 *                 image_url:
 *                   type: string
 *                   format: uri
 *       404:
 *         description: Hotel not found
 *       400:
 *         description: Missing required parameters
 */

const HOTELS_DATA = {
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

const AMENITIES = ["Free WiFi", "Swimming Pool", "Fitness Center", "Restaurant", "Room Service", "Bar", "Parking"];
const POLICIES = ["Check-in: 3:00 PM", "Check-out: 11:00 AM", "No Pets Allowed", "Non-Smoking Rooms"];
const DESCRIPTIONS = [
    "Experience luxury and comfort in the heart of the city.",
    "A perfect getaway for business and leisure travelers.",
    "Enjoy breathtaking views and world-class service."
];

/**
 * Get details of a specific hotel
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getHotelDetails = (req, res) => {
    const { hotelId } = req.query;

    if (!hotelId) {
        return res.status(400).json({ error: 'hotelId parameter is required' });
    }

    // Parse ID: 4-digit number "1001"
    // Formula: 1000 + (CityIndex * 100) + HotelIndex + 1
    const idNum = parseInt(hotelId, 10);
    if (isNaN(idNum) || idNum < 1000) {
        return res.status(404).json({ error: 'Invalid hotelId format' });
    }

    const cityIndex = Math.floor((idNum - 1000) / 100);
    const hotelIndex = (idNum - 1000) % 100 - 1;

    const cityNames = Object.keys(HOTELS_DATA);
    if (cityIndex >= cityNames.length || cityIndex < 0) {
        return res.status(404).json({ error: 'City not found' });
    }

    const city = cityNames[cityIndex];
    const cityHotels = HOTELS_DATA[city];

    if (!cityHotels || !cityHotels[hotelIndex]) {
        return res.status(404).json({ error: 'Hotel not found' });
    }

    const hotelName = cityHotels[hotelIndex];

    // Deterministic dummy data based on index/city
    const dummyDetail = {
        id: hotelId,
        name: hotelName,
        city: city,
        description: DESCRIPTIONS[hotelIndex % DESCRIPTIONS.length],
        amenities: AMENITIES.slice(0, 4 + (hotelIndex % 3)), // Vary amenities
        price_per_night: 100 + (hotelIndex * 50) + (city.length * 10),
        rating: 3.5 + (hotelIndex % 1.5),
        policies: POLICIES,
        image_url: sample_images[hotelIndex % sample_images.length]
    };

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(dummyDetail);
};

export default getHotelDetails;
