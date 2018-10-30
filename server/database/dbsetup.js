
const { Pool } = require('pg');
const dotenv = require('dotenv');
const debug = require('debug')('database');

dotenv.config();

// Ensure database is created locally using this command
// psql -c 'create database store_manager_test' -U postgres
// on password prompt, provide the db user password
// The order of the tables in the queryText below is important

// For DROP queries, tables whose primary keys are used as foreign key reference
// on other tables will fail to be deleted
// when the other tables referencing them are not deleted already.
// So, we ensure we drop tables that reference others first before
// attempting to drop the 'parent' tables

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
      DROP TABLE IF EXISTS sale_product;
      DROP TABLE IF EXISTS sales;
      DROP TABLE IF EXISTS admins;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS product_categories;
      DROP TABLE IF EXISTS users;

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

    const res = await this.pool.query(queryText);
    debug('QUERY COMPLETED', res);
    await this.pool.end();
  }
}

const db = new DB();

db.createTables();
