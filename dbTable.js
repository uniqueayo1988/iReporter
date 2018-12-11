const { Pool } = require('pg');

const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('connected to the db');
});

/**
 * Create Incident Table
 */
const createIncidentTable = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      incidents(
        id SERIAL PRIMARY KEY,
        createdOn TIMESTAMP NOT NULL,
        createdBy INTEGER REFERENCES users(id) ON DELETE CASCADE,
        type TEXT NOT NULL,
        location TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'draft',
        image TEXT DEFAULT 'incident.jpg',
        title TEXT DEFAULT 'Incident',
        comment TEXT NOT NULL
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Create User Table
 */
const createUserTable = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      users(
        id SERIAL PRIMARY KEY,
        firstname VARCHAR(100) NOT NULL,
        lastname VARCHAR(100) NOT NULL,
        othernames VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        phoneNumber VARCHAR(50),
        username VARCHAR(100),
        registered TIMESTAMP,
        isAdmin BOOLEAN DEFAULT false,
        password VARCHAR(128) NOT NULL
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Drop Incident Table
 */
const dropIncidentTable = () => {
  const queryText = 'DROP TABLE IF EXISTS incidents';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Drop User Table
 */
const dropUserTable = () => {
  const queryText = 'DROP TABLE IF EXISTS users';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Create All Tables
 */
const createAllTables = () => {
  createUserTable();
  createIncidentTable();
};

/**
 * Drop All Tables
 */
const dropAllTables = () => {
  dropUserTable();
  dropIncidentTable();
};

module.exports = {
  createIncidentTable,
  createUserTable,
  createAllTables,
  dropIncidentTable,
  dropUserTable,
  dropAllTables
};

require('make-runnable');
