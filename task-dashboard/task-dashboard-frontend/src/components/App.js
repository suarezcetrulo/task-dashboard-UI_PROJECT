// src/components/App.js

import React from 'react';
import TaskList from './TaskList'; // Ensure the import path is correct if TaskList is in the same folder
import '../App.css'; // Retain CSS if needed for global styling

const App = () => {
  return (
    <div className="App">
      <h1>Task Dashboard</h1>
      <TaskList /> {/* Render the TaskList component */}
    </div>
  );
};

export default App;
