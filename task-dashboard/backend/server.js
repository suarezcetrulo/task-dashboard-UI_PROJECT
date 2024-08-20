const express = require("express");
const http = require("http");
const path = require("path");
const socketIo = require("socket.io");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

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

// API route to get initial tasks from the database
app.get("/api/tasks", async (req, res) => {
  const tasks = await getTasks(); // Fetch tasks from the database
  res.json(tasks); // Send tasks as JSON to the client
});

// Handle WebSocket connections for real-time communication
io.on("connection", (socket) => {
  console.log("New client connected");

  // Emit existing tasks to the newly connected client
  getTasks().then(tasks => {
    socket.emit("initialTasks", tasks);
  });

  // Simulate task status updates every minute
  const updateInterval = setInterval(async () => {
    try {
      let tasksUpdated = false; // Flag to check if any task was updated
      const tasks = await getTasks(); // Fetch current tasks from the database
      const updatedTasks = tasks.map(task => {
        let updatedTask = { ...task }; // Create a copy of the task object

        // Update the task status based on its current status
        if (task.status === "Not started") {
          updatedTask.status = "On progress";
          tasksUpdated = true;
        } else if (task.status === "On progress") {
          updatedTask.status = "On hold";
          tasksUpdated = true;
        } else if (task.status === "On hold") {
          updatedTask.status = "Finished";
          tasksUpdated = true;
        } else if (task.status === "Finished") {
          updatedTask.status = "Terminated";
          tasksUpdated = true;
        }

        // If a task was updated, save it to the database and notify clients
        if (tasksUpdated) {
          updateTaskStatus(updatedTask); // Update task status in the database
          io.emit("taskUpdated", updatedTask); // Notify all clients about the updated task
        }
        return updatedTask; // Return the updated task
      });
    } catch (error) {
      console.error("Error updating tasks:", error); // Log any errors during the update process
    }
  }, 60000); // Run the update process every minute (60000 ms)

  // Handle new task addition via WebSocket
  socket.on("addTask", async (newTask) => {
    await addTaskToDb(newTask); // Add the new task to the database
    io.emit("taskAdded", newTask); // Notify all clients about the new task
  });

  // Cleanup interval on disconnect
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(updateInterval); // Clear the interval when the client disconnects
  });

  // Cleanup interval on server shutdown
  process.on('SIGINT', () => {
    clearInterval(updateInterval);
    process.exit();
  });
});

// Start the server on the specified port, or default to 4000
const PORT = process.env.PORT || 4000;
initDb().then(() => {
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
