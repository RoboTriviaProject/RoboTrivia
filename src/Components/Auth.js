import GuestLogin from './GuestLogin';
import UserLogIn from './UserLogIn';
import { useState } from 'react';

const Auth = () => {
  const [user, setUser] = useState(true);

  const handleGuest = () => {
    setUser(false);
  };

  const handleRegular = () => {
    setUser(true);
  };

  return (
    <div>
      <button onClick={handleRegular}>Regular Player Login</button>
      <button onClick={handleGuest}>Guest Player Login</button>
      {user ? <UserLogIn /> : <GuestLogin />}
    </div>
  );
};

export default Auth;
