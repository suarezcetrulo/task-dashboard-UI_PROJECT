// src/components/TaskItem.js

import React from 'react';
import axios from 'axios';

const TaskItem = ({ task }) => {
  // Function to handle status change
  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    try {
      await axios.put(`http://localhost:3000/api/tasks/${task.id}/status`, { status: newStatus });
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  return (
    <li className="task-item">
      <div>
        <h3>{task.name}</h3>
        <p>Status: {task.status}</p>
        <p>Created At: {new Date(task.created_at).toLocaleString()}</p>
        {task.ended_at && <p>Ended At: {new Date(task.ended_at).toLocaleString()}</p>}
        {task.execution_time && <p>Execution Time: {task.execution_time}</p>}
      </div>
      <div>
        <select value={task.status} onChange={handleStatusChange}>
          <option value="Not started">Not started</option>
          <option value="On progress">On progress</option>
          <option value="On hold">On hold</option>
          <option value="Finished">Finished</option>
          <option value="Terminated">Terminated</option>
        </select>
      </div>
    </li>
  );
};

export default TaskItem;
