// Import necessary modules for SQLite database operations
const { open } = require("sqlite");
const sqlite3 = require("sqlite3").verbose();

let db; // A variable to hold our database connection.

/**
 * Initializes the SQLite database and creates the necessary tables if they don't already exist.
 * This function needs to be called when the server starts up to ensure the database is ready
 * to be interacted with.
 */
async function initDb() {
  try {
    // Opens a connection to the SQLite database file. If the file does not exist, SQLite will create it.
    db = await open({
      filename: '../database/tasks.db', // The path to our database file.
      driver: sqlite3.Database         // Specifies which database driver to use, sqlite3 in this case.
    });

    // SQL statement to create a 'tasks' table if it does not already exist.
    // This table will store the tasks with their details.
    await db.exec(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT, // An auto-incrementing ID for each task.
        task_name TEXT,                       // The name of the task.
        created_at TEXT,                      // Timestamp for when the task was created.
        ended_at TEXT,                        // Timestamp for when the task ended.
        execution_time INTEGER,               // The duration of the task in minutes.
        status TEXT                           // Current status of the task.
      )
    `);
  } catch (error) {
    // Log any errors that occur during database initialization or table creation.
    console.error("Error initializing the database:", error);
  }
}

/**
 * Retrieves all tasks from the database.
 * This function is typically used to display tasks on the UI.
 */
async function getTasks() {
  try {
    // Executes a SQL query to select all columns from the 'tasks' table.
    return await db.all("SELECT * FROM tasks");
  } catch (error) {
    // Log any errors that occur during fetching the tasks and throw to handle it upstream.
    console.error("Error retrieving tasks:", error);
    throw error; // Rethrow to let the caller handle the error appropriately.
  }
}

/**
 * Updates the status of a specific task in the database.
 * @param {object} task - An object containing the task's ID and the new status.
 */
async function updateTaskStatus(task) {
  try {
    // Executes a SQL query to update the status of a task based on its ID.
    return await db.run(
      `UPDATE tasks SET status = ? WHERE id = ?`, // '?' placeholders are filled with values in the array that follows.
      [task.status, task.id] // First '?' is replaced with `task.status`, and second '?' is replaced with `task.id`.
    );
  } catch (error) {
    // Log any errors that occur during updating the task's status and throw to handle it upstream.
    console.error("Error updating task status:", error);
    throw error; // Rethrow to let the caller handle the error appropriately.
  }
}

/**
 * Inserts a new task into the database.
 * @param {object} newTask - An object containing details about the new task.
 */
async function addTaskToDb(newTask) {
  try {
    const { task_name, execution_time, status } = newTask;
    const created_at = new Date().toISOString(); // Sets the created_at field to the current time and date.
    // Executes a SQL query to insert a new record into the 'tasks' table.
    return await db.run(
      `INSERT INTO tasks (task_name, created_at, execution_time, status) VALUES (?, ?, ?, ?)`, // SQL statement with placeholders.
      [task_name, created_at, execution_time, status] // Array that replaces the placeholders in the SQL statement.
    );
  } catch (error) {
    // Log any errors that occur during adding a new task and throw to handle it upstream.
    console.error("Error adding new task:", error);
    throw error; // Rethrow to let the caller handle the error appropriately.
  }
}

// Export functions to make them available for import in other files.
module.exports = {
  initDb,
  getTasks,
  updateTaskStatus,
  addTaskToDb
};