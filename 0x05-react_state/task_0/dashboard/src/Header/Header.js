import React from 'react';
import holbertonLogo from '../assets/holberton-logo.jpg';
import { StyleSheet, css } from 'aphrodite';

export default function Header() {
  return (
    <div className={css(style.header)}>
      <img
        src={holbertonLogo}
        className={css(style.logo)}
        alt="holberton logo"
      />
      <h1>School dashboard</h1>
    </div>
  );
}

const style = StyleSheet.create({
  header: {
    display: 'flex',
    alignItems: 'center',
    color: 'red',
    borderBottom: '3px solid red',
  },
  logo: {
    width: '200px',
    height: '200px',
  },
});
