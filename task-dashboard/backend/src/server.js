const app = require('./app');
const http = require('http');
const socketIo = require('socket.io');
const pool = require('./config/database.js');

const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('A user connected');

    // Optionally send initial tasks to the client upon connection
    socket.emit('initialTasks', getTasksFromDatabase());

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Function to get tasks from the database
async function getTasksFromDatabase() {
    try {
        const res = await pool.query('SELECT * FROM tasks'); // Example query
        return res.rows;
    } catch (err) {
        console.error('Error fetching tasks:', err);
        return [];
    }
}

// Function to update tasks periodically
async function updateTasksPeriodically() {
    setInterval(async () => {
        try {
            // Example logic to update task statuses
            await pool.query('UPDATE tasks SET status = ... WHERE ...');
            const updatedTasks = await getTasksFromDatabase();
            io.emit('taskUpdate', updatedTasks); // Broadcast updated tasks to all clients
        } catch (err) {
            console.error('Error updating tasks:', err);
        }
    }, 60000); // Update every minute
}

// Start periodic task updates
updateTasksPeriodically();

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});