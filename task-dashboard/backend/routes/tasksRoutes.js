const express = require("express");
const router = express.Router();
const { getTasks } = require("../database");

// Define the route to get all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await getTasks();
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Failed to retrieve tasks" });
  }
});

module.exports = router;