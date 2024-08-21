const express = require("express");
const http = require("http");
const path = require("path");
const socketIo = require("socket.io");
const { initDb, updateTaskStatus, addTaskToDb } = require("./database");
const tasksRoutes = require("./routes/tasksRoutes"); // Import the tasks routes

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json()); // Middleware to parse JSON bodies

// Use the tasks routes
app.use("/api/tasks", tasksRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Handle WebSocket connections for real-time communication
io.on("connection", (socket) => {
  console.log("New client connected");

  getTasks().then(tasks => {
    socket.emit("initialTasks", tasks);
  }).catch(error => {
    console.error("Error sending initial tasks:", error);
  });

  const updateInterval = setInterval(async () => {
    try {
      const tasks = await getTasks();
      let tasksUpdated = false;

      for (let task of tasks) {
        let updatedTask = { ...task };

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

        if (tasksUpdated) {
          await updateTaskStatus(updatedTask);
          io.emit("taskUpdated", updatedTask);
        }
      }
    } catch (error) {
      console.error("Error updating tasks:", error);
    }
  }, 60000);

  socket.on("addTask", async (newTask) => {
    try {
      await addTaskToDb(newTask);
      io.emit("taskAdded", newTask);
    } catch (error) {
      console.error("Error adding new task:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(updateInterval);
  });

  process.on('SIGINT', () => {
    clearInterval(updateInterval);
    process.exit();
  });
});

const PORT = process.env.PORT || 4000;
initDb().then(() => {
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(error => {
  console.error("Error initializing database:", error);
});