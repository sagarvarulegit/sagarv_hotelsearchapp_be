import pool from './config/db.js';

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    booking_id VARCHAR(20) UNIQUE NOT NULL,
    hotel_id VARCHAR(10) NOT NULL,
    user_name VARCHAR(100) NOT NULL,
    user_email VARCHAR(100) NOT NULL,
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    guests INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'USD',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

async function setup() {
    try {
        console.log('Connecting to database...');
        await pool.query(createTableQuery);
        console.log('Bookings table created or already exists.');
        process.exit(0);
    } catch (err) {
        console.error('Error setting up database:', err);
        process.exit(1);
    }
}

setup();
