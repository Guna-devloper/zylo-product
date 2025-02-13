import React, { useEffect, useState } from "react";
import { useAuth } from "../Component/AuthContext";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard"; 
import UserDashboard from "./UserDashboard"; 

const Dashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login"); // Redirect to login if not authenticated
    } else {
      setLoading(false); // Once user is found, stop loading
    }
  }, [currentUser, navigate]);

  if (!currentUser || loading) return <h2>Loading...</h2>;

  // Define Admin Emails Here
  const adminEmails = ["admin@gmail.com", "zylotechofficial@gmail.com"]; // Add more admin emails as needed

  return (
    <>
      {adminEmails.includes(currentUser.email) ? <AdminDashboard /> : <UserDashboard />}
    </>
  );
};

export default Dashboard;
