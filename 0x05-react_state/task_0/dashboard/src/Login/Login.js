import { StyleSheet, css } from 'aphrodite';
import React from 'react';

export default function Login() {
  return (
    <React.Fragment>
      <p>Login to access the full dashboard</p>
      <form className={css(style.flex)}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            name="email"
            id="email"
            className={css(style.input)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            className={css(style.input)}
          />
        </div>
        <div>
          <button>OK</button>
        </div>
      </form>
    </React.Fragment>
  );
}

const style = StyleSheet.create({
  input: {
    margin: '0.5rem',
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    columnGap: '1rem',
    '@media (max-width:900px)': {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
});
