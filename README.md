# Task Management Dashboard

## 📋 Overview

This project aims to build a Task Dashboard UI that displays a list of tasks with different statuses and provides real-time updates every minute. The application leverages a modern tech stack to offer a seamless and responsive user interface, along with dynamic real-time updates via Socket.io.

### **Objective**: 

The goal is to develop a web application with the following features:

- **Task Metadata**: Displays task name, creation time, end time, execution duration, and current status.
- **Status Management**: Tasks can have one of the following statuses: “Not started,” “On progress,” “On hold,” “Finished,” or “Terminated.”
- **Dynamic Updates**:
  - The task list and their statuses update every minute without needing a page refresh.
  - New tasks are automatically added in real-time.
- **Database Interaction**: Task data is stored in a database, with changes reflected in real-time.

## 🛠 Tech Stack

- **Frontend**: React, Socket.io-client, CSS (Flexbox/Grid), HTML
- **Backend**: Node.js, Express, Socket.io
- **Database**: PostgreSQL (using `pg` for interaction)
- **Tools & Libraries**: Axios for HTTP requests, React Hooks (useState, useEffect), state management

## 🧑‍💻 Basic Approach

1. **Setting Up the Database**
   - **Database Choice**: PostgreSQL for robust data management and reliability.
   - **Setup**: Configured a PostgreSQL database with a table for tasks. Used the `pg` library for interaction.
   - **Roadblock**: Encountered connection timeout issues.
   - **Solution**: Optimized connection settings to ensure stability.

2. **Backend Development**
   - **Server Setup**: Set up a Node.js server using Express to handle API requests and serve the application.
   - **API Development**: Built RESTful API endpoints for task creation, retrieval, update, and deletion.
   - **Real-Time Updates**: Integrated Socket.io on the server side to handle real-time communication and push updates to clients.
   - **Roadblock**: Difficulty managing real-time updates without causing memory leaks.
   - **Solution**: Implemented proper cleanup of socket connections and optimized event handling logic.

3. **Frontend Development**
   - **React Setup**: Created a React application using functional components and hooks for state management.
   - **Component Design**: Developed reusable components (`TaskList`, `TaskOverview`, `Sidebar`) to display tasks and provide an overview of task statistics.
   - **Real-Time Updates**: Utilized Socket.io-client to listen for real-time updates and dynamically update the UI.
   - **Roadblock**: Challenges in synchronizing state between real-time data and initial fetch results.
   - **Solution**: Managed state with React hooks, ensuring data consistency and seamless real-time updates.

## 🚧 Roadblocks and Solutions

1. **Database Connection Issues**
   - **Problem**: Connection timeouts and inconsistent connectivity with PostgreSQL.
   - **Solution**: Refined the connection URI and adjusted settings for improved reliability.

2. **Real-Time Communication Challenges**
   - **Problem**: Memory leaks and redundant re-renders due to improper handling of Socket.io events.
   - **Solution**: Properly cleaned up socket connections and optimized event listeners to prevent memory leaks.

3. **State Management Synchronization**
   - **Problem**: Difficulty synchronizing state between real-time updates and the initial fetch.
   - **Solution**: Utilized local state management strategies and carefully synchronized updates with hooks.

## 🚀 How to Deploy and Run the Project Locally

To run this project on your local machine, follow these steps:

### **1. Prerequisites**

- Ensure you have **Node.js** and **npm** (Node Package Manager) installed.
- Install **PostgreSQL** and set up a database.

### **2. Clone the Repository**

```bash
git clone <repository-url>
cd <repository-directory>

npm install concurrently --save-dev
npm run start:all
