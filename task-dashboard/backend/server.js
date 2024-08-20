const express = require("express");
const http = require("http");
const path = require("path");
const socketIo = require("socket.io");
const { initDb, getTasks, updateTaskStatus, addTaskToDb } = require("./database");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json()); // Middleware to parse JSON bodies

// API route to get initial tasks from the database
app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await getTasks(); // Fetch tasks from the database
    res.json(tasks); // Send tasks as JSON to the client
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Failed to retrieve tasks" });
  }
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Handle WebSocket connections for real-time communication
io.on("connection", (socket) => {
  console.log("New client connected");

  // Emit existing tasks to the newly connected client
  getTasks().then(tasks => {
    socket.emit("initialTasks", tasks);
  }).catch(error => {
    console.error("Error sending initial tasks:", error);
  });

  // Simulate task status updates every minute
  const updateInterval = setInterval(async () => {
    try {
      const tasks = await getTasks(); // Fetch current tasks from the database
      let tasksUpdated = false; // Flag to check if any task was updated

      for (let task of tasks) {
        let updatedTask = { ...task }; // Create a copy of the task object

        // Update the task status based on its current status
        switch (task.status) {
          case "Not started":
            updatedTask.status = "On progress";
            tasksUpdated = true;
            break;
          case "On progress":
            updatedTask.status = "On hold";
            tasksUpdated = true;
            break;
          case "On hold":
            updatedTask.status = "Finished";
            tasksUpdated = true;
            break;
          case "Finished":
            updatedTask.status = "Terminated";
            tasksUpdated = true;
            break;
          default:
            break;
        }

        // If a task was updated, save it to the database and notify clients
        if (tasksUpdated) {
          await updateTaskStatus(updatedTask); // Update task status in the database
          io.emit("taskUpdated", updatedTask); // Notify all clients about the updated task
        }
      }
    } catch (error) {
      console.error("Error updating tasks:", error); // Log any errors during the update process
    }
  }, 60000); // Run the update process every minute (60000 ms)

  // Handle new task addition via WebSocket
  socket.on("addTask", async (newTask) => {
    try {
      await addTaskToDb(newTask); // Add the new task to the database
      io.emit("taskAdded", newTask); // Notify all clients about the new task
    } catch (error) {
      console.error("Error adding new task:", error);
    }
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
}).catch(error => {
  console.error("Error initializing database:", error);
});
