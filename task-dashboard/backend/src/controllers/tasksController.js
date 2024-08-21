const taskModel = require('../models/taskModel');

// Controller function to create a new task
const createTask = async (req, res) => {
    try {
        const { name } = req.body;
        const task = await taskModel.createTask(name);
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create task' });
    }
};

// Controller function to get all tasks
const getAllTasks = async (req, res) => {
    try {
        const tasks = await taskModel.getAllTasks();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve tasks' });
    }
};

// Controller function to update a task's status
const updateTaskStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updatedTask = await taskModel.updateTaskStatus(id, status);
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update task status' });
    }
};

module.exports = {
    createTask,
    getAllTasks,
    updateTaskStatus,
};

// This code defines the controller functions that handle the business logic for creating, 
// retrieving, and updating tasks. It uses the taskModel to interact with the database.