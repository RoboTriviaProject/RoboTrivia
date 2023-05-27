import React, { useEffect, useState } from 'react';

const CountdownTimer = ({ initialCount, onExpire, onReset }) => {
  const [counter, setCounter] = useState(initialCount);

  // This useEffect hook is triggered whenever the counter state variable changes.
  // It contains a callback function that performs actions based on the value of counter.
  useEffect(() => {
    // If the counter is greater than 0, create a timer using setTimeout
    // and schedule it to decrement the counter by 1 after 1000 milliseconds (1 second).
    if (counter > 0) {
      const timer = setTimeout(() => setCounter(counter - 1), 1000);
      // cleanup function that clears the previously set timer.
      return () => clearTimeout(timer);
    } else {
      // If the counter reaches 0, call the onExpire function.
      onExpire();
    }
  }, [counter]);

  // This useEffect hook is triggered whenever either the onReset or initialCount prop changes.

  useEffect(() => {
    // if the onReset prop is defined
    if (onReset) {
      // function that sets the counter back to its initial value.
      onReset(() => setCounter(initialCount));
    }
  }, [onReset, initialCount]);

  return <div>Countdown: {counter}</div>;
};

export default CountdownTimer;
