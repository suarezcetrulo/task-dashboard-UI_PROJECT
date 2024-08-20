// Sets up and connects to your SQLite database. Ensure you have functions for creating tables and performing CRUD operations.
const { open } = require("sqlite");
const sqlite3 = require("sqlite3").verbose();

let db;

// Initialize SQLite database and create the `tasks` table if it doesn't exist
async function initDb() {
  db = await open({
    filename: './database/tasks.db',  // Path to the SQLite database file
    driver: sqlite3.Database
  });

  // Create the tasks table with columns for task details
  await db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      task_name TEXT,
      created_at TEXT,
      ended_at TEXT,
      execution_time INTEGER,
      status TEXT
    )
  `);
}

// Retrieve all tasks from the SQLite database
async function getTasks() {
  return db.all("SELECT * FROM tasks");
}

// Update the status of a task in the SQLite database
async function updateTaskStatus(task) {
  return db.run(
    `UPDATE tasks SET status = ? WHERE id = ?`,
    [task.status, task.id]
  );
}

// Insert a new task into the SQLite database
async function addTaskToDb(newTask) {
  const { task_name, execution_time, status } = newTask;
  const created_at = new Date().toISOString(); // Record the task creation time
  return db.run(
    `INSERT INTO tasks (task_name, created_at, execution_time, status) VALUES (?, ?, ?, ?)`,
    [task_name, created_at, execution_time, status]
  );
}

module.exports = {
  initDb,
  getTasks,
  updateTaskStatus,
  addTaskToDb
};
