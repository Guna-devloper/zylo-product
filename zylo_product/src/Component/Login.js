import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Container, TextField, Button, Typography, Paper } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import { app, auth, db, storage } from '../firebase/firebaseConfig';
import './Login.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = getAuth(app);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      toast.success('Login Successful! Redirecting...', { autoClose: 1000 }); // Success Notification
      console.log('User signed in:', userCredential.user);
      // Redirect to dashboard or home page after a delay
      setTimeout(() => {
        window.location.href = '/dashboard'; // Change this to your actual dashboard route
      }, 2000);
    } catch (error) {
      toast.error(`Login Failed: ${error.message}`, { autoClose: 2000 }); // Error Notification
      console.error('Error signing in:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-root">
      <ToastContainer position="top-right" /> {/* React Toastify Toaster */}
      <Container className="login-container">
        {/* Left Side */}
        <div className="login-left">
          <Typography variant="h4" className="login-heading">
            Empowering Your Dreams!
          </Typography>
          <Typography variant="body1" className="login-description">
            Build your skills, grow your career, and transform your future.
          </Typography>
          <img src="./tech-image.png" alt="Tech Visual" className="login-image" />
        </div>

        {/* Right Side */}
        <div className="login-right">
          <Paper className="login-form-container" elevation={8}>
            <img src="./zlogo.png" alt="Zylo Tech Logo" className="login-logo" />
            <Typography variant="h5" className="login-title">
              Welcome to Zylo Tech
            </Typography>
            <Typography variant="body2" className="login-subtitle">
              Please sign in to continue
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="login-input"
                InputProps={{ style: { fontSize: '1rem' } }}
              />
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
              />
              <Typography variant="caption" className="login-forgot-password">
                Forgot Password?
              </Typography>
              <Button
                variant="contained"
                fullWidth
                type="submit"
                className="login-button"
                disabled={loading}
              >
                {loading ? 'Signing In...' : 'Login →'}
              </Button>
            </form>

           
            <Typography variant="body2" className="login-connect-text">
            Dont't have an account??     <Link to="/signup">
            <p>SignUp</p>
              </Link>
            </Typography>
            <Typography variant="body2" className="login-connect-text">
              — Connect With Us —
            </Typography>
            <div className="login-social-icons">
              <Link to="/linkedin">
                <img src="./linkedin-icon.png" alt="LinkedIn" />
              </Link>
              <Link to="/youtube">
                <img src="./youtube-icon.png" alt="YouTube" />
              </Link>
              <Link to="/instagram">
                <img src="./instagram-icon.png" alt="Instagram" />
              </Link>
            </div>
          </Paper>
        </div>
      </Container>
    </div>
  );
};

export default Login;
