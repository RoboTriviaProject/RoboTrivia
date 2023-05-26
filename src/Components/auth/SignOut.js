import { auth } from '../../firebase-config';

const SignOut = ({
  setUserProf,
  setCategory,
  setDifficulty,
  setType,
  setgameId,
}) => {
  const logout = () => {
    auth.signOut();
    console.log('logout successful');
    // Clear the user's profile and game-related states thus solving the error issues
    setUserProf(null);
    setCategory(null);
    setDifficulty(null);
    setType(null);
    setgameId('');
  };

  return <button onClick={logout}>Logout</button>;
};

export default SignOut;
