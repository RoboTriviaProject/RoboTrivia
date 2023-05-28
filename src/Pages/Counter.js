import React, { useEffect, useState } from 'react';

const Counter = () => {
    const [counter, setCounter] = useState(15);

    useEffect(() => {
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
      }, [counter]);
    }