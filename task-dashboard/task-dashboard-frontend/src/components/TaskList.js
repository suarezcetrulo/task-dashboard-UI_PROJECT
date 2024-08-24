// src/components/TaskList.js
import React, { useEffect, useState } from 'react';
import useTasks from '../hooks/useTasks';
import TaskItem from './TaskItem';
import io from 'socket.io-client';

const TaskList = () => {
  const { tasks, loading, error } = useTasks();
  const [socketTasks, setSocketTasks] = useState(tasks); // Local state to manage tasks updated via socket

  React.useEffect(() => {
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
      // socket.off('connect_error');
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

  return (
    <div className="task-list">
      <h2>Task List</h2>
      {socketTasks.length ? (
        <ul>
          {socketTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </ul>
      ) : (
        <p>No tasks available</p>
      )}
    </div>
  );
};

export default TaskList;
