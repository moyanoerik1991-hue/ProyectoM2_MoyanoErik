const path = require('path');
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  max: Number(process.env.DB_MAX),
  idleTimeoutMillis: Number(process.env.DB_IDLETIMEOUTMILLIS),
  connectionTimeoutMillis: Number(process.env.DB_CONNECTIONTIMEOUTMILLIS),
  connectionString: process.env.DATABASE_URL
});

module.exports = pool;
