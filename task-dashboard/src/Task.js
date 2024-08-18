import React from 'react';

// This component will display individual tasks.
function Task({ task }) {
  return (
    <div style={{
      border: '1px solid black',
      padding: '10px',
      margin: '10px',
      borderRadius: '5px',
    }}>
      <h3>{task.name}</h3>
      <p>Priority: {task.priority}</p>
    </div>
  );
}

export default Task;
// This Task component accepts a task prop (short for properties) 
// that contains the task details and renders them with some basic styling.