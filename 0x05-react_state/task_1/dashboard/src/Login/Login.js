import { StyleSheet, css } from 'aphrodite';
import React, { useEffect, useState } from 'react';

export default function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [enableSubmit, setEnableSubmit] = useState(false);
  const handleLoginSubmit = (event) => {
    event.preventDefault();
    setIsLoggedIn(true);
  };
  useEffect(() => {
    // email && password ? setEnableSubmit(true) : setEnableSubmit(false);
    setEnableSubmit(email !== '' && password !== '');
  }, [email, password]);
  const handleChangeEmail = (event) => setEmail(event.target.value);
  const handleChangePassword = (event) => setPassword(event.target.value);
  return (
    <React.Fragment>
      <p>Login to access the full dashboard</p>
      <form className={css(style.flex)} onSubmit={handleLoginSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            className={css(style.input)}
            onChange={handleChangeEmail}
            value={email}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            className={css(style.input)}
            onChange={handleChangePassword}
            value={password}
          />
        </div>
        <div>
          <input type="submit" value="Ok" disabled={!enableSubmit} />
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
