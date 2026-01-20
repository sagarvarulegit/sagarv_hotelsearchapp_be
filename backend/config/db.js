import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

let poolConfig;

if (process.env.POSTGRES_URL || process.env.DATABASE_URL) {
    // Production / Vercel Configuration
    poolConfig = {
        connectionString: process.env.POSTGRES_URL || process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    };
} else {
    // Local Development Configuration
    poolConfig = {
        user: process.env.DB_USER || 'postgres',
        host: process.env.DB_HOST || 'localhost',
        database: process.env.DB_NAME || 'hotel_search_db',
        password: process.env.DB_PASSWORD || 'password',
        port: process.env.DB_PORT || 5432,
    };
}

const pool = new Pool(poolConfig);

export default pool;
