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

/**
 * Handle hotel booking
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const bookHotel = (req, res) => {
    // In Vercel serverless, req.body should be parsed if proper middleware is used or if using standard parsers.
    // We will assume Express json middleware is active in index.js for local dev.
    // For Vercel, it handles body parsing automatically for standard content types.

    const { hotelId, user, checkIn, checkOut, guests, price, currency } = req.body || {};

    if (!hotelId || !user || !checkIn || !checkOut) {
        return res.status(400).json({ error: 'Missing required booking details (hotelId, user, checkIn, checkOut)' });
    }

    // Generate a random booking ID
    const bookingId = 'BK_' + Math.random().toString(36).substr(2, 9).toUpperCase();

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
};

export default bookHotel;
