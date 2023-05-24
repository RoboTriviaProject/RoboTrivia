import './App.css';
import Auth from './Components/auth/Auth';

import SignUp from './Components/auth/SignUp';
import Welcome from './Components/Welcome';
import { auth } from './firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';

function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <h1>Robo Trivia App</h1>
      {/* <SignUp /> */}
      <div>{!user ? <Auth /> : <Welcome />}</div>
    </div>
  );
}

export default App;
