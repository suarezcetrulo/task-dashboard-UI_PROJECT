const express = require('express');   // Import the express module
const router = express.Router();    // Create a new router using express
const taskController = require('../controllers/tasksController.js');  // Import the task controller

// Route to create a new task
router.post('/tasks', taskController.createTask);   // Define the POST /tasks route

// Route to get all tasks
router.get('/tasks', taskController.getAllTasks);   // Define the GET /tasks route

// Route to update a task's status
router.put('/tasks/:id/status', taskController.updateTaskStatus);  // Define the PUT /tasks/:id/status route

module.exports = router;
