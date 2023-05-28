import { auth } from '../../firebase-config';
import { useNavigate } from 'react-router-dom';

const SignOut = ({
  setUserProf,
  setCategory,
  setDifficulty,
  setType,
  setgameId,
}) => {
  const navigate = useNavigate();

  const logout = () => {
    auth.signOut().then(() => {
      // Clear the user's profile and game-related states
      // setUserProf(null);
      // setCategory(null);
      // setDifficulty(null);
      // setType(null);
      // setgameId('');

      // Navigate to the home page
      navigate('/');
    });
  };

  return <button onClick={logout}>Logout</button>;
};

export default SignOut;