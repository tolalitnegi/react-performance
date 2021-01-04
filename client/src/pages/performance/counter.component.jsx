import React, { useState, useCallback, useMemo } from 'react';
import logo from '../../logo.svg';
import './common.css';

// Set is like an Array with unique items only
const functionsSet = new Set();


const Counter = () => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  const dummyFunction = () => console.log('dummy');
  functionsSet.add(dummyFunction);
  // everytime the Counter is re rendered the dummyFunction is added to the set.


  // Using useCallBack hook
  // first argument the fuction to memoize, 2nd the array of arguments
  const incrementCount1 = useCallback(() => setCount1(count1 + 1), [count1]);
  const incrementCount2 = useCallback(() => setCount2(count2 + 1), [count2]);
  functionsSet.add(incrementCount1); // will only add when count1 changes but not when count2 has changed
  functionsSet.add(incrementCount2);


  // Using useMemo hook
  // memoize the output of the function for  a given argument value
  // caches the last value based on the arguments instead of re computing the function
  // will only re compute when count1 value changes
  const doSomethingComplicated = useMemo(() => {
    console.log('I am computing something complex');
    return ((count1 * 1000) % 12.4) * 51000 - 4000;
  }, [count1]);

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        Count1: {count1}
        <button onClick={incrementCount1}>Increase Count1</button>
        Count2: {count2}
        <button onClick={incrementCount2}>Increase Count2</button>
        complexValue: {doSomethingComplicated}
      </header>
    </div>
  );
};

export default Counter;