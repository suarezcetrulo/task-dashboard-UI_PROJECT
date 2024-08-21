const express = require("express");
const router = express.Router();
const { getTasks, addTaskToDb, updateTaskStatus } = require("../database");

// Route to get all tasks optimised with adding pagination
router.get("/", async (req, res) => {
  const {page = 1, limit = 10} = req.query;
  try {
    const tasks = await getTasks({page, limit});
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Failed to retrieve tasks" });
  }
});

// Route to add a new task
router.post("/", async (req, res) => {
  try {
    const newTask = req.body;
    await addTaskToDb(newTask);
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).json({ error: "Failed to add task" });
  }
});

// Route to update a task status (if needed in the API)
router.put("/:id/status", async (req, res) => {
  try {
    const taskId = req.params.id;
    const updatedStatus = req.body.status;
    const updatedTask = await updateTaskStatus(taskId, updatedStatus);
    res.json(updatedTask);
  } catch (error) {
    console.error("Error updating task status:", error);
    res.status(500).json({ error: "Failed to update task status" });
  }
});

module.exports = router;
