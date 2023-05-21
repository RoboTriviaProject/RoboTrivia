import { auth } from '../firebase-config';

const SignOut = () => {
  const logout = () => {
    auth.signOut();
    console.log('logout sucessful');
  };

  return <button onClick={logout}>Logout</button>;
};

export default SignOut;
