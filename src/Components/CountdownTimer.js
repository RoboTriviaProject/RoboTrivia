import React, { useEffect, useState } from 'react';

const CountdownTimer = ({ initialCount, onExpire, onReset, paused }) => {
  const [counter, setCounter] = useState(initialCount);

  useEffect(() => {
    if (paused) return; // if paused, do not continue

    if (counter > 0) {
      const timer = setTimeout(() => setCounter(counter - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      onExpire();
    }
  }, [counter, paused]);

  useEffect(() => {
    if (onReset) {
      onReset(() => setCounter(initialCount));
    }
  }, [onReset, initialCount]);

  return <div>Countdown: {counter}</div>;
};

export default CountdownTimer;
