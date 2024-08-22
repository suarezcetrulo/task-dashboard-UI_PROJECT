const { Pool } = require('pg'); // Import the Pool class from the pg

// Create a new pool for connecting to PostgreSQL
const pool = new Pool({ // Create a new Pool instance
    user: 'myuser', // replace with your PostgreSQL username
    host: 'localhost', // default PostgreSQL host
    database: 'taskdb', // replace with your database name
    password: 'mypassword', // replace with your PostgreSQL password
    port: 5432, // default PostgreSQL port
});

// Test the database connection
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Database connection test failed:', err.stack);
    } else {
        console.log('Database connection test succeeded:', res.rows);
    }
}); //It attempts to execute a simple SELECT NOW() query to ensure that the database connection is established correctly. If there’s an issue with the connection, it will be logged in the console.
// Export the pool for use in other parts of the app
module.exports = pool; 

// The code creates a new Pool instance using the Pool class from the pg module
//  and exports it for use in other parts of the app. The Pool class is used to 
// create a pool of connections to the PostgreSQL database, which can be reused 
// across multiple requests. The pool configuration includes the database connection 
// details such as the username, password, host, database name, and port. The pool instance
// is then exported for use in other parts of the app, such as database queries and transactions.

