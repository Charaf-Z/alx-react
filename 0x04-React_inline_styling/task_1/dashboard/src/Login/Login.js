import { StyleSheet, css } from 'aphrodite';
import React from 'react';

export default function Login() {
  return (
    <React.Fragment>
      <p>Login to access the full dashboard</p>
      <label htmlFor="email">Email:</label>
      <input type="text" name="email" id="email" className={css(style.input)} />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        name="password"
        id="password"
        className={css(style.input)}
      />
      <button>OK</button>
    </React.Fragment>
  );
}

const style = StyleSheet.create({
  input: {
    margin: '0.5rem',
  },
});
