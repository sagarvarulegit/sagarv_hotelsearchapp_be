/**
 * @swagger
 * /api/bookHotel:
 *   post:
 *     summary: Book a hotel
 *     description: Create a booking for a specific hotel.
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - hotelId
 *               - user
 *               - checkIn
 *               - checkOut
 *             properties:
 *               hotelId:
 *                 type: string
 *               user:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *               checkIn:
 *                 type: string
 *                 format: date
 *               checkOut:
 *                 type: string
 *                 format: date
 *               guests:
 *                 type: number
 *               price:
 *                 type: number
 *               currency:
 *                 type: string
 *     responses:
 *       200:
 *         description: Booking successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 bookingId:
 *                   type: string
 *       400:
 *         description: Missing required parameters
 */

import pool from '../config/db.js';

/**
 * Handle hotel booking
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const bookHotel = async (req, res) => {
    // In Vercel serverless, req.body should be parsed if proper middleware is used or if using standard parsers.
    // We will assume Express json middleware is active in index.js for local dev.
    // For Vercel, it handles body parsing automatically for standard content types.

    const { hotelId, user, checkIn, checkOut, guests, price, currency } = req.body || {};

    if (!hotelId || !user || !checkIn || !checkOut) {
        return res.status(400).json({ error: 'Missing required booking details (hotelId, user, checkIn, checkOut)' });
    }

    // Generate a random booking ID
    const bookingId = 'BK_' + Math.random().toString(36).substr(2, 9).toUpperCase();

    try {
        const query = `
            INSERT INTO bookings (booking_id, hotel_id, user_name, user_email, check_in, check_out, guests, price, currency)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *
        `;

        const values = [
            bookingId,
            hotelId,
            user.name,
            user.email,
            checkIn,
            checkOut,
            guests || 1,
            price || 0,
            currency || 'USD'
        ];

        await pool.query(query, values);

        const bookingConfirmation = {
            message: 'Booking successful',
            bookingId,
            status: 'Confirmed',
            details: {
                hotelId,
                guestName: user.name,
                dates: { checkIn, checkOut },
                amount: price ? `${price} ${currency || 'USD'}` : 'Not specified'
            }
        };

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(bookingConfirmation);
    } catch (error) {
        console.error('Database Error:', error);
        res.status(500).json({ error: 'Internal Server Error: Failed to save booking' });
    }
};

export default bookHotel;
