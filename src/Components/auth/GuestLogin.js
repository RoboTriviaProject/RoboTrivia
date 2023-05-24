import { useState } from 'react';
import { auth } from '../../firebase-config';
import { signInAnonymously, updateProfile } from 'firebase/auth';

const GuestLogin = () => {
  const [input, setInput] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (input === '') return;
    login(input);
  };

  const login = async (input) => {
    try {
      const userCredential = await signInAnonymously(auth);
      const user = userCredential.user;
      const displayName = input;
      await updateProfile(user, { displayName });
      console.log(' guest Login successful:', user);
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <>
      <p>Please login in to play the game</p>
      <form onSubmit={handleLogin}>
        <div>
          <label>Choose a name</label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default GuestLogin;
