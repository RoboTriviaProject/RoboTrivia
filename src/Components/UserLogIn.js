import { auth } from '../firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';

const UserLogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    userSignIn(email, password);

    // Reset the form fields
    setEmail('');
    setPassword('');
  };

  const userSignIn = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;
    console.log('Login successful:', user);
  };

  return (
    <>
      <p>Please login in to play the game</p>
      <form onSubmit={handleLogin}>
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

        <button type="submit">Login</button>
      </form>

      <a href="#">New player ? create a new profile</a>
    </>
  );
};

export default UserLogIn;
