import SignOut from './SignOut';
import { auth } from '../firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';

const Welcome = () => {
  const [user] = useAuthState(auth);
  return (
    <div>
      <h2>{`Welcome ${user.displayName}`}</h2>
      <h2>{`Email: ${user.email}`}</h2>
      <SignOut />
    </div>
  );
};

export default Welcome;
