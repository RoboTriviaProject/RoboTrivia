import React, { useState } from 'react';
import { auth } from '../../firebase-config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import './../../App.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayname] = useState('');

  const handleRegistration = (e) => {
    e.preventDefault();

    // Call the registration function with email and password
    registerUser(email, password, displayName);

    // Reset the form fields
    setEmail('');
    setPassword('');
    setDisplayname('');
  };

  const registerUser = async (email, password, displayName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Registration successful, handle the response or navigate to another page
      const user = userCredential.user;
      const photoURL = `http://robohash.org/${displayName}.png?set=any&size=200*200`;
      await updateProfile(user, { displayName, photoURL });
    } catch (error) {
      // Handle registration error
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="registration">
      <h2>Sign Up!</h2>
      <form onSubmit={handleRegistration}>
        <div className="labelInput">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="labelInput">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="labelInput">
          <label>Choose your nickname:</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayname(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default SignUp;
