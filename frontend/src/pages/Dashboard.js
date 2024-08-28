// src/pages/Dashboard.js

import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import UserPanel from '../components/UserPanel';
import AdminPanel from '../components/AdminPanel';

const GET_USERS = gql`
  query GetUsers {
    users {
      _id
      name
      email
    }
  }
`;

const Dashboard = () => {
  const [role, setRole] = useState('');
  const { loading, error, data } = useQuery(GET_USERS, {
    context: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
    onError: () => {
      setRole('user'); // Default to 'user' if the user is not admin
    },
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setRole(decodedToken.role);
    }
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Dashboard</h1>
      {role === 'admin' ? (
        <AdminPanel users={data.users} />
      ) : (
        <UserPanel />
      )}
    </div>
  );
};

export default Dashboard;
