// src/components/AdminPanel.js

import React from 'react';

const AdminPanel = ({ users }) => {
  return (
    <div>
      <h2>Admin Panel</h2>
      <p>Manage users and other administrative tasks.</p>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
      {/* Add more admin-specific features here */}
    </div>
  );
};

export default AdminPanel;
