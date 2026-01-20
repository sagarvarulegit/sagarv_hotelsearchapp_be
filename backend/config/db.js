import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;

const pool = new Pool({
    connectionString: connectionString,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

if (!connectionString) {
    // Fallback for local development if NO connection string is set
    pool.options = {
        user: process.env.DB_USER || 'postgres',
        host: process.env.DB_HOST || 'localhost',
        database: process.env.DB_NAME || 'hotel_search_db',
        password: process.env.DB_PASSWORD || 'password',
        port: process.env.DB_PORT || 5432,
    };
}

export default pool;
