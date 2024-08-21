const app = require('./app'); // Import the Express app
const http = require('http'); // Import the HTTP module
const socketIo = require('socket.io'); // Import the Socket.io module
const pool = require('./config/database'); // Import the database pool

// Create HTTP server and attach Socket.io
const server = http.createServer(app); // Create an HTTP server using the Express app
const io = socketIo(server);      // Attach Socket.io to the HTTP server

// Basic event listener for Socket.io
io.on('connection', (socket) => { // Listen for new socket connections
    console.log('A user connected');   // Log a message when a new user connects
    
    // Handle socket disconnection
    socket.on('disconnect', () => { // Listen for socket disconnections
        console.log('A user disconnected'); // Log a message when a user disconnects
    });
});

// Start the server on port 3000
const PORT = process.env.PORT || 3000; // Define the port to run the server on
server.listen(PORT, () => { // Start the server and listen on the specified port
    console.log(`Server is running on port ${PORT}`); // Log a message when the server starts
});
// This code starts the server on port 3000 and sets up a basic Socket.io connection to handle real-time updates.