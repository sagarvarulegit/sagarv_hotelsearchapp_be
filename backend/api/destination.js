/**
 * @swagger
 * /api/destination:
 *   get:
 *     summary: Get list of available destinations
 *     description: Returns a list of cities where hotels are available
 *     tags: [Destinations]
 *     responses:
 *       200:
 *         description: A list of destinations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *               example: ["New York", "London", "Paris", "Tokyo", "Sydney"]
 */
const CITIES = [
  "New York", "London", "Paris", "Tokyo", "Sydney",
  "Dubai", "Singapore", "Rome", "Barcelona", "Istanbul"
];

/**
 * Get list of available destinations
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getDestinations = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(CITIES);
};

export default getDestinations;
