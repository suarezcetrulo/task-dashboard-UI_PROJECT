// // import React from 'react';

// // function App() {
// //   return (
// //     <div className="App">
// //       <h1>Task Dashboard</h1>
// //     </div>
// //   );
// // }

// // export default App;

// import React, { useEffect, useState } from 'react';
// import './App.css';
// import io from "socket.io-client";
// import axios from "axios";

// // Connect to the WebSocket server
// const socket = io("http://localhost:4000"); //  establishing a WebSocket connection to a server running on http://localhost:4000 using Socket.IO, which is fine if your backend is indeed on port 4000.

// const App = () => {
//   const [tasks, setTasks] = useState([]);
//   // Fetch initial task data from the server
//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const response = await axios.get("http://localhost:4000/api/tasks"); //axios.get method is correctly used to fetch initial task data. Ensure that your API endpoint (http://localhost:4000/api/tasks) is correctly implemented and accessible.
//         setTasks(response.data);
//       } catch (error) {
//         console.error("Error fetching tasks", error);
//       }
//     };

//     fetchTasks();
//   }, []);

//   // Listen for new tasks and updates from the WebSocket server
//   useEffect(() => {
//     socket.on("taskAdded", (newTask) => {
//       setTasks((prevTasks) => [...prevTasks, newTask]);
//     });

//     socket.on("taskUpdated", (updatedTask) => {
//       setTasks((prevTasks) =>
//         prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
//       );
//     });

//     // Cleanup socket listeners on component unmount
//     return () => {
//       socket.off("taskAdded");
//       socket.off("taskUpdated");
//     };
//   }, []);

//   return (
//     <div className="App">
//       <h1>Task Dashboard</h1>
//       <TaskList tasks={tasks} />
//     </div>
//   );
// };

// const TaskList = ({ tasks }) => {
//   return (
//     <div className="task-list">
//       {tasks.map((task) => (
//         <TaskItem key={task.id} task={task} />
//       ))}
//     </div>
//   );
// };

// const TaskItem = ({ task }) => {
//   return (
//     <div className={`task-item status-${task.status.toLowerCase()}`}>
//       <h2>{task.task_name}</h2>
//       <p>Status: {task.status}</p>
//       <p>Created at: {new Date(task.created_at).toLocaleString()}</p>
//       <p>Execution time: {task.execution_time} minutes</p>
//       {task.ended_at && <p>Ended at: {new Date(task.ended_at).toLocaleString()}</p>}
//     </div>
//   );
// };

// export default App;


// // import Task from './Task';
// // import './App.css';

// // function App() {
// //   const [tasks, setTasks] = useState([]);
// //   const [taskName, setTaskName] = useState('');
// //   const [taskPriority, setTaskPriority] = useState('Low');

// //   const addTask = () => {
// //     const newTask = {
// //       name: taskName,
// //       priority: taskPriority,
// //     };
// //     setTasks([...tasks, newTask]);
// //     setTaskName('');
// //     setTaskPriority('Low');
// //   };

// //   return (
// //     <div style={{ padding: '20px' }}>
// //       <h1>Task Dashboard</h1>
// //       <div>
// //         <input
// //           type="text"
// //           placeholder="Task Name"
// //           value={taskName}
// //           onChange={(e) => setTaskName(e.target.value)}
// //         />
// //         <select
// //           value={taskPriority}
// //           onChange={(e) => setTaskPriority(e.target.value)}
// //         >
// //           <option value="Low">Low</option>
// //           <option value="Medium">Medium</option>
// //           <option value="High">High</option>
// //         </select>
// //         <button onClick={addTask}>Add Task</button>
// //       </div>
// //       <div>
// //         {tasks.map((task, index) => (
// //           <Task key={index} task={task} />
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // export default App;

// // // Explanation:
// // // useState: This is a React hook that allows us to manage the component's state. We use it to keep track of the list of tasks, the name of the task being added, and its priority.
// // // addTask: This function adds a new task to the list of tasks. It uses the state values for the task name and priority, then resets the input fields.
// // // The Task component is used to display each task.
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
