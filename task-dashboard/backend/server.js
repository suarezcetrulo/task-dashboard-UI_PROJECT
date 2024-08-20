const express = require("express");
const http = require("http");
const path = require("path");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Example task data (temporary storage)
let tasks = [
  { id: 1, task_name: "Task 1", created_at: new Date(), execution_time: 60, status: "Not started" },
  { id: 2, task_name: "Task 2", created_at: new Date(), execution_time: 30, status: "On progress" },
];

// API route to get initial tasks
app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

// Serve the React app for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Handle WebSocket connections
io.on("connection", (socket) => {
  console.log("New client connected");

  // Emit existing tasks to the newly connected client
  socket.emit("initialTasks", tasks);

  // Simulate task status updates every minute
  const updateInterval = setInterval(() => {
    try {
      let tasksUpdated = false;
      tasks = tasks.map(task => {
        let updatedTask = { ...task };
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

        if (tasksUpdated) io.emit("taskUpdated", updatedTask); // Notify all clients about the updated task if there's a change
        return updatedTask;
      });
    } catch (error) {
      console.error("Error updating tasks:", error);
    }
  }, 60000); // Every minute

  // Handle new task addition
  socket.on("addTask", (newTask) => {
    newTask.created_at = new Date(); // Ensure the creation time is set
    tasks.push(newTask);
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

// Start server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));