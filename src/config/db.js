const path = require('path');
const { Pool } = require('pg');
const dotenv = require('dotenv');
const { DB_HOST, DB_PORT, DB_DATABASE, DB_USER, DB_PASSWORD, DB_MAX, DB_IDLETIMEOUTMILLIS, DB_CONNECTIONTIMEOUTMILLIS, DATABASE_URL } = require('./ConstConfing');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const configPool = {
  host: DB_HOST,
  port: DB_PORT,
  database: DB_DATABASE,
  user: DB_USER,
  password: DB_PASSWORD,
  max: DB_MAX,
  idleTimeoutMillis: DB_IDLETIMEOUTMILLIS,
  connectionTimeoutMillis: DB_CONNECTIONTIMEOUTMILLIS,
};

const configPoolRailway = {
  connectionString: DATABASE_URL,
}
const pool = new Pool(!DATABASE_URL ? configPool : configPoolRailway);

module.exports = pool;
