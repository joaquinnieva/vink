/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import localAuth from '../functions/localAuth';
import { login } from '../redux/slice/authSlice';
import Router from './router';

function App() {
  const dispatch = useDispatch();
  const stateLocalstorage = () => {
    const localstorage = localAuth();
    if (localstorage) {
      const data = JSON.parse(localstorage);
      dispatch(login(data));
    }
  };
  useEffect(() => {
    stateLocalstorage();
  }, []);
  return <Router />;
}

export default App;
