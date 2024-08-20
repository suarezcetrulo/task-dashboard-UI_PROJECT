import React, { useEffect, useState } from 'react';
import './App.css';
import io from "socket.io-client";
import axios from "axios";

// Connect to the WebSocket server
const socket = io("http://localhost:4000"); // Assuming your backend runs on port 4000

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch initial task data from the server
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/tasks");
        setTasks(response.data);
      } catch (error) {
        setError("Failed to fetch tasks. Please try again later.");
        console.error("Error fetching tasks", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Listen for new tasks and updates from the WebSocket server
  useEffect(() => {
    socket.on("taskAdded", (newTask) => {
      setTasks((prevTasks) => [...prevTasks, newTask]);
    });

    socket.on("taskUpdated", (updatedTask) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      );
    });

    // Cleanup socket listeners on component unmount
    return () => {
      socket.off("taskAdded");
      socket.off("taskUpdated");
    };
  }, []);

  return (
    <div className="App">
      <h1>Task Dashboard</h1>
      {loading ? (
        <p>Loading tasks...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <TaskList tasks={tasks} />
      )}
    </div>
  );
};

const TaskList = ({ tasks }) => {
  return (
    <div className="task-list">
      {tasks.length > 0 ? (
        tasks.map((task) => <TaskItem key={task.id} task={task} />)
      ) : (
        <p>No tasks available.</p>
      )}
    </div>
  );
};

const TaskItem = ({ task }) => {
  return (
    <div className={`task-item status-${task.status.toLowerCase().replace(" ", "-")}`}>
      <h2>{task.task_name}</h2>
      <p>Status: {task.status}</p>
      <p>Created at: {new Date(task.created_at).toLocaleString()}</p>
      <p>Execution time: {task.execution_time} minutes</p>
      {task.ended_at && <p>Ended at: {new Date(task.ended_at).toLocaleString()}</p>}
    </div>
  );
};

export default App;
