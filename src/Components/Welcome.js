import React from 'react';

import { auth } from '../firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';

const Welcome = ({ userProf }) => {
  const [user] = useAuthState(auth);
  return (
    <div>
      {user === null ? (
        <>
          <div className="imgContainer">
            <img
              src={`${userProf.photoURL}`}
              alt={`robo avatar of ${userProf.displayName}`}
            />
          </div>
          <h2>{`Welcome ${userProf.displayName}`}</h2>
        </>
      ) : (
        <>
          <div className="imgContainer">
            <img
              src={`${user.photoURL}`}
              alt={`robo avatar of ${user.displayName}`}
            />
          </div>
          <h2>{`Welcome ${user.displayName}`}</h2>
        </>
      )}
    </div>
  );
};

export default Welcome;
