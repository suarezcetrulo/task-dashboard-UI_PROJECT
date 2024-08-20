const { initDb, getTasks, addTaskToDb, updateTaskStatus } = require('../database/database');

async function testDatabase() {
  try {
    // Initialize the database
    await initDb();
    console.log("Database initialized successfully.");

    // Test adding a task
    const newTask = {
      task_name: "Sample Task",
      created_at: new Date().toISOString(),
      execution_time: 30,
      status: "Not started"
    };
    await addTaskToDb(newTask);
    console.log("Task added successfully:", newTask);

    // Test fetching tasks
    const tasks = await getTasks();
    console.log("Fetched tasks successfully:", tasks);

    // Test updating a task status
    if (tasks.length > 0) {
      const taskToUpdate = tasks[0];
      taskToUpdate.status = "On progress";
      await updateTaskStatus(taskToUpdate);
      console.log("Task status updated successfully:", taskToUpdate);
    }

  } catch (error) {
    console.error("Error during database tests:", error);
  }
}

// Run the test
testDatabase();