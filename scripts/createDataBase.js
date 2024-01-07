const { Pool } = require('pg');

// Configure the PostgreSQL connection
const pool = new Pool({
    user: 'kareem',
    host: 'localhost',
    database: 'postgres', // Connect to the default 'postgres' database for administrative tasks
    password: 'password',
    port: 5432,
});

// Function to create a new database
async function createDatabase(databaseName) {
    const client = await pool.connect();

    try {
        // Create the new database
        await client.query(`CREATE DATABASE ${databaseName}`);
        console.log(`Database '${databaseName}' created successfully.`);
    } catch (error) {
        console.error('Error creating database:', error.message);
    } finally {
        // Release the client back to the pool
        client.release();
    }
}

// Replace 'your_new_database' with the desired database name
createDatabase('BostaTask');
