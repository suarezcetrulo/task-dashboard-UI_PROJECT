const pool = require('../config/database.js');  // Import the database pool

// Function to create a new task
const createTask = async (name) => {    // Define the createTask function
    const result = await pool.query(    // Execute a query using the pool
        'INSERT INTO tasks (name, status) VALUES ($1, $2) RETURNING *', // SQL query to insert a new task
        [name, 'Not started']   // Array of values to replace the placeholders in the query
    );
    return result.rows[0];  // Return the newly created task
};

// Function to get all tasks
const getAllTasks = async () => {   // Define the getAllTasks function
    const result = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');    // Execute a query using the pool
    return result.rows; // Return the result of the query
};

// Function to update task status
const updateTaskStatus = async (id, status) => {    // Define the updateTaskStatus function
    const result = await pool.query(    // Execute a query using the pool
        'UPDATE tasks SET status = $1, ended_at = CASE WHEN $1 IN (\'Finished\', \'Terminated\') THEN NOW() ELSE NULL END WHERE id = $2 RETURNING *',   // SQL query to update task status
        [status, id]   // Array of values to replace the placeholders in the query
    );
    return result.rows[0];  // Return the updated task
};

// Export the model functions
module.exports = {  // Export the model functions
    createTask, // Export the createTask function
    getAllTasks,    // Export the getAllTasks function
    updateTaskStatus,   // Export the updateTaskStatus function
};
