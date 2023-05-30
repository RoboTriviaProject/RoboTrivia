import React, { useEffect, useState } from 'react';

const CountdownTimer = ({ initialCount, onExpire, paused }) => {
  const [counter, setCounter] = useState(initialCount);

  useEffect(() => {
    if (paused) return;

    if (counter > 0) {
      const timer = setTimeout(() => setCounter(counter - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      onExpire();
    }
  }, [counter, paused, onExpire]);

  return <div className="countDownCounter">{counter} </div>;
};

export default CountdownTimer;
