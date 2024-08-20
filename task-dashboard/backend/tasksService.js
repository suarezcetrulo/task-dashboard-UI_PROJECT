// Contains business logic for task operations (e.g., updating status).
const { open } = require("sqlite");
const sqlite3 = require("sqlite3").verbose();

// Initialize the database connection
async function initDb() {
    return open({
        filename: './database/tasks.db',
        driver: sqlite3.Database
    });
}

// Retrieve all tasks from the database
const getAllTasks = async () => {
    const db = await initDb(); // Initialize database connection
    try {
        const tasks = await db.all("SELECT * FROM tasks"); // Query to fetch all tasks
        return tasks; // Return the list of tasks
    } catch (error) {
        console.error("Error retrieving tasks:", error);
        throw new Error("Failed to retrieve tasks"); // Handle errors
    } finally {
        await db.close(); // Close the database connection
    }
};

// Add a new task to the database
const addTask = async (newTask) => {
    const db = await initDb(); // Initialize database connection
    try {
        const { task_name, execution_time, status } = newTask;
        const created_at = new Date().toISOString(); // Record the task creation time

        const result = await db.run(
            `INSERT INTO tasks (task_name, created_at, execution_time, status)
             VALUES (?, ?, ?, ?)`,
            [task_name, created_at, execution_time, status]
        );

        const taskId = result.lastID; // Get the ID of the newly inserted task

        return { id: taskId, task_name, created_at, execution_time, status }; // Return the new task
    } catch (error) {
        console.error("Error adding task:", error);
        throw new Error("Failed to add task"); // Handle errors
    } finally {
        await db.close(); // Close the database connection
    }
};

// Update the status of a task in the database
const updateTaskStatus = async (id, newStatus) => {
    const db = await initDb(); // Initialize database connection
    try {
        const result = await db.run(
            `UPDATE tasks SET status = ? WHERE id = ?`,
            [newStatus, id]
        );

        if (result.changes === 0) {
            throw new Error("Task not found"); // Handle case where task was not found
        }

        // Fetch the updated task to return it
        const updatedTask = await db.get("SELECT * FROM tasks WHERE id = ?", id);
        return updatedTask; // Return the updated task
    } catch (error) {
        console.error("Error updating task status:", error);
        throw new Error("Failed to update task status"); // Handle errors
    } finally {
        await db.close(); // Close the database connection
    }
};

module.exports = {
    getAllTasks,
    addTask,
    updateTaskStatus,
};
