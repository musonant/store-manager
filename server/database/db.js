
const { Pool } = require('pg');
const dotenv = require('dotenv');
const debug = require('debug')('database');

dotenv.config();

class DB {
  constructor() {
    this.pool = new Pool({
      connectionString: process.env.TEST_DATABASE_URL,
    });
  }

  async createTables() {
    debug('CONNECTING TO DATABASE');
    this.pool.on('connect', () => {
      debug('CONNECTED TO DATABASE');
    });

    const queryText = `
      DROP TABLE IF EXIST products;
      DROP TABLE IF EXIST product_categories;
      DROP TABLE IF EXIST users;
      DROP TABLE IF EXIST sales;
      DROP TABLE IF EXIST sale_product;
      DROP TABLE IF EXIST admins;

      CREATE TABLE IF NOT EXISTS products (
        id                SERIAL PRIMARY KEY NOT NULL,
        name              varchar(40) not null,
        quantityInStock   integer NOT NULL,
        price             integer NOT NULL,
        categoryId        int REFERENCES product_categories(id) NOT NULL,
        createdAt         timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt         timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS product_categories (
        id                SERIAL PRIMARY KEY NOT NULL,
        name              varchar(40) not null,
        createdAt         timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt         timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS sales (
        id                SERIAL PRIMARY KEY NOT NULL,
        attendantId       integer REFERENCES attendants(id) NOT NULL,
        customerName      varchar(100) NOT NULL,
        createdAt         timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
        totalPay          integer NOT NULL
      );
      CREATE TABLE IF NOT EXISTS users (
        id                SERIAL PRIMARY KEY NOT NULL,
        userType          varchar(25) NOT NULL,
        email             varchar(100) NOT NULL,
        username          varchar(100) NOT NULL,
        createdAt         timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt         timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS sale_product (
        salesId           integer REFERENCES sales(id) NOT NULL,
        productId         integer REFERENCES products(id) NOT NULL,
        quantity          varchar(100) NOT NULL
      )
    `;

    const res = await this.pool.query(queryText);
    debug('QUERY COMPLETED', res);
    await this.pool.end();
  }

  /**
   * Drop Tables
   */
  async dropTables() {
    const queryText = 'DROP TABLE IF EXISTS reflections';
    const res = await this.pool.query(queryText);
    debug('QUERY COMPLETED', res);
    await this.pool.end();
  }
}

const db = new DB();

db.createTables();
