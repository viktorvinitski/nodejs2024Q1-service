import { Client } from 'pg';
import { config } from 'dotenv';

config();

const user = process.env.DB_USERNAME || 'postgres';
const host = process.env.DB_HOST || 'localhost';
const database = 'postgres';
const password = process.env.DB_PASSWORD || 'admin';
const port = +process.env.DB_PORT || 5432;
const databaseName = process.env.DB_NAME || 'homelibrarydb';

const dbParams = {
  user,
  host,
  database,
  password,
  port,
};

(async () => {
  const client = new Client(dbParams);

  try {
    await client.connect();
    await client.query(`CREATE DATABASE ${databaseName}`);
    console.log(`Database '${databaseName}' created successfully`);
  } catch (error) {
    console.error('Error creating database:', error);
  } finally {
    await client.end();
  }
})();
