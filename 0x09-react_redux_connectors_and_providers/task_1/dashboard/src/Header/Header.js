import React, { useContext } from 'react';
import holbertonLogo from '../assets/holberton-logo.jpg';
import { StyleSheet, css } from 'aphrodite';
import { AppContext } from '../App/AppContext';

export default function Header() {
  const { user, logOut } = useContext(AppContext);
  return (
    <>
      <div className={css(style.header)}>
        <img
          src={holbertonLogo}
          className={css(style.logo)}
          alt="holberton logo"
        />
        <h1>School dashboard</h1>
      </div>
      {user.isLoggedIn && (
        <section id="logoutSection" className={css(style.greeting)}>
          Welcome <strong>{user.email}</strong>{' '}
          <em>
            <a href="#" onClick={logOut}>
              (logout)
            </a>
          </em>
        </section>
      )}
    </>
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
  greeting: {
    margin: '2rem 0 0 5rem',
  },
});
