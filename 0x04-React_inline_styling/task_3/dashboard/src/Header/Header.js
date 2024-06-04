import React from 'react';
import holbertonLogo from '../assets/holberton-logo.jpg';
import { StyleSheet, css } from 'aphrodite';

export default function Header() {
  return (
    <div className={css(style.AppHeader)}>
      <img src={holbertonLogo} width={200} height={200} alt="holberton logo" />
      <h1>School dashboard</h1>
    </div>
  );
}

const style = StyleSheet.create({
  AppHeader: {
    display: 'flex',
    alignItems: 'center',
    color: 'red',
    borderBottom: '3px solid red',
  },
});
