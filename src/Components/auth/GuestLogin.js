import { useState } from 'react';
import { auth } from '../../firebase-config';
import { signInAnonymously, updateProfile } from 'firebase/auth';
import './../../App.css';

const GuestLogin = ({ setUserProf }) => {
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
      const photoURL = `http://robohash.org/${input}.png?set=any&size=200x200`;
      await updateProfile(user, { displayName, photoURL });

      setUserProf(user);
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="logIn">
      <p>
        Please create a nickname <br></br>to play the game
      </p>
      <form onSubmit={handleLogin}>
        <div>
          <label className="sr-only">Choose a name</label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Choose a nickname"
          />
        </div>

        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default GuestLogin;
