const pool = require('../config/database.js');  // Import the database pool

// Function to create a new task
const createTask = async (name) => { 
    try {
        // Execute a query using the pool
        const result = await pool.query(    
            'INSERT INTO tasks (name, status) VALUES ($1, $2) RETURNING *', 
            [name, 'Not started']   // Array of values to replace the placeholders in the query
        );
        return result.rows[0];  // Return the newly created task
    } catch (error) {
        console.error('Error creating task:', error.message); // Log the error message
        console.error('Stack trace:', error.stack); // Log the stack trace for more context
        throw error;  // Re-throw the error to be handled by the controller
    }
};

// Function to get all tasks
const getAllTasks = async () => {   
    const result = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');    
    return result.rows; 
};

// Function to update task status
const updateTaskStatus = async (id, status) => {    
    const result = await pool.query(    
        'UPDATE tasks SET status = $1, ended_at = CASE WHEN $1 IN (\'Finished\', \'Terminated\') THEN NOW() ELSE NULL END WHERE id = $2 RETURNING *',   
        [status, id]   
    );
    return result.rows[0];  
};

// Export the model functions
module.exports = {  
    createTask, 
    getAllTasks,    
    updateTaskStatus,   
};
