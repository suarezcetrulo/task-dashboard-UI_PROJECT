import React from 'react';
import '../styles/Sidebar.css'; // Import Sidebar styles

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3>Task Management</h3>
      <ul>
        <li><a href="#task-list">Tasks</a></li>
        {/* Add more sidebar links or content as needed */}
      </ul>
    </div>
  );
};

export default Sidebar;
