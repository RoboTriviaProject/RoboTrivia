import React, { useState } from 'react';
import { auth } from '../../firebase-config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Link } from 'react-router-dom';

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

      console.log('Registration successful:', user);
    } catch (error) {
      // Handle registration error
      console.error('Registration error:', error);
    }
  };

  return (
    <div>
      <h2>Registration</h2>
      <form onSubmit={handleRegistration}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Please select a name</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayname(e.target.value)}
          />
        </div>
        <Link to="/">
          <button type="submit">Register</button>
        </Link>
      </form>
    </div>
  );
};

export default SignUp;
