// src/components/TaskList.js
import React, { useEffect, useState } from 'react';
import useTasks from '../hooks/useTasks';
import Sidebar from './Sidebar'; // Import Sidebar component
import TaskOverview from './TaskOverview'; // Import TaskOverview component
import io from 'socket.io-client';
import '../styles/TaskList.css'; // Import TaskList styles

const TaskList = () => {
  const { tasks, loading, error } = useTasks();
  const [socketTasks, setSocketTasks] = useState(tasks); // Local state to manage tasks updated via socket

  useEffect(() => {
    // Set up Socket.io for real-time updates
    const socket = io('http://localhost:3000');

    // Error handling for socket connection
    socket.on('connect_error', () => {
      console.error('Socket connection error.');
    });

    // Handle task creation in real-time
    socket.on('taskCreated', (newTask) => {
      setSocketTasks((prevTasks) => [...prevTasks, newTask]); // Add new task to the list
    });

    // Handle task update in real-time
    socket.on('taskUpdated', (updatedTask) => {
      setSocketTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      );
    });

    // Clean up on component unmount
    return () => {
      socket.off('connect_error');
      socket.off('taskCreated');
      socket.off('taskUpdated');
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    setSocketTasks(tasks); // Sync socket tasks with fetched tasks
  }, [tasks]);

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>{error}</p>;

  // Compute task statistics for TaskOverview
  const totalTasks = socketTasks.length;
  const completedTasks = socketTasks.filter((task) => task.status === 'Completed').length;
  const inProgressTasks = socketTasks.filter((task) => task.status === 'In Progress').length;

  return (
    <div className="main-container">
      <Sidebar /> {/* Include Sidebar component */}
      <div className="content-container">
        {/* Pass task statistics to TaskOverview */}
        <TaskOverview 
          totalTasks={totalTasks} 
          completedTasks={completedTasks} 
          inProgressTasks={inProgressTasks} 
        />
        
        <div className="task-list-container">
          <h2>Task List</h2>
          {socketTasks.length ? (
            <table className="task-table">
              <thead>
                <tr>
                  <th>Task Name</th>
                  <th>Created At</th>
                  <th>Ended At</th>
                  <th>Execution Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {socketTasks.map((task) => (
                  <tr key={task.id}>
                    <td>{task.name}</td>
                    <td>{new Date(task.createdAt).toLocaleString()}</td>
                    <td>{task.endedAt ? new Date(task.endedAt).toLocaleString() : 'N/A'}</td>
                    <td>
                      {task.endedAt
                        ? `${Math.round(
                            (new Date(task.endedAt) - new Date(task.createdAt)) / 1000
                          )} seconds`
                        : 'N/A'}
                    </td>
                    <td>{task.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No tasks available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
