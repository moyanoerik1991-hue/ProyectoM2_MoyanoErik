const { loadEnvFile } = require('node:process');

if (process.env.NODE_ENV !== 'production') {
  loadEnvFile('.env');
}

const DB_HOST= process.env.DB_HOST;
const DB_PORT= Number(process.env.DB_PORT);
const DB_DATABASE= process.env.DB_DATABASE;
const DB_USER= process.env.DB_USER;
const DB_PASSWORD= process.env.DB_PASSWORD;
const DB_MAX= Number(process.env.DB_MAX);
const DB_IDLETIMEOUTMILLIS= Number(process.env.DB_IDLETIMEOUTMILLIS);
const DB_CONNECTIONTIMEOUTMILLIS= Number(process.env.DB_CONNECTIONTIMEOUTMILLIS);
const DATABASE_URL= process.env.DATABASE_URL

module.exports = {
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  DB_USER,
  DB_PASSWORD,
  DB_MAX,
  DB_IDLETIMEOUTMILLIS,
  DB_CONNECTIONTIMEOUTMILLIS,
  DATABASE_URL
};