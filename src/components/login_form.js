import React from 'react';
import { login } from '../actions/user';
import { useDispatch } from 'react-redux';

const LoginForm = ({ username, password, changeHandler }) => {
  const dispatch = useDispatch();

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(login({ username: username, password: password }));
  };

  return (
    <>
      <h1>login</h1>
      <form onSubmit={loginHandler} className='login-fields' id='login-fields'>
        <input
          type='text'
          name='username'
          onChange={changeHandler}
          value={username}
          placeholder='username'
          className='username'
        />
        <input
          type='password'
          name='password'
          onChange={changeHandler}
          value={password}
          placeholder='password'
          className='password'
        />
        <input type='submit' />
      </form>
    </>
  );
};

export default LoginForm;
