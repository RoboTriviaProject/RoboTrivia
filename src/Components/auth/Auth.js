import GuestLogin from './GuestLogin';
import UserLogIn from './UserLogIn';
import { useState } from 'react';
import './../../App.css'
import blueYellowRobot from '../../assets/images/blueYellowRobots-min.png';
import pinkRedRobot from '../../assets/images/pinkRedRobots-min.png';

const Auth = ({ setUserProf }) => {
  const [user, setUser] = useState(true);

  const handleGuest = () => {
    setUser(false);
  };

  const handleRegular = () => {
    setUser(true);
  };

  return (
    <section className='homeContainer'>
      <img src={pinkRedRobot} className="robotImg" alt="a pink and a red robot standing side by side" />
      <div className='signIn'>
        <button className="userButton" onClick={handleRegular}>Regular Player Login</button>
        <button className="userButton" onClick={handleGuest}>Guest Player Login</button>
        {user ? <UserLogIn /> : <GuestLogin setUserProf={setUserProf} />}
      </div>
      <img src={blueYellowRobot} className="robotImg" alt="a blue and a yellow robot standing side by side" />
    </section>
  );
};

export default Auth;
