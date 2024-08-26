# Task Management API - Backend

## Overview

This project is a backend API for a task management application. It is built using Node.js, Express, PostgreSQL, and Socket.io to provide both HTTP and real-time WebSocket communication. The application follows the MVC (Model-View-Controller) architecture pattern, promoting modularity and maintainability.

## Table of Contents

- [Configuration](#configuration)
  - [Database Setup](#database-setup)
- [Controllers](#controllers)
  - [taskController.js](#taskcontrollerjs)
- [Models](#models)
  - [taskModel.js](#taskmodeljs)
- [Routes](#routes)
  - [tasksRoutes.js](#tasksroutesjs)
- [Express Server Setup](#express-server-setup)
  - [app.js](#appjs)
  - [server.js](#serverjs)
- [Summary](#summary)

## Configuration

### Database Setup (`config/database.js`)

The `database.js` script is responsible for setting up a connection pool to a PostgreSQL database and testing the connection to ensure it is working correctly. It exports the pool instance for use in other parts of the application.

**Key Points:**

- **Connection Pooling**: Utilizes a connection pool (`Pool`) to manage multiple database connections efficiently, reducing overhead for applications with frequent database requests.
- **Configuration**: The pool is configured with necessary database connection details such as username, password, host, database name, and port.
- **Error Handling**: Includes basic error handling for the connection test, logging any errors to the console.
- **Reusability**: By exporting the pool instance, other modules can reuse the same pool for their database operations, ensuring consistent and efficient database interaction.

## Controllers

### `taskController.js` (under `controllers` folder)

The `taskController.js` script defines three controller functions that handle HTTP requests for managing tasks:

- **`createTask`**: Creates a new task in the database.
- **`getAllTasks`**: Retrieves all tasks from the database.
- **`updateTaskStatus`**: Updates the status of an existing task.

**Key Points:**

- **Error Handling**: Each function includes error handling to manage different failure scenarios (e.g., missing parameters, invalid status values, database errors) and responds with appropriate HTTP status codes and error messages.
- **Data Validation**: The `updateTaskStatus` function validates the status field to ensure only valid statuses are accepted.
- **Database Interaction**: Functions use methods from the `taskModel` to perform database operations, adhering to the separation of concerns by keeping business logic within the controller and data access logic within the model.
- **Modularization**: Exporting the controller functions allows easy integration with route definitions in an Express application, promoting modular and maintainable code.

## Models

### `taskModel.js` (under `models` folder)

The `taskModel.js` script defines functions for interacting with the `tasks` table in a PostgreSQL database:

- **`createTask`**: Inserts a new task into the database and returns the newly created task.
- **`getAllTasks`**: Retrieves all tasks from the database, ordered by creation date.
- **`updateTaskStatus`**: Updates the status of an existing task and conditionally sets the end date based on the status.

**Key Points:**

- **Database Interaction**: Uses a connection pool to interact with the PostgreSQL database, allowing for efficient reuse of connections and reduced overhead.
- **SQL Queries**: Uses parameterized SQL queries to prevent SQL injection attacks and ensure secure database operations.
- **Error Handling**: Errors are logged and re-thrown, allowing for centralized error management in the calling function or controller.
- **Modularization**: Functions are organized in a model file, adhering to the MVC architecture pattern, which separates data access logic from business logic and presentation.

## Routes

### `tasksRoutes.js` (under `routes` folder)

This script defines the routing layer for the task management API. It provides three key routes for managing tasks:

- **`POST /tasks`**: To create a new task.
- **`GET /tasks`**: To retrieve all tasks.
- **`PUT /tasks/:id/status`**: To update the status of a specific task.

**Key Points:**

- **Express Router**: The use of `express.Router()` helps modularize routing logic, making the application more organized and maintainable.
- **Separation of Concerns**: Delegates actual request handling to controller functions (`taskController.createTask`, `taskController.getAllTasks`, `taskController.updateTaskStatus`), keeping routing and business logic separate.
- **Parameter Handling**: Demonstrates how route parameters (`:id`) are used to capture dynamic values from the URL.

## Express Server Setup

### `app.js`

This script sets up an Express server for the task management application with the following functionalities:

- **JSON Parsing Middleware**: Automatically parses incoming JSON requests.
- **Routing**: Uses a separate module (`tasksRoutes`) to handle routes related to tasks.
- **Root Route**: Defines a simple route at the root URL (`/`) to respond with a message indicating that the API is running.

**Key Points:**

- **Modularity**: Imports routes from a separate module (`tasksRoutes`), keeping the main application file clean and focused on application-level configuration and middleware.
- **Middleware Usage**: The `express.json()` middleware is used to handle JSON data, a common format for API requests.
- **Express Application**: Sets up and exports the Express application (`app`), which can be imported into another file for starting the server.
- **Route Prefixing**: By mounting `tasksRoutes` on the `/api` path, the application follows RESTful API conventions, keeping endpoints organized and easily manageable.

### `server.js`

This script sets up and starts an HTTP server using Express and integrates Socket.io to handle real-time WebSocket communication. The server listens on a specified port (defaulting to 3000) and handles both standard HTTP requests and WebSocket connections.

**Key Points:**

- **HTTP Server Setup**: Uses Node's built-in `http` module and the Express application (`app`) to set up a standard HTTP server.
- **Socket.io Integration**: Integrates Socket.io into the HTTP server to handle real-time, bidirectional communication, allowing the same server to manage both HTTP and WebSocket requests.
- **Event Handling**: Basic event handling is set up for new connections and disconnections with Socket.io, with potential for more complex real-time interactions (e.g., broadcasting messages, managing chat rooms).
- **Port Configuration**: Uses environment variables to determine the server port, making it flexible for different environments (development, production, etc.).

## Summary

This backend API for a task management application provides a robust framework for managing tasks with both HTTP and WebSocket communication. The modular design, error handling, and use of middleware and environment variables make it a scalable and maintainable solution suitable for development and production environments.
