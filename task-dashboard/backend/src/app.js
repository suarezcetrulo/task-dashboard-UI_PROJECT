const express = require("express");
const app = express();  // Create an Express application

app.use(express.json());  // Middleware to parse JSON bodies

const tasksRoutes = require("./routes/tasksRoutes");  // Import tasks routes
app.use("/api", tasksRoutes);  // Use tasks routes for /tasks URL

app.get('/', (req, res) => {
  res.send('Task Dashboard API is running!');  // Send a response to the client
});
module.exports = app;  // Export the Express application
// code sets up basic Express server that listens on port 3000 
// and responds with "Hello World!" when a GET request is made to the root URL.