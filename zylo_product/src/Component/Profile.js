import React, { useEffect, useState } from 'react';

// Profile.js
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import app from '../firebase/firebaseConfig'; // Adjusted path

const Profile = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth(app); // Initialize auth here

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <h2>Welcome, {user.email}</h2>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      ) : (
        <p>Please log in to view your profile</p>
      )}
    </div>
  );
};

export default Profile;
