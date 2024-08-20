const { initDb, getTasks, addTaskToDb, updateTaskStatus } = require('../database/database');

async function testDatabase() {
    console.log("Starting database tests...");

    // Initialize the database
    try {
        await initDb();
        console.log("Database initialized successfully.");
    } catch (error) {
        console.error("Error initializing the database:", error);
    }

    // Test adding a task
    try {
        const newTask = {
            task_name: "Sample Task",
            created_at: new Date().toISOString(),
            execution_time: 30,
            status: "Not started"
        };
        await addTaskToDb(newTask);
        console.log("Task added successfully:", newTask);
    } catch (error) {
        console.error("Error adding new task:", error);
    }

    // Test fetching tasks
    try {
        const tasks = await getTasks();
        console.log("Fetched tasks successfully:", tasks);

        // Test updating a task status if tasks are present
        if (tasks.length > 0) {
            const taskToUpdate = tasks[0];
            taskToUpdate.status = "On progress";
            await updateTaskStatus(taskToUpdate);
            console.log("Task status updated successfully:", taskToUpdate);
        }
    } catch (error) {
        console.error("Error fetching tasks or updating task status:", error);
    }

    console.log("Database tests completed.");
}

// Run the test
testDatabase();
