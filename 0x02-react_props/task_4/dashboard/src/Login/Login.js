import React from 'react';
import './Login.css';

export default function Login() {
  return (
    <React.Fragment>
      <p>Login to access the full dashboard</p>
      <label htmlFor="email">Email:</label>
      <input type="text" name="email" id="email" />
      <label htmlFor="password">Password:</label>
      <input type="password" name="password" id="password" />
      <button>OK</button>
    </React.Fragment>
  );
}
