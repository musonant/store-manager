import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DEV_URL || 'postgresql://postgres:secret@localhost:5432/store_manager';

const client = new pg.Client(connectionString);
client.connect();

const query = `
  DROP TABLE IF EXIST products;
  `;

// query = 'CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)';

client.query(query, (err) => {
  if (err) {
    return err.message;
  }
  client.end();
});
