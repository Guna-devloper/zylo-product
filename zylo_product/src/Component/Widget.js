import React from "react";

const Widget = ({ userData }) => {
  return (
    <div className="widgets">
      <h3>User Analytics</h3>
      {userData.map((user, index) => (
        <div key={index} className="widget-card">
          <p>Email: {user.email}</p>
          <p>Last Login: {user.lastLogin}</p>
        </div>
      ))}
    </div>
  );
};

export default Widget;
