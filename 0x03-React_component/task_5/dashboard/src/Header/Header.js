import React from 'react';
import holbertonLogo from '../assets/holberton-logo.jpg';
import './Header.css';

export default function Header() {
  return (
    <div className="App-header">
      <img src={holbertonLogo} width={200} height={200} alt="holberton logo" />
      <h1>School dashboard</h1>
    </div>
  );
}
