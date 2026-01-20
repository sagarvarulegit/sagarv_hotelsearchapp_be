import pool from '../config/db.js';

/**
 * @swagger
 * /api/fetch_bookings:
 *   get:
 *     summary: Fetch all hotel bookings
 *     description: Returns a list of all bookings stored in the database.
 *     tags: [Bookings]
 *     responses:
 *       200:
 *         description: A list of bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   booking_id:
 *                     type: string
 *                   hotel_id:
 *                     type: string
 *                   user_name:
 *                     type: string
 *                   user_email:
 *                     type: string
 *                   check_in:
 *                     type: string
 *                     format: date
 *                   check_out:
 *                     type: string
 *                     format: date
 *                   guests:
 *                     type: integer
 *                   price:
 *                     type: number
 *                   currency:
 *                     type: string
 *                   created_at:
 *                     type: string
 *                     format: date-time
 */

/**
 * Fetch all bookings from the database
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const fetchBookings = async (req, res) => {
    try {
        const query = 'SELECT * FROM bookings ORDER BY created_at DESC';
        const result = await pool.query(query);

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Database Error:', error);
        res.status(500).json({ error: 'Internal Server Error: Failed to fetch bookings' });
    }
};

export default fetchBookings;
