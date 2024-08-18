// import React from 'react';

// function App() {
//   return (
//     <div className="App">
//       <h1>Task Dashboard</h1>
//     </div>
//   );
// }

// export default App;

import React, { useState } from 'react';
import Task from './Task';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskPriority, setTaskPriority] = useState('Low');

  const addTask = () => {
    const newTask = {
      name: taskName,
      priority: taskPriority,
    };
    setTasks([...tasks, newTask]);
    setTaskName('');
    setTaskPriority('Low');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Task Dashboard</h1>
      <div>
        <input
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <select
          value={taskPriority}
          onChange={(e) => setTaskPriority(e.target.value)}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button onClick={addTask}>Add Task</button>
      </div>
      <div>
        {tasks.map((task, index) => (
          <Task key={index} task={task} />
        ))}
      </div>
    </div>
  );
}

export default App;

// Explanation:
// useState: This is a React hook that allows us to manage the component's state. We use it to keep track of the list of tasks, the name of the task being added, and its priority.
// addTask: This function adds a new task to the list of tasks. It uses the state values for the task name and priority, then resets the input fields.
// The Task component is used to display each task.