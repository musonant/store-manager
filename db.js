/**
 * Credit: Tutorial on Nodejs, Express and postgres
 * url: https://www.codementor.io/olawalealadeusi896/building-a-simple-api-with-nodejs-expressjs-and-postgresql-db-masuu56t7
 */

const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('connected to the db');
});

const createTables = () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS users (
      id                SERIAL PRIMARY KEY NOT NULL,
      userType          varchar(25) NOT NULL,
      email             varchar(100) NOT NULL,
      username          varchar(100) NOT NULL,
      createdAt         timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updatedAt         timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS product_categories (
      id                SERIAL PRIMARY KEY NOT NULL,
      name              varchar(40) not null,
      createdAt         timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updatedAt         timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS products (
      id                SERIAL PRIMARY KEY NOT NULL,
      name              varchar(40) not null,
      quantityInStock   integer NOT NULL,
      price             integer NOT NULL,
      categoryId        int REFERENCES product_categories(id) NOT NULL,
      createdAt         timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updatedAt         timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS sales (
      id                SERIAL PRIMARY KEY NOT NULL,
      attendantId       integer REFERENCES users(id) NOT NULL,
      customerName      varchar(100) NOT NULL,
      createdAt         timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
      totalPay          integer NOT NULL
    );
    CREATE TABLE IF NOT EXISTS sale_product (
      salesId           integer REFERENCES sales(id) NOT NULL,
      productId         integer REFERENCES products(id) NOT NULL,
      quantity          varchar(100) NOT NULL
    );
    CREATE TABLE IF NOT EXISTS admins (
      id                SERIAL PRIMARY KEY NOT NULL,
      role              varchar(40) NOT NULL,
      userId            integer REFERENCES users(id) NOT NULL,
      createdAt         timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `;  

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((res) => {
      console.log(err);
      pool.end();
    });
}

const dropTables = () => {
  const queryText = `
    DROP TABLE IF EXISTS product_category;
    DROP TABLE IF EXISTS sale_product;
    DROP TABLE IF EXISTS sales;
    DROP TABLE IF EXISTS admins;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS product_categories;
    DROP TABLE IF EXISTS users;
    `;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((res) => {
      console.log(err);
      pool.end();
    });
}

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  createTables,
  dropTables
}

require('make-runnable');
