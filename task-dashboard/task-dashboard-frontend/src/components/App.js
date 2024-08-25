import React from 'react';
import TaskList from './TaskList'; // Ensure the import path is correct if TaskList is in the same folder
import TaskOverview from './TaskOverview'; // Import TaskOverview
import useTasks from '../hooks/useTasks'; // Import the useTasks hook
import '../App.css'; // Retain CSS if needed for global styling

const App = () => {
  const { tasks } = useTasks(); // Use the useTasks hook to get tasks

  return (
    <div className="App">
      <h1>Task Dashboard</h1>
      <TaskOverview tasks={tasks} /> {/* Include TaskOverview */}
      <TaskList /> {/* Render the TaskList component */}
    </div>
  );
};

export default App;
