import React from 'react';
import '../styles/TaskOverview.css'; // Import TaskOverview styles

const TaskOverview = ({ totalTasks, completedTasks, inProgressTasks }) => {
  return (
    <div className="task-overview">
      <h2>Task Overview</h2>
      <p>Total Tasks: {totalTasks}</p>
      <p>Completed Tasks: {completedTasks}</p>
      <p>Tasks in Progress: {inProgressTasks}</p>
    </div>
  );
};

export default TaskOverview;
