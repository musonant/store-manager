
const { Pool } = require('pg');
const dotenv = require('dotenv');
const debug = require('debug')('database');

dotenv.config();

debug('NODE_ENV', process.env.NODE_ENV);

const DB_URL = process.env.NODE_ENV === 'staging' || process.env.NODE_ENV !== 'production'
  ? process.env.DATABASE_URL : process.env.TEST_DATABASE_URL;
class DB {
  constructor() {
    this.connection = new Pool({
      connectionString: DB_URL,
    });
  }

  async createTables() {
    debug('CONNECTING TO DATABASE: DATABASE URL', DB_URL);
    this.connection.on('connect', () => {
      debug('CONNECTED TO DATABASE');
    });
    const queryText = `
      DROP TABLE IF EXISTS sale_product;
      DROP TABLE IF EXISTS sales;
      DROP TABLE IF EXISTS admins;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS product_categories;
      DROP TABLE IF EXISTS user_tokens;
      DROP TABLE IF EXISTS users;

      CREATE TABLE IF NOT EXISTS users (
        "id" SERIAL PRIMARY KEY NOT NULL,
        "userType" varchar(25) NOT NULL,
        "email" varchar(100) NOT NULL,
        "username" varchar(100),
        "createdAt" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS product_categories (
        "id" SERIAL PRIMARY KEY NOT NULL,
        "name" varchar(40) NOT NULL,
        "createdAt" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS products (
        "id" SERIAL PRIMARY KEY NOT NULL,
        "name" varchar(40) NOT NULL,
        "description" varchar(200),
        "quantityInStock" integer NOT NULL,
        "price" integer NOT NULL,
        "categoryId" integer,
        "createdAt" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS sales (
        "id" SERIAL PRIMARY KEY NOT NULL,
        "attendantId" integer REFERENCES users(id) NOT NULL,
        "customerName" varchar(100) NOT NULL,
        "createdAt" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "totalPay" integer NOT NULL
      );
      CREATE TABLE IF NOT EXISTS sale_product (
        "salesId" integer REFERENCES sales(id) NOT NULL,
        "productId" integer REFERENCES products(id) NOT NULL,
        "quantity" varchar(100) NOT NULL
      );
      CREATE TABLE IF NOT EXISTS admins (
        "id" SERIAL PRIMARY KEY NOT NULL,
        "role" varchar(40) NOT NULL,
        "userId" integer REFERENCES users(id) NOT NULL,
        "createdAt" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS user_tokens (
        "id" SERIAL PRIMARY KEY NOT NULL,
        "token" varchar(40) NOT NULL,
        "userId" integer REFERENCES users(id) NOT NULL,
        "createdAt" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await this.connection.query(queryText);
    this.seedTables();
  }

  async seedTables() {
    const queryText = `
      INSERT INTO users ("userType", "email") VALUES ('store_owner', 'owner@store.demo');
      INSERT INTO users ("userType", "email") VALUES ('store_attendant', 'attendant1@store.demo');
      INSERT INTO users ("userType", "email") VALUES ('store_attendant', 'attendant2@store.demo');
      INSERT INTO users ("userType", "email") VALUES ('store_attendant', 'attendant3@store.demo');
      INSERT INTO users ("userType", "email") VALUES ('store_attendant', 'attendant4@store.demo');

      INSERT INTO product_categories ("name") VALUES ('Furniture');
      INSERT INTO product_categories ("name") VALUES ('Stationaries');
      INSERT INTO product_categories ("name") VALUES ('Musical Equipments');

      INSERT INTO products (
        "name", "description", "quantityInStock", "price", "categoryId"
      ) VALUES (
        'Book', 'dummy description', 23, 2000, 2
      );
      INSERT INTO products (
        "name", "description", "quantityInStock", "price", "categoryId"
      ) VALUES (
        'Clock', 'A red giant grandfather clock', 3, 14000, 1
      );
      INSERT INTO products (
        "name", "description", "quantityInStock", "price", "categoryId"
      ) VALUES (
        'Piano', 'A 7-octave grand piano', 3, 100000, 3
      );
      INSERT INTO products (
        "name", "description", "quantityInStock", "price", "categoryId"
      ) VALUES (
        'Erazer', 'A new one', 3, 100, 2
      );

      INSERT INTO user_tokens ("userId", "token") VALUES (1, 'xcmr2ewesaec00e23490LdL');
      INSERT INTO user_tokens ("userId", "token") VALUES (2, 'OPsdecedsaec00e23490LdL');
      INSERT INTO user_tokens ("userId", "token") VALUES (3, 'KLcxdwedsaecd3e23490LdL');
      INSERT INTO user_tokens ("userId", "token") VALUES (4, 'RcexdwedsaE233e23490LdL');
      INSERT INTO user_tokens ("userId", "token") VALUES (5, 'xcexdwedsaec00e23490LdL');

      INSERT INTO sales (
        "attendantId", "customerName", "totalPay"
      ) VALUES (
        2, 'Nicky Faraday', 2000
      );
      INSERT INTO sales (
        "attendantId", "customerName", "totalPay"
      ) VALUES (
        3, 'James Arthur', 5000
      );

      INSERT INTO sale_product ("salesId", "productId", "quantity" ) VALUES ( 1, 1, 1 );
      INSERT INTO sale_product ("salesId", "productId", "quantity" ) VALUES ( 2, 2, 1 );
      INSERT INTO sale_product ("salesId", "productId", "quantity" ) VALUES ( 2, 3, 1 );

    `;
    await this.connection.query(queryText);
    await this.connection.end();
  }
}

const db = new DB();

db.createTables();
