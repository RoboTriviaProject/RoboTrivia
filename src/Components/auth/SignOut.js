import { auth } from '../../firebase-config';
import { useNavigate } from 'react-router-dom';

const SignOut = ({ setCategory, setDifficulty, setType }) => {
  const navigate = useNavigate();

  const quitGame = () => {
    // Clear the user's profile and game-related states
    if (setDifficulty) setDifficulty(null);
    if (setCategory) setCategory(null);
    if (setType) setType(null);

    // Navigate to the home page
  };

  const logout = () => {
    quitGame();
    auth.signOut().then(() => {
      navigate('/');
    });
  };

  return (
    <button onClick={logout} className="logOutButton">
      Log out
    </button>
  );
};

export default SignOut;
