const taskModel = require('../models/taskModel');

// Controller function to create a new task
const createTask = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({error: 'Task name is required'});
        }
        const task = await taskModel.createTask(name);
        res.status(201).json(task);
    } catch (error) {
        console.error('Failed to create task:', error.message);
        res.status(500).json({ error: 'Failed to create task due to server error' });
    }
};

// Controller function to get all tasks
const getAllTasks = async (req, res) => {
    try {
        const tasks = await taskModel.getAllTasks();
        res.status(200).json(tasks);
    } catch (error) {
        console.error('Failed to retrieve tasks:', error.message);
        res.status(500).json({ error: 'Failed to retrieve tasks' });
    }
};

// Controller function to update a task's status
const updateTaskStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        if (!['Not started', 'On progress', 'On hold', 'Finished', 'Terminated'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status value' });
        }
        const updatedTask = await taskModel.updateTaskStatus(id, status);
        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        console.error('Failed to update task status:', error.message);
        res.status(500).json({ error: 'Failed to update task status due to server error' });
    }
};

module.exports = {
    createTask,
    getAllTasks,
    updateTaskStatus,
};

// This code defines the controller functions that handle the business logic for creating, 
// retrieving, and updating tasks. It uses the taskModel to interact with the database.