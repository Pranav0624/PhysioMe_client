import React, { useState, useEffect } from 'react';
import './Navbar.css';  // Import the CSS file for styling
import appLogo from './applogo.jpg';

import { auth, googleProvider } from './NavbarFirebaseConfig.js';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, signInWithPopup, updateProfile } from 'firebase/auth'; // Import Firebase authentication (already initialized)

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [userAuth, setUserAuth] = useState(null); // Tracks if the user is authenticated
  const [emailAuth, setEmailAuth] = useState('');  // Email input field
  const [passwordAuth, setPasswordAuth] = useState('');  // Password input field
  const [nameAuth, setNameAuth] = useState('');  // Name input field for sign up

  const handleLoginClick = () => setIsLoginOpen(true);
  
  // Toggle signup dialog visibility
  const handleSignUpClick = () => setIsSignUpOpen(true);

  // Set up Firebase listener for authentication state changes
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, emailAuth, passwordAuth);
      setEmailAuth('');
      setPasswordAuth('');
      setIsLoginOpen(false);  // Close the login dialog after successful login
      // toast.success('Login successful!'); 
      toast.success('Login successful!',{
        closeButton: false,
        autoClose:2000
      })
    } catch (error) {
      console.error('Error logging in: ', error.message);
      toast.error(`Error logging in ${error.message}`,{
        closeButton: false,
        autoClose:2000
      });
    }
  };

  // Handle Sign Up with Email, Password, and Name
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, emailAuth, passwordAuth);
      const user = userCredential.user;

      // Update user profile with name
      await updateProfile(user, {
        displayName: nameAuth, // Set the display name for the user
      });

      setEmailAuth('');
      setPasswordAuth('');
      setNameAuth(''); // Clear the name field after successful sign-up
      setIsSignUpOpen(false);  // Close the signup dialog after successful signup
    } catch (error) {
      console.error('Error signing up: ', error.message);
    }
  };

  // Handle Google Login
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setIsLoginOpen(false);  // Close the login dialog after successful login
      // toast.success('Login successful with Google!'); // Success Toast
      toast.success('Login successful!', {
        closeButton: false,
        autoClose:2000
         // Disables the close button
      });
    } catch (error) {
      console.error('Error with Google login: ', error.message);
      toast.error(`Error logging in ${error.message}`,{
        closeButton:false,
        autoClose:2500
      });
      // toast.error('Error with Google login: ' + error.message); // Error Toast
    }
  };

  // Handle Logout
  const handleLogout = () => {
    signOut(auth);
    setUserAuth(null); // Reset user state
    // toast.info('You have logged out!'); // Info Toast
    toast.info('You have logged out!',{
      closeButton:false,
      autoClose:2500
    });
  };

  // Watch for changes in authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserAuth(user);  // Update userAuth when authentication state changes
    });

    return () => unsubscribe(); // Cleanup listener on component unmount
  }, []);
  return (
    <nav className="navbar">
      {}
      <div className='navbar-logo'>
        { <img src={appLogo} alt="APP Logo" />}
      </div>
      <ul className="navbar-links">
        <li><a href="http://localhost:3000">Home</a></li>        
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#footer-contact">Contact</a></li>
        <li><a href="#faq">FAQ</a></li>
      </ul>
      <div className="navbar-auth">
        {userAuth ? (
          <div className="user-info-container">
  <span className="welcome-message">Welcome , {userAuth.displayName}</span>
  <button className="navbar-btn signout-btn" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div className='button-container'>
            <button className="navbar-btn login-btn" onClick={handleLoginClick}>Login</button>
            <button className="navbar-btn signup-btn" onClick={handleSignUpClick}>Sign Up</button>
          </div>
        )}
      </div>

      {/* Login Dialog Box */}
      {isLoginOpen && (
        <div className="modal">
          <div className="modal-content-login">
            <h1>LOGIN</h1>
            <input
              type="email"
              placeholder="Email"
              value={emailAuth}
              onChange={(e) => setEmailAuth(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={passwordAuth}
              onChange={(e) => setPasswordAuth(e.target.value)}
            />
            <button onClick={handleLogin}>Login with Email</button>
            <button onClick={handleGoogleLogin}>Login with Google</button>
            <button onClick={() => setIsLoginOpen(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Sign Up Dialog Box */}
      {isSignUpOpen && (
        <div className="modal">
          <div className="modal-content-signup">
            <h1>SIGN UP</h1>
            <input
              type="text"
              placeholder="Name"
              value={nameAuth}
              onChange={(e) => setNameAuth(e.target.value)}  // Handle name input
            />
            <input
              type="email"
              placeholder="Email"
              value={emailAuth}
              onChange={(e) => setEmailAuth(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={passwordAuth}
              onChange={(e) => setPasswordAuth(e.target.value)}
            />
            <button onClick={handleSignUp}>Sign Up with Email</button>
            <button onClick={() => setIsSignUpOpen(false)}>Close</button>
          </div>
        </div>
      )}
      <ToastContainer/>
    </nav>
  );
};

export default Navbar;
