import { auth } from '../../firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import './../../App.css';
import { Link } from 'react-router-dom';

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
    // eslint-disable-next-line
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
  };

  return (
    <div className="logIn">
      <p>Please login in to play the game</p>
      <form onSubmit={handleLogin}>
        <div className="logInInput">
          <label className="sr-only">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=" Email"
            required
          />
        </div>
        <div className="logInInput">
          <label className="sr-only">Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=" Password"
            required
          />
        </div>

        <button type="submit">Next</button>
      </form>

      <Link to="signup" className="newPlayer">
        New player? Create a new profile
      </Link>
    </div>
  );
};

export default UserLogIn;
