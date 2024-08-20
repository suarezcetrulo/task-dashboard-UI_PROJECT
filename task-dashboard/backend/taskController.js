// Handles HTTP requests related to tasks (e.g., creating, updating, retrieving tasks).

const tasksService = require('./tasksService');

// Controller to handle task-related HTTP requests

// Fetch all tasks from the database
const getAllTasks = async (req, res) => {
    try {
        const tasks = await tasksService.getAllTasks(); // Fetch tasks from service layer
        res.json(tasks); // Send tasks as JSON response
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ error: "Failed to fetch tasks" }); // Handle errors and send a 500 status code
    }
};

// Add a new task to the database
const addTask = async (req, res) => {
    try {
        const newTask = req.body; // Get task details from request body
        const task = await tasksService.addTask(newTask); // Add the new task using the service layer
        res.status(201).json(task); // Respond with the newly created task and a 201 status code
    } catch (error) {
        console.error("Error adding task:", error);
        res.status(500).json({ error: "Failed to add task" }); // Handle errors and send a 500 status code
    }
};

// Update an existing task's status
const updateTaskStatus = async (req, res) => {
    try {
        const { id } = req.params; // Extract task ID from request parameters
        const { status } = req.body; // Get new status from request body

        const updatedTask = await tasksService.updateTaskStatus(id, status); // Update task status using the service layer

        if (updatedTask) {
            res.json(updatedTask); // Send the updated task as a JSON response
        } else {
            res.status(404).json({ error: "Task not found" }); // Handle case where task is not found
        }
    } catch (error) {
        console.error("Error updating task status:", error);
        res.status(500).json({ error: "Failed to update task status" }); // Handle errors and send a 500 status code
    }
};

module.exports = {
    getAllTasks,
    addTask,
    updateTaskStatus,
};
