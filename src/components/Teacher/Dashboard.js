import React from 'react';

const Dashboard = () => {
  const user = JSON.parse(sessionStorage.getItem('user'));

  if (!user) {
    return <div>No user data found</div>;
  }

  return (
    <div>
      <h1>Welcome, Sir... Here are your profile details.</h1>
      <p>Teacher ID: {user.id}</p>
      <p>Email: {user.email}</p>
      <p>Onboarded on date : {user.createdAt}</p>
      <p>Details updated at time : {user.updatedAt}</p>
    </div>
  );
};

export default Dashboard;
