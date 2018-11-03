import { Pool } from 'pg';

const dotenv = require('dotenv');
const debug = require('debug')('database');

dotenv.config();

const dbConfig = {
  staging: process.env.DATABASE_URL,
  development: process.env.DEV_DATABASE_URL,
  production: process.env.DATABASE_URL,
  test: process.env.TEST_DATABASE_URL,
};

const environment = process.env.NODE_ENV;

export const DB_URL = dbConfig[environment];

debug(`NODE_ENV:: "${environment}"`);

const client = new Pool({
  connectionString: DB_URL,
});

client.on('connect', () => {
  debug('CONNECTED TO DATABASE');
});


export default client;
