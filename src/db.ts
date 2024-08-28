import { Pool } from 'pg';

// Set up the PostgreSQL connection pool
const pool = new Pool({
    user: 'ignaciodezan',
    host: 'localhost',
    database: 'pokemon_api',
    password: 'fisica03',
    port: 5432,
});

export default pool;
