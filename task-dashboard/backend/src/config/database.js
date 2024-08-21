const { Pool } = require('pg'); // Import the Pool class from the pg

// Create a new pool for connecting to PostgreSQL
const pool = new Pool({ // Create a new Pool instance
    user: 'your_db_user', // replace with your PostgreSQL username
    host: 'localhost', // default PostgreSQL host
    database: 'your_db_name', // replace with your database name
    password: 'your_db_password', // replace with your PostgreSQL password
    port: 5432, // default PostgreSQL port
});

// Export the pool for use in other parts of the app
module.exports = pool; 

// The code creates a new Pool instance using the Pool class from the pg module
//  and exports it for use in other parts of the app. The Pool class is used to 
// create a pool of connections to the PostgreSQL database, which can be reused 
// across multiple requests. The pool configuration includes the database connection 
// details such as the username, password, host, database name, and port. The pool instance
// is then exported for use in other parts of the app, such as database queries and transactions.

