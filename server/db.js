import pkg from 'pg';
import dotenv from 'dotenv'
const { Pool } = pkg;

dotenv.config();

export const pool = new Pool({
    user: 'postgres',
    password: process.env.DB_PASS,
    host: 'localhost',
    port: 5432,
    database: 'blockchain_computing'
});

