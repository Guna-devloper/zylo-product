import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Use Routes instead of Switch in React Router v6
import SignUp from './Component/SignUp';
import Login from './Component/Login';
import Profile from './Component/Profile';
import Dashboard from './Component/Dashboard';
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Define the route paths and associate with components */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Login />} />  {/* Make sure this points to the correct component */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />  
         </Routes>
    </Router>
  );
};

export default App;
